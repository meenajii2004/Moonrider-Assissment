# Moonrider Dashboard - Vercel Deployment Guide

This guide will help you deploy your Moonrider Dashboard application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Database**: Set up a MongoDB Atlas cluster or use another MongoDB hosting service
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Vite project

### 3. Configure Build Settings

Vercel should automatically detect the following settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add the following variables:

#### Required Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moonrider-dashboard
JWT_SECRET=your-super-secure-jwt-secret-key-for-production
JWT_REFRESH_SECRET=your-super-secure-refresh-token-secret
FRONTEND_URL=https://your-app-name.vercel.app
CORS_ORIGIN=https://your-app-name.vercel.app
SOCKET_CORS_ORIGIN=https://your-app-name.vercel.app
SESSION_SECRET=your-super-secure-session-secret
```

#### Optional Variables (if using these services):
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

### 5. Deploy

1. Click "Deploy" in your Vercel dashboard
2. Wait for the build to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## Important Notes

### Backend API Routes
- Your backend API routes will be available at `/api/*`
- Example: `https://your-app-name.vercel.app/api/auth/login`

### Database Connection
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Update your MongoDB connection string with the correct credentials

### CORS Configuration
- Update the `FRONTEND_URL` and `CORS_ORIGIN` environment variables with your actual Vercel domain
- The backend is configured to accept requests from your frontend domain

### File Uploads
- File uploads are configured to use `/tmp/uploads` (Vercel's temporary directory)
- For persistent file storage, consider using Cloudinary or AWS S3

### Socket.io
- Socket.io is configured to work with Vercel's serverless functions
- Real-time features should work correctly

## Post-Deployment

### 1. Test Your Application
- Visit your deployed URL
- Test authentication flows
- Verify API endpoints are working
- Check real-time features (if applicable)

### 2. Set Up Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

### 3. Monitor Your Application
- Use Vercel's built-in analytics
- Monitor function execution times
- Check error logs in the Vercel dashboard

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally
   - Check build logs in Vercel dashboard

2. **API Routes Not Working**
   - Verify environment variables are set correctly
   - Check that MongoDB connection string is valid
   - Ensure CORS is configured properly

3. **Database Connection Issues**
   - Verify MongoDB Atlas cluster is running
   - Check IP whitelist settings
   - Ensure connection string is correct

4. **Environment Variables**
   - Make sure all required variables are set
   - Check that variable names match exactly
   - Redeploy after adding new variables

### Getting Help:
- Check Vercel's documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in your Vercel dashboard
- Check the application logs for runtime errors

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **JWT Secrets**: Use strong, random secrets for production
3. **CORS**: Only allow your frontend domain
4. **Rate Limiting**: Configured to prevent abuse
5. **Input Validation**: Ensure all API endpoints validate input

## Performance Optimization

1. **Code Splitting**: Configured in Vite for optimal loading
2. **Caching**: Static assets are cached by Vercel's CDN
3. **Compression**: Enabled for API responses
4. **Database Indexing**: Ensure proper indexes on MongoDB collections

Your Moonrider Dashboard should now be successfully deployed on Vercel! 🚀
