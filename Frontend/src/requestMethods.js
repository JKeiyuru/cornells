/* eslint-disable no-undef */
// requestMethods.js - API configuration for Rekker frontend
import axios from "axios";

// Base URL for API - update this based on your backend deployment
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

// Get token from localStorage if it exists
const getToken = () => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      const parsedRoot = JSON.parse(persistRoot);
      if (parsedRoot.user) {
        const user = JSON.parse(parsedRoot.user);
        return user.currentUser?.accessToken;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Public request instance (no authentication required)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// User request instance (requires authentication)
export const userRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Admin request instance (requires admin authentication)
export const adminRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptors to add tokens
userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors for error handling
const handleResponseError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.status, error.response.data);
    
    // Handle authentication errors
    if (error.response.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem("persist:root");
      window.location.href = "/login";
    }
    
    // Handle other common errors
    switch (error.response.status) {
      case 403:
        error.message = "Access denied. You don't have permission to perform this action.";
        break;
      case 404:
        error.message = "Resource not found.";
        break;
      case 500:
        error.message = "Internal server error. Please try again later.";
        break;
      default:
        error.message = error.response.data?.message || "An error occurred.";
    }
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.request);
    error.message = "Network error. Please check your internet connection.";
  } else {
    // Other error
    console.error('Error:', error.message);
  }
  
  return Promise.reject(error);
};

// Add response interceptors to all instances
[publicRequest, userRequest, adminRequest].forEach(instance => {
  instance.interceptors.response.use(
    (response) => response,
    handleResponseError
  );
});

// Product-specific API calls
export const productAPI = {
  // Get all products with optional filters
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return publicRequest.get(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get single product by ID
  getProduct: (id) => {
    return publicRequest.get(`/products/find/${id}`);
  },

  // Get products by category
  getProductsByCategory: (category) => {
    return publicRequest.get(`/products?category=${category}`);
  },

  // Get products by brand
  getProductsByBrand: (brand) => {
    return publicRequest.get(`/products?brand=${brand}`);
  },

  // Search products
  searchProducts: (searchTerm) => {
    return publicRequest.get(`/products?search=${searchTerm}`);
  },

  // Get featured products
  getFeaturedProducts: () => {
    return publicRequest.get('/products?featured=true');
  },

  // Admin functions (require admin authentication)
  createProduct: (productData) => {
    return adminRequest.post('/products', productData);
  },

  updateProduct: (id, productData) => {
    return adminRequest.put(`/products/${id}`, productData);
  },

  deleteProduct: (id) => {
    return adminRequest.delete(`/products/${id}`);
  },

  // Bulk operations
  bulkUpdateProducts: (updates) => {
    return adminRequest.put('/products/bulk', { updates });
  },

  // Upload product image
  uploadProductImage: (formData) => {
    return adminRequest.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Category-specific API calls
export const categoryAPI = {
  getCategories: () => {
    return publicRequest.get('/categories');
  },

  createCategory: (categoryData) => {
    return adminRequest.post('/categories', categoryData);
  },

  updateCategory: (id, categoryData) => {
    return adminRequest.put(`/categories/${id}`, categoryData);
  },

  deleteCategory: (id) => {
    return adminRequest.delete(`/categories/${id}`);
  }
};

// Brand-specific API calls
export const brandAPI = {
  getBrands: () => {
    return publicRequest.get('/brands');
  },

  getBrand: (brandName) => {
    return publicRequest.get(`/brands/${brandName}`);
  },

  createBrand: (brandData) => {
    return adminRequest.post('/brands', brandData);
  },

  updateBrand: (id, brandData) => {
    return adminRequest.put(`/brands/${id}`, brandData);
  },

  deleteBrand: (id) => {
    return adminRequest.delete(`/brands/${id}`);
  }
};

// Wholesale request API calls
export const wholesaleAPI = {
  submitRequest: (requestData) => {
    return publicRequest.post('/wholesale-requests', requestData);
  },

  getRequests: () => {
    return adminRequest.get('/wholesale-requests');
  },

  updateRequestStatus: (id, status) => {
    return adminRequest.put(`/wholesale-requests/${id}`, { status });
  }
};

// User authentication API calls
export const authAPI = {
  login: (credentials) => {
    return publicRequest.post('/auth/login', credentials);
  },

  register: (userData) => {
    return publicRequest.post('/auth/register', userData);
  },

  logout: () => {
    return userRequest.post('/auth/logout');
  },

  refreshToken: (refreshToken) => {
    return publicRequest.post('/auth/refresh', { refreshToken });
  },

  forgotPassword: (email) => {
    return publicRequest.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return publicRequest.post('/auth/reset-password', { token, newPassword });
  }
};

// Analytics API calls (admin only)
export const analyticsAPI = {
  getDashboardStats: () => {
    return adminRequest.get('/analytics/dashboard');
  },

  getProductStats: (period = '30d') => {
    return adminRequest.get(`/analytics/products?period=${period}`);
  },

  getSalesStats: (period = '30d') => {
    return adminRequest.get(`/analytics/sales?period=${period}`);
  },

  getUserStats: (period = '30d') => {
    return adminRequest.get(`/analytics/users?period=${period}`);
  },

  getTopProducts: (limit = 10) => {
    return adminRequest.get(`/analytics/top-products?limit=${limit}`);
  }
};

// Contact/Support API calls
export const contactAPI = {
  submitContactForm: (contactData) => {
    return publicRequest.post('/contact', contactData);
  },

  submitDistributorRequest: (distributorData) => {
    return publicRequest.post('/distributors/request', distributorData);
  },

  getContactMessages: () => {
    return adminRequest.get('/contact');
  },

  updateContactStatus: (id, status) => {
    return adminRequest.put(`/contact/${id}`, { status });
  }
};

export default {
  publicRequest,
  userRequest,
  adminRequest,
  productAPI,
  categoryAPI,
  brandAPI,
  wholesaleAPI,
  authAPI,
  analyticsAPI,
  contactAPI
};