/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// pages/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        style: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#f8f8f8',
          border: '1px solid #d4af37',
        }
      });
      return;
    }

    try {
      setLoading(true);
      await userRequest.post("/auth/register", { name, email, password });
      toast.success("Account created successfully! Please sign in.", {
        style: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#f8f8f8',
          border: '1px solid #d4af37',
        }
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          style: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: '#f8f8f8',
            border: '1px solid #d4af37',
          }
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          style: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: '#f8f8f8',
            border: '1px solid #d4af37',
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent"></div>
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
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-12 lg:p-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-white mb-4 tracking-wider">Join Cornells</h1>
              <p className="text-gray-300 text-lg font-light">Begin your exclusive beauty journey</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="your.email@example.com"
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
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <input 
                  type="checkbox" 
                  required
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 mt-1" 
                />
                <label className="text-gray-300 font-light leading-relaxed">
                  I agree to Cornells{" "}
                  <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-light tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                <span className="relative z-10">
                  {loading ? "Creating Account..." : "Create Account"}
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="px-6 text-gray-400 font-light text-sm">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              <p className="text-gray-300 font-light">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-normal">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-10"></div>
            <img
              src="/lotion1.jpg"
              alt="Cornells Beauty Products"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h3 className="text-4xl font-light mb-4 tracking-wider">CORNELLS</h3>
                <p className="text-lg font-light opacity-80 mb-4">Sterling Parfums</p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
                <p className="text-sm font-light opacity-60 max-w-xs leading-relaxed">
                  Discover exclusive beauty products crafted for the discerning individual
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Register;