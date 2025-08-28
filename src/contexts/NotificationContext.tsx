import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Notification } from '../types';
import { notificationsAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Notification state interface
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// Action types
type NotificationAction =
  | { type: 'FETCH_NOTIFICATIONS_START' }
  | { type: 'FETCH_NOTIFICATIONS_SUCCESS'; payload: Notification[] }
  | { type: 'FETCH_NOTIFICATIONS_FAILURE'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'UPDATE_UNREAD_COUNT'; payload: number }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

// Reducer
const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'FETCH_NOTIFICATIONS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        notifications: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: action.payload.isRead ? state.unreadCount : state.unreadCount + 1,
      };
    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification._id === action.payload._id ? action.payload : notification
        ),
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification._id !== action.payload),
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification._id === action.payload
            ? { ...notification, isRead: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, isRead: true })),
        unreadCount: 0,
      };
    case 'UPDATE_UNREAD_COUNT':
      return {
        ...state,
        unreadCount: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Context interface
interface NotificationContextType extends NotificationState {
  fetchNotifications: (params?: { page?: number; limit?: number; unreadOnly?: boolean }) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, '_id' | 'createdAt'>) => void;
  clearError: () => void;
  refreshUnreadCount: () => Promise<void>;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Fetch notifications
  const fetchNotifications = async (params?: { page?: number; limit?: number; unreadOnly?: boolean }) => {
    if (!isAuthenticated) return;

    try {
      dispatch({ type: 'FETCH_NOTIFICATIONS_START' });
      
      const response = await notificationsAPI.getNotifications(params);
      
      if (response.success && response.data) {
        dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: response.data.notifications });
      } else {
        throw new Error(response.error || 'Failed to fetch notifications');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch notifications';
      dispatch({ type: 'FETCH_NOTIFICATIONS_FAILURE', payload: errorMessage });
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const response = await notificationsAPI.markAsRead(id);
      
      if (response.success) {
        dispatch({ type: 'MARK_AS_READ', payload: id });
      } else {
        throw new Error(response.error || 'Failed to mark notification as read');
      }
    } catch (error: any) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await notificationsAPI.markAllAsRead();
      
      if (response.success) {
        dispatch({ type: 'MARK_ALL_AS_READ' });
      } else {
        throw new Error(response.error || 'Failed to mark all notifications as read');
      }
    } catch (error: any) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      const response = await notificationsAPI.deleteNotification(id);
      
      if (response.success) {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      } else {
        throw new Error(response.error || 'Failed to delete notification');
      }
    } catch (error: any) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Add notification (for real-time updates)
  const addNotification = (notification: Omit<Notification, '_id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      _id: Date.now().toString(), // Temporary ID for real-time updates
      createdAt: new Date(),
    };
    
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Refresh unread count
  const refreshUnreadCount = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await notificationsAPI.getUnreadCount();
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_UNREAD_COUNT', payload: response.data.count });
      }
    } catch (error) {
      console.error('Failed to refresh unread count:', error);
    }
  };

  // Fetch notifications on mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      refreshUnreadCount();
    }
  }, [isAuthenticated]);

  // Set up polling for unread count
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshUnreadCount();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const value: NotificationContextType = {
    ...state,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    clearError,
    refreshUnreadCount,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

// Custom hook to use notification context
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Hook to get unread notifications
export const useUnreadNotifications = () => {
  const { notifications } = useNotifications();
  return notifications.filter(notification => !notification.isRead);
};

// Hook to get notifications by type
export const useNotificationsByType = (type: string) => {
  const { notifications } = useNotifications();
  return notifications.filter(notification => notification.type === type);
};
