/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// App.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Announcements from "./components/Announcements";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-purple-300/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-light text-lg">C</span>
            </div>
          </div>
        </div>
        
        {/* Brand Name with Elegant Animation */}
        <div className="space-y-2">
          <h1 className="text-4xl font-light text-white tracking-wider animate-pulse">
            CORNELLS
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto animate-pulse"></div>
          <p className="text-lg text-gray-300 font-light tracking-wide">
            Sterling Parfums
          </p>
        </div>
        
        {/* Loading Text */}
        <div className="mt-8">
          <p className="text-gray-400 font-light text-sm animate-pulse">
            Preparing your luxury experience...
          </p>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return user.currentUser ? children : <Navigate to="/login" replace />;
  };

  // Public Route Component (redirects if already logged in)
  const PublicRoute = ({ children }) => {
    return !user.currentUser ? children : <Navigate to="/" replace />;
  };

  // Main Layout Component
  const Layout = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 20;
        setScrolled(isScrolled);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-pink-50/10">
        {/* Enhanced Announcements Bar */}
        <div className={`transition-all duration-300 ${scrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
          <Announcements />
        </div>
        
        {/* Enhanced Navbar with Scroll Effects */}
        <div className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100/50' 
            : 'bg-transparent'
        }`}>
          <Navbar scrolled={scrolled} />
        </div>

        {/* Page Content with Smooth Transitions */}
        <main className="relative">
          <div className="transition-all duration-500 ease-out">
            <Outlet />
          </div>
        </main>

        {/* Enhanced Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/15 to-purple-100/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
    );
  };

  // Scroll to Top Component
  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl transition-all duration-300 transform z-50 ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        } hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25`}
      >
        <svg 
          className="w-6 h-6 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    );
  };


   // 404 Not Found Component
  const NotFound = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl font-light text-purple-400">404</span>
        </div>
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wider">
          PAGE NOT FOUND
        </h2>
        <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved
        </p>
        <div className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-light tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Return Home</span>
          </a>
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="text-purple-600 hover:text-purple-700 font-light underline"
            >
              Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Router Configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
        {
          path: "/myAccount",
          element: (
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products/:search",
          element: <ProductList />,
        },

        
        // 404 Not Found Route
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    // Authentication Routes (separate layout without navbar/footer)
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/create-account",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
  ]);

 

  // Show loading screen while app initializes
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
      
      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth scrolling for the entire document */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }

        /* Enhanced focus styles for accessibility */
        *:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
        }

        /* Smooth transitions for all interactive elements */
        button, a, input, textarea, select {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced form styling */
        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
          opacity: 1;
        }

        /* Custom selection color */
        ::selection {
          background: rgba(147, 51, 234, 0.2);
          color: #1f2937;
        }

        /* Smooth page transitions */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }

        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s ease-out;
        }

        .page-transition-exit {
          opacity: 1;
          transform: translateY(0);
        }

        .page-transition-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease-in;
        }

        /* Loading animation for images */
        img {
          transition: opacity 0.3s ease;
        }

        img[src=""], img:not([src]) {
          opacity: 0;
        }

        /* Enhance text readability */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Glass morphism effect utilities */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-dark {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Animation delays for staggered effects */
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Shimmer loading effect */
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }

        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;