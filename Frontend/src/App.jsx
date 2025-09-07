/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// App.jsx - Rekker Professional Company Website
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

// New Rekker Pages
import About from "./pages/About";
import Services from "./pages/Services";
import Distributors from "./pages/Distributors";
import Contact from "./pages/Contact";
import SaffronBrand from "./pages/brands/SaffronBrand";
import CornellsBrand from "./pages/brands/CornellsBrand";
import BrandsOverview from "./pages/BrandsOverview";
import WholesaleRequest from "./pages/WholesaleRequest";

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization with company branding
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Professional Loading Screen with Rekker Branding
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Company Logo */}
        <div className="relative mb-8">
          <div className="w-28 h-28 border-4 border-blue-300/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
          </div>
        </div>
        
        {/* Company Name with Professional Animation */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white tracking-wider animate-pulse">
            REKKER
          </h1>
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto animate-pulse"></div>
          <p className="text-xl text-gray-300 font-medium tracking-wide">
            Quality Products, Trusted Brands
          </p>
          <p className="text-sm text-gray-400 font-light">
            Manufacturer & Distributor
          </p>
        </div>
        
        {/* Loading Text */}
        <div className="mt-10">
          <p className="text-gray-400 font-light text-sm animate-pulse">
            Loading professional experience...
          </p>
        </div>
      </div>
      
      {/* Background Animation with Company Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

  // Main Layout Component with Professional Styling
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-green-50/10">
        {/* Professional Announcements Bar */}
        <div className={`transition-all duration-300 ${scrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
          <Announcements />
        </div>
        
        {/* Enhanced Professional Navbar */}
        <div className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-blue-100/50' 
            : 'bg-transparent'
        }`}>
          <Navbar scrolled={scrolled} />
        </div>

        {/* Page Content with Professional Transitions */}
        <main className="relative">
          <div className="transition-all duration-500 ease-out">
            <Outlet />
          </div>
        </main>

        {/* Professional Footer */}
        <Footer />

        {/* Scroll to Top Button with Company Branding */}
        <ScrollToTop />

        {/* Professional Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-green-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-100/15 to-blue-100/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
    );
  };

  // Professional Scroll to Top Component
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
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-2xl transition-all duration-300 transform z-50 ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        } hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25`}
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

  // Professional 404 Not Found Component
  const NotFound = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl font-light text-blue-400">404</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-wider">
          PAGE NOT FOUND
        </h2>
        <p className="text-gray-600 font-medium text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved
        </p>
        <div className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-medium tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Return Home</span>
          </a>
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Router Configuration with Professional Structure
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
          path: "/about",
          element: <About />,
        },
         {
           path: "/services",
           element: <Services />,
         },
         {
          path: "/distributors",
           element: <Distributors />,
         },
         {
          path: "/contact",
          element: <Contact />,
         },
        {
          path: "/brands",
          element: <BrandsOverview />,
        },
         {
           path: "/brands/saffron",
           element: <SaffronBrand />,
         },
         {
           path: "/brands/cornells",
           element: <CornellsBrand />,
         },
        {
          path: "/wholesale-request",
          element: <WholesaleRequest />,
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
          path: "/products/:category",
          element: <ProductList />,
        },
        // 404 Not Found Route
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    // Authentication Routes (separate layout)
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
      
      {/* Professional Global Styles */}
      <style jsx global>{`
        /* Professional smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Professional scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #2563eb, #059669);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1d4ed8, #047857);
        }

        /* Professional focus styles */
        *:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        /* Professional transitions */
        button, a, input, textarea, select {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Professional form styling */
        input::placeholder,
        textarea::placeholder {
          color: #6b7280;
          opacity: 1;
        }

        /* Professional selection color */
        ::selection {
          background: rgba(37, 99, 235, 0.2);
          color: #1f2937;
        }

        /* Professional text rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Professional glass effects */
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

        /* Professional gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Professional animations */
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        /* Professional floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Professional shimmer effect */
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }

        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }

        /* Professional hover effects */
        .hover-lift {
          transition: transform 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        /* Professional card shadows */
        .card-shadow {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-shadow-lg {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default App;