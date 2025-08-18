/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Admin/src/App.jsx
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import Banner from "./pages/Banner";
import Settings from "./pages/Settings";
import Backups from "./pages/Backups";
import Charts from "./pages/Charts";
import Logs from "./pages/Logs";
import { userRequest } from "./requestMethods";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have admin token
        const adminToken = localStorage.getItem("adminToken");
        const adminUser = localStorage.getItem("adminUser");
        
        if (!adminToken || adminToken !== 'authenticated') {
          setIsAuthenticated(false);
          return;
        }

        if (adminUser) {
          const userData = JSON.parse(adminUser);
          
          // Verify the token is still valid by calling the backend
          try {
            const response = await userRequest.get('auth/verify');
            if (response.data.success && response.data.user.role === 'admin') {
              setUser(response.data.user);
              setIsAuthenticated(true);
            } else {
              // Invalid token or not admin
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              setIsAuthenticated(false);
            }
          } catch (error) {
            // Token verification failed
            console.error('Token verification failed:', error);
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#d4af37] font-medium">Loading Cornells Admin...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main Layout Component
const Layout = () => {
  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    
    // Call backend logout endpoint
    userRequest.post('auth/logout').catch(error => {
      console.error('Logout error:', error);
    });
    
    // Force reload to clear any cached data
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee]">
      <div className="sticky top-0 h-screen">
        <Menu onLogout={handleLogout} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  return children; // In a real app, you'd implement proper error boundary logic
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "product/:id",
          element: <Product />,
        },
        {
          path: "newproduct",
          element: <NewProduct />,
        },
        {
          path: "banners",
          element: <Banner />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "backups",
          element: <Backups />,
        },
        {
          path: "charts",
          element: <Charts />,
        },
        {
          path: "logs",
          element: <Logs />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee]">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#d4af37] mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
            <div className="w-24 h-24 border-4 border-[#d4af37] border-dashed rounded-full mx-auto mb-8 animate-pulse"></div>
            <p className="text-gray-500">The requested page could not be found.</p>
          </div>
        </div>
      ),
    },
  ]);

  return (
    <ErrorBoundary>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}

export default App;