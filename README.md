# 🌙 Moonrider Dashboard

A comprehensive full-stack MERN dashboard application with advanced features including Google OAuth authentication, real-time notifications, interactive charts, and role-based access control.

![Moonrider Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC)

## ✨ Features

### 🔐 Authentication & Security
- **Google OAuth Integration** - Seamless login with Google accounts
- **JWT Token Authentication** - Secure token-based authentication
- **Role-based Access Control** - Admin and User roles with different permissions
- **Password Reset & Email Verification** - Complete account recovery system
- **Rate Limiting** - Protection against brute force attacks
- **Account Lockout** - Automatic account protection after failed attempts

### 🎨 User Interface
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Smooth Animations** - Framer Motion powered animations throughout the app
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Interactive Charts** - Chart.js powered data visualization
- **Real-time Updates** - Socket.io for live notifications and updates

### 📊 Dashboard & Analytics
- **Interactive Charts** - Line, Bar, and Doughnut charts for data visualization
- **Real-time Statistics** - Live updates of key metrics
- **Customizable Widgets** - Drag and drop dashboard widgets
- **Export Functionality** - CSV, PDF, and Excel export capabilities
- **Advanced Filtering** - Search and filter data with multiple criteria

### 🔔 Notifications & Communication
- **Real-time Notifications** - Instant push notifications via Socket.io
- **Email Notifications** - Automated email alerts for important events
- **In-app Notifications** - Toast notifications and notification center
- **Multi-channel Support** - Email, push, and SMS notifications

### 🛠️ Advanced Features
- **File Upload** - Drag and drop file upload with image optimization
- **Data Export** - Export data in multiple formats (CSV, PDF, Excel)
- **Search & Filter** - Advanced search with multiple filter options
- **Pagination** - Efficient data pagination for large datasets
- **Sorting** - Multi-column sorting capabilities
- **Bulk Operations** - Perform actions on multiple items at once

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Chart.js** - Interactive charts and graphs
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Socket.io** - Real-time bidirectional communication
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development & Deployment
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Docker** - Containerization
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Cloud database

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/moonrider-dashboard.git
cd moonrider-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. **Start development server**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moonrider-dashboard
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

4. **Start development server**
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirect URIs
6. Copy Client ID and Client Secret to your environment variables

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Set up database access (username/password)
4. Set up network access (IP whitelist)
5. Get your connection string
6. Update `MONGODB_URI` in your environment variables

### Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in your environment variables

## 🧪 Testing

### Frontend Tests
```bash
npm test
npm run test:watch
```

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

## 📦 Build & Deployment

### Frontend (Vercel)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

### Backend (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Set environment variables**
4. **Deploy**

### Environment Variables for Production

#### Frontend (Vercel)
- `VITE_API_URL` - Your backend API URL
- `VITE_SOCKET_URL` - Your backend Socket.io URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID

#### Backend (Render)
- `NODE_ENV=production`
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Strong JWT secret
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `EMAIL_HOST` - SMTP host
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password

## 📁 Project Structure

```
moonrider-dashboard/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Reusable components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main app component
├── backend/
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── public/                 # Static files
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)
- `PATCH /api/users/:id/toggle-status` - Toggle user status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/charts/:type` - Get chart data
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/preferences` - Get user preferences
- `PUT /api/dashboard/preferences` - Update preferences

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/upload-image` - Upload product image

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `PATCH /api/orders/:id/status` - Update order status

### Notifications
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password hashing
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Comprehensive input validation
- **CORS Protection** - Cross-origin resource sharing protection
- **Helmet Security** - Security headers
- **XSS Protection** - Cross-site scripting protection
- **SQL Injection Protection** - MongoDB injection protection

## 📊 Performance Features

- **React Query** - Efficient server state management
- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Optimized image loading
- **Caching** - Intelligent caching strategies
- **Compression** - Gzip compression
- **CDN Ready** - Static asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/moonrider-dashboard/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Chart.js](https://www.chartjs.org/) - Charting library
- [Socket.io](https://socket.io/) - Real-time communication

---

**Made with ❤️ by the Moonrider Team**
