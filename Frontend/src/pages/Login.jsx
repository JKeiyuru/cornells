/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
// pages/Login.jsx - Rekker Professional Business Login
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {  
    e.preventDefault();

    try {
      setLoading(true);
      await login(dispatch, {email, password });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          style: {
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            color: '#f8f8f8',
            border: '1px solid #3b82f6',
          }
        });
      } else {
        toast.error("Login failed. Please check your credentials.", {
          style: {
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            color: '#f8f8f8',
            border: '1px solid #3b82f6',
          }
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />

      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="flex relative z-10">
          {/* Image Section */}
          <div className="hidden lg:flex w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 z-10"></div>
            <img
              src="/rekker-products.jpg"
              alt="Rekker Products"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-4 tracking-wider">REKKER</h3>
                <p className="text-lg font-light opacity-80 mb-2">Quality Products Since 2009</p>
                <p className="text-sm font-light opacity-60">Manufacturing • Distribution • Excellence</p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"></div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-12 lg:p-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-white mb-4 tracking-wider">Welcome Back</h1>
              <p className="text-gray-300 text-lg font-light">Access your wholesale account</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="business@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                  <span className="ml-2 font-light">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors font-light">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-light tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                <span className="relative z-10">
                  {loading ? "Signing In..." : "Sign In"}
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="px-6 text-gray-400 font-light text-sm">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              <p className="text-gray-300 font-light mb-4">
                New business partner?{" "}
                <Link to="/create-account" className="text-blue-400 hover:text-blue-300 transition-colors font-normal">
                  Apply for wholesale account
                </Link>
              </p>

              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-white font-medium mb-2">Wholesale Benefits</h4>
                <div className="text-sm text-gray-300 font-light space-y-1">
                  <p>• Competitive wholesale pricing</p>
                  <p>• Minimum order quantities (MOQ)</p>
                  <p>• Dedicated account management</p>
                  <p>• Flexible payment terms</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center">
              <div className="text-sm text-gray-400 font-light">
                <p className="mb-2">Need assistance with your account?</p>
                <div className="flex items-center justify-center space-x-4">
                  <span>📞 +254 700 123 456</span>
                  <span>✉️ support@rekker.co.ke</span>
                </div>
                <p className="mt-2 text-xs">Business Hours: Mon-Fri 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user.currentUser && <Navigate to="/" replace />}

      <style jsx>{`
        .custom-toast-container {
          font-family: inherit;
        }
        .custom-toast-container .Toastify__toast {
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Login;