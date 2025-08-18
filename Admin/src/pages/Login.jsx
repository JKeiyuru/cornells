// Admin/src/pages/login/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, User, Lock, Shield } from "lucide-react";
import { userRequest } from "../requestMethods";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Call the actual backend API
      const response = await userRequest.post('auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Check if user has admin role
        if (response.data.user.role !== 'admin') {
          setErrors({ 
            general: 'Access denied. Administrator privileges required.' 
          });
          return;
        }

        // Store the user info in localStorage for admin panel
        localStorage.setItem('adminToken', 'authenticated');
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        
        // Navigate to admin dashboard
        navigate('/');
      } else {
        setErrors({ 
          general: response.data.message || 'Login failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.status === 401) {
        setErrors({ general: 'Invalid email or password' });
      } else if (error.response?.status === 403) {
        setErrors({ general: 'Access denied. Administrator privileges required.' });
      } else if (error.code === 'ECONNREFUSED') {
        setErrors({ general: 'Cannot connect to server. Please try again later.' });
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Image */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-[#8b4513]/20 z-10"></div>
              <img
                src="https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Cornell's Luxury Beauty"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="text-3xl text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Cornells Admin</h2>
                  <p className="text-lg opacity-90">Luxury Beauty Management System</p>
                  <div className="mt-8 space-y-2 text-sm opacity-80">
                    <p>✨ Manage your luxury collection</p>
                    <p>📊 Track sales and analytics</p>
                    <p>👥 Customer relationship management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <User className="text-2xl text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#8b4513] bg-clip-text text-transparent">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 mt-2">Sign in to your admin dashboard</p>
                </div>

                {/* Error Message */}
                {errors.general && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {errors.general}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="Enter your admin email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 ${
                          errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#d4af37] focus:ring-[#d4af37] focus:ring-offset-0"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#d4af37] hover:text-[#b8941f] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Shield className="mr-2" />
                    )}
                    {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                  </button>
                </form>

                {/* Help Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm">Admin Access</h4>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>• Use your registered email and password</p>
                    <p>• Your account must have admin role privileges</p>
                    <p>• Contact system administrator if you need access</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Need help accessing your account?{' '}
                    <Link to="/support" className="text-[#d4af37] hover:text-[#b8941f] transition-colors font-medium">
                      Contact Support
                    </Link>
                  </p>
                  <div className="mt-6 text-xs text-gray-500">
                    <p>© 2024 Cornells by Sterling Parfums. All rights reserved.</p>
                    <p className="mt-1">Secure Admin Access • Protected by SSL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;