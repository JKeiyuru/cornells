/* eslint-disable no-undef */
// Admin/src/requestMethods.js - Fixed Version
import axios from 'axios';

// Backend server configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1/";

console.log('🔧 Admin API Base URL:', BASE_URL);

// Set withCredentials to true to handle cookies
axios.defaults.withCredentials = true;

// Create axios instance with better configuration
export const userRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 15000, // 15 second timeout (increased)
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add request interceptor to include token and debug
userRequest.interceptors.request.use(
    (config) => {
        console.log('📤 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.baseURL + config.url,
            headers: config.headers,
            data: config.data ? 'Data present' : 'No data'
        });
        
        // Get token from multiple sources
        const token = localStorage.getItem("token") || 
                     localStorage.getItem("adminToken") ||
                     sessionStorage.getItem("token") ||
                     sessionStorage.getItem("adminToken");
        
        if (token && token !== 'mock-admin-token' && token !== 'undefined' && token !== 'null') {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Token added to request');
        } else {
            console.warn('⚠️ No valid token found');
        }
        
        return config;
    },
    (error) => {
        console.error('📤 Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors and debug
userRequest.interceptors.response.use(
    (response) => {
        console.log('📥 API Response:', {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            dataType: Array.isArray(response.data) ? 'Array' : typeof response.data,
            dataLength: Array.isArray(response.data) ? response.data.length : 
                       (response.data && typeof response.data === 'object') ? Object.keys(response.data).length : 
                       'N/A'
        });
        return response;
    },
    (error) => {
        console.error('📥 API Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            responseData: error.response?.data
        });
        
        // Handle different types of errors
        if (error.code === 'ERR_NETWORK') {
            console.error('🚨 Network Error - Backend might not be running on:', error.config?.baseURL);
            console.log('💡 Troubleshooting steps:');
            console.log('   1. Check if your backend server is running');
            console.log('   2. Verify the correct port (5000)');
            console.log('   3. Check for CORS configuration');
            console.log('   4. Ensure the API endpoint exists');
        }
        
        if (error.code === 'ECONNABORTED') {
            console.error('⏰ Request timeout - server took too long to respond');
        }
        
        if (error.response?.status === 401) {
            console.warn('🔐 Authentication failed - clearing tokens');
            // Clear invalid tokens
            localStorage.removeItem("token");
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("adminToken");
            
            // Only redirect if not already on login page
            if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
                console.log('🔄 Redirecting to login page');
                window.location.href = '/login';
            }
        }
        
        if (error.response?.status === 404) {
            console.error('🔍 API endpoint not found:', error.config?.url);
        }
        
        if (error.response?.status === 403) {
            console.error('🚫 Access forbidden - insufficient permissions');
        }
        
        if (error.response?.status >= 500) {
            console.error('🚨 Server error - check backend logs');
        }
        
        return Promise.reject(error);
    }
);

// Helper function to test API connection
export const testConnection = async () => {
    try {
        console.log('🔍 Testing API connection...');
        const response = await userRequest.get('/health', { timeout: 5000 });
        console.log('✅ API connection successful');
        return { success: true, data: response.data };
    } catch (error) {
        console.error('❌ API connection failed:', error.message);
        return { success: false, error: error.message };
    }
};

// Helper function to check authentication
export const checkAuth = async () => {
    try {
        console.log('🔍 Checking authentication...');
        const response = await userRequest.get('/auth/verify');
        console.log('✅ Authentication valid');
        return { success: true, data: response.data };
    } catch (error) {
        console.error('❌ Authentication check failed:', error.message);
        return { success: false, error: error.message };
    }
};

// Export the configured axios instance as default
export default userRequest;