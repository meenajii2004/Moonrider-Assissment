import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, User, Product, Order, Notification } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API methods
export const apiService = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.get(url, config);
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.post(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.put(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.delete(url, config);
    return response.data;
  },

  // PATCH request
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.patch(url, data, config);
    return response.data;
  },
};

// Auth API
export const authAPI = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    return apiService.post<{ token: string; user: User }>('/auth/login', credentials);
  },

  // Register
  register: async (userData: { name: string; email: string; password: string }) => {
    return apiService.post<{ token: string; user: User }>('/auth/register', userData);
  },

  // Google OAuth
  googleAuth: async (token: string) => {
    return apiService.post<{ token: string; user: User }>('/auth/google', { token });
  },

  // Logout
  logout: async () => {
    return apiService.post('/auth/logout');
  },

  // Refresh token
  refreshToken: async () => {
    return apiService.post<{ token: string }>('/auth/refresh');
  },

  // Get current user
  getCurrentUser: async () => {
    return apiService.get<User>('/auth/me');
  },

  // Update profile
  updateProfile: async (profileData: Partial<User>) => {
    return apiService.put<User>('/auth/profile', profileData);
  },

  // Change password
  changePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    return apiService.put('/auth/password', passwords);
  },
};

// Users API
export const usersAPI = {
  // Get all users
  getUsers: async (params?: { page?: number; limit?: number; search?: string; role?: string }) => {
    return apiService.get<{ users: User[]; pagination: any }>('/users', { params });
  },

  // Get user by ID
  getUser: async (id: string) => {
    return apiService.get<User>(`/users/${id}`);
  },

  // Create user
  createUser: async (userData: Partial<User>) => {
    return apiService.post<User>('/users', userData);
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>) => {
    return apiService.put<User>(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: async (id: string) => {
    return apiService.delete(`/users/${id}`);
  },

  // Toggle user status
  toggleUserStatus: async (id: string) => {
    return apiService.patch<User>(`/users/${id}/toggle-status`);
  },
};

// Products API
export const productsAPI = {
  // Get all products
  getProducts: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    return apiService.get<{ products: Product[]; pagination: any }>('/products', { params });
  },

  // Get product by ID
  getProduct: async (id: string) => {
    return apiService.get<Product>(`/products/${id}`);
  },

  // Create product
  createProduct: async (productData: FormData) => {
    return apiService.post<Product>('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update product
  updateProduct: async (id: string, productData: FormData) => {
    return apiService.put<Product>(`/products/${id}`, productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Delete product
  deleteProduct: async (id: string) => {
    return apiService.delete(`/products/${id}`);
  },

  // Get product categories
  getCategories: async () => {
    return apiService.get('/products/categories');
  },

  // Upload product image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiService.post<{ url: string }>('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Orders API
export const ordersAPI = {
  // Get all orders
  getOrders: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    return apiService.get<{ orders: Order[]; pagination: any }>('/orders', { params });
  },

  // Get order by ID
  getOrder: async (id: string) => {
    return apiService.get<Order>(`/orders/${id}`);
  },

  // Create order
  createOrder: async (orderData: Partial<Order>) => {
    return apiService.post<Order>('/orders', orderData);
  },

  // Update order
  updateOrder: async (id: string, orderData: Partial<Order>) => {
    return apiService.put<Order>(`/orders/${id}`, orderData);
  },

  // Delete order
  deleteOrder: async (id: string) => {
    return apiService.delete(`/orders/${id}`);
  },

  // Update order status
  updateOrderStatus: async (id: string, status: string) => {
    return apiService.patch<Order>(`/orders/${id}/status`, { status });
  },

  // Get order statistics
  getOrderStats: async () => {
    return apiService.get('/orders/stats');
  },
};

// Dashboard API
export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    return apiService.get('/dashboard/stats');
  },

  // Get chart data
  getChartData: async (type: string, period: string) => {
    return apiService.get(`/dashboard/charts/${type}`, { params: { period } });
  },

  // Get recent activities
  getRecentActivities: async (limit: number = 10) => {
    return apiService.get('/dashboard/activities', { params: { limit } });
  },

  // Get user dashboard preferences
  getDashboardPreferences: async () => {
    return apiService.get('/dashboard/preferences');
  },

  // Update dashboard preferences
  updateDashboardPreferences: async (preferences: any) => {
    return apiService.put('/dashboard/preferences', preferences);
  },
};

// Notifications API
export const notificationsAPI = {
  // Get notifications
  getNotifications: async (params?: { page?: number; limit?: number; unreadOnly?: boolean }) => {
    return apiService.get<{ notifications: Notification[]; pagination: any }>('/notifications', { params });
  },

  // Mark notification as read
  markAsRead: async (id: string) => {
    return apiService.patch<Notification>(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return apiService.patch('/notifications/mark-all-read');
  },

  // Delete notification
  deleteNotification: async (id: string) => {
    return apiService.delete(`/notifications/${id}`);
  },

  // Get unread count
  getUnreadCount: async () => {
    return apiService.get<{ count: number }>('/notifications/unread-count');
  },
};

// Export API
export const exportAPI = {
  // Export data to CSV
  exportToCSV: async (endpoint: string, params?: any) => {
    return apiService.get(`/export/${endpoint}/csv`, { 
      params,
      responseType: 'blob'
    });
  },

  // Export data to PDF
  exportToPDF: async (endpoint: string, params?: any) => {
    return apiService.get(`/export/${endpoint}/pdf`, { 
      params,
      responseType: 'blob'
    });
  },

  // Export data to Excel
  exportToExcel: async (endpoint: string, params?: any) => {
    return apiService.get(`/export/${endpoint}/excel`, { 
      params,
      responseType: 'blob'
    });
  },
};

// Settings API
export const settingsAPI = {
  // Get app settings
  getSettings: async () => {
    return apiService.get('/settings');
  },

  // Update app settings
  updateSettings: async (settings: any) => {
    return apiService.put('/settings', settings);
  },

  // Get user preferences
  getPreferences: async () => {
    return apiService.get('/settings/preferences');
  },

  // Update user preferences
  updatePreferences: async (preferences: any) => {
    return apiService.put('/settings/preferences', preferences);
  },
};

// Analytics API
export const analyticsAPI = {
  // Get analytics data
  getAnalytics: async (params?: { 
    period?: string; 
    metric?: string; 
    groupBy?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    return apiService.get('/analytics', { params });
  },

  // Get real-time data
  getRealTimeData: async () => {
    return apiService.get('/analytics/realtime');
  },

  // Get user behavior
  getUserBehavior: async (params?: { userId?: string; period?: string }) => {
    return apiService.get('/analytics/user-behavior', { params });
  },
};

export default api;
