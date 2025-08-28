const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logger } = require('../utils/logger');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token - user not found'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Check if user is locked
    if (user.isLocked) {
      return res.status(401).json({
        success: false,
        error: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

// Middleware to check if user has required role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied - insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  return authorizeRole('admin')(req, res, next);
};

// Middleware to check if user is admin or the resource owner
const authorizeOwnerOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Admin can access everything
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user is the resource owner
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (!resourceUserId) {
      return res.status(400).json({
        success: false,
        error: 'Resource user ID not provided'
      });
    }

    if (resourceUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied - you can only access your own resources'
      });
    }

    next();
  };
};

// Middleware to verify email
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      error: 'Email verification required'
    });
  }

  next();
};

// Middleware to check session token
const validateSessionToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Session token required'
      });
    }

    // Find user with this session token
    const user = await User.findOne({
      'sessionTokens.token': token,
      isActive: true
    }).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid session token'
      });
    }

    // Update last used timestamp
    await User.updateOne(
      { 'sessionTokens.token': token },
      { $set: { 'sessionTokens.$.lastUsed': new Date() } }
    );

    req.user = user;
    next();
  } catch (error) {
    logger.error('Session validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Session validation failed'
    });
  }
};

// Middleware to rate limit authentication attempts
const rateLimitAuth = (req, res, next) => {
  const ip = req.ip;
  const key = `auth_attempts_${ip}`;
  
  // This would typically use Redis or a similar store
  // For now, we'll use a simple in-memory store (not recommended for production)
  if (!global.authAttempts) {
    global.authAttempts = new Map();
  }

  const attempts = global.authAttempts.get(key) || 0;
  
  if (attempts >= 5) {
    return res.status(429).json({
      success: false,
      error: 'Too many authentication attempts. Please try again later.'
    });
  }

  global.authAttempts.set(key, attempts + 1);
  
  // Reset after 15 minutes
  setTimeout(() => {
    global.authAttempts.delete(key);
  }, 15 * 60 * 1000);

  next();
};

// Middleware to log authentication events
const logAuthEvent = (event) => {
  return (req, res, next) => {
    const logData = {
      event,
      userId: req.user?._id,
      email: req.user?.email,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date()
    };

    logger.info('Authentication event', logData);
    next();
  };
};

// Middleware to check if user can perform action on resource
const canPerformAction = (action, resource) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Admin can perform any action
    if (req.user.role === 'admin') {
      return next();
    }

    // Define permissions (this could be stored in database)
    const permissions = {
      user: {
        'read': ['own_profile', 'own_orders'],
        'write': ['own_profile'],
        'delete': ['own_profile']
      },
      admin: {
        'read': ['*'],
        'write': ['*'],
        'delete': ['*']
      }
    };

    const userPermissions = permissions[req.user.role] || {};
    const allowedResources = userPermissions[action] || [];

    if (allowedResources.includes('*') || allowedResources.includes(resource)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: `Access denied - cannot ${action} ${resource}`
    });
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
  requireAdmin,
  authorizeOwnerOrAdmin,
  requireEmailVerification,
  validateSessionToken,
  rateLimitAuth,
  logAuthEvent,
  canPerformAction
};
