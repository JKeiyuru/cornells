// components/Menu.jsx
import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaCrown,
  FaGem,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    // Redirect to login page
    navigate("/login");
  };

  const menuItems = [
    { path: "/", icon: FaHome, label: "Dashboard", section: "main" },
    { path: "/users", icon: FaUsers, label: "Users", section: "management" },
    { path: "/products", icon: FaBox, label: "Products", section: "management" },
    { path: "/orders", icon: FaClipboardList, label: "Orders", section: "management" },
    { path: "/banners", icon: FaElementor, label: "Banners", section: "content" },
    { path: "/settings", icon: FaCog, label: "Settings", section: "system" },
    { path: "/backups", icon: FaHdd, label: "Backups", section: "system" },
    { path: "/charts", icon: FaChartBar, label: "Analytics", section: "insights" },
    { path: "/logs", icon: FaClipboard, label: "System Logs", section: "insights" },
  ];

  const renderMenuItem = (item) => (
    <Link 
      key={item.path} 
      to={item.path} 
      onClick={() => handleLinkClick(item.path)}
      className="block w-full"
    >
      <li
        className={`group flex items-center text-[16px] cursor-pointer my-2 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden
          ${
            activeLink === item.path
              ? "bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] text-gray-900 shadow-xl"
              : "text-gray-600 hover:bg-gradient-to-r hover:from-[#f8f5f0] hover:to-[#faf7f2] hover:text-gray-800"
          }
        `}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 ${
          activeLink === item.path ? "translate-x-full" : "-translate-x-full group-hover:translate-x-full"
        } transition-transform duration-700`} />
        
        <item.icon
          className={`mr-4 text-[20px] transition-all duration-300 ${
            activeLink === item.path 
              ? "text-gray-900 scale-110" 
              : "text-[#d4af37] group-hover:text-[#b8941f] group-hover:scale-110"
          }`}
        />
        <span className="font-medium relative z-10">{item.label}</span>
        
        {activeLink === item.path && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FaGem className="text-[#d4af37] text-[12px] animate-pulse" />
          </div>
        )}
      </li>
    </Link>
  );

  const getSectionTitle = (section) => {
    const titles = {
      main: "MAIN",
      management: "MANAGEMENT",
      content: "CONTENT",
      system: "SYSTEM",
      insights: "INSIGHTS"
    };
    return titles[section];
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="h-[100vh] bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] w-[320px] shadow-2xl border-r border-[#e8e2d4] relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#d4af37] rounded-full" />
        <div className="absolute top-32 right-8 w-20 h-20 border border-[#d4af37] rounded-full" />
        <div className="absolute bottom-20 left-6 w-24 h-24 border border-[#d4af37] rounded-full" />
      </div>

      {/* Header */}
      <div className="p-8 border-b border-[#e8e2d4]">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center shadow-lg">
            <FaCrown className="text-2xl text-white" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">
            CORNELLS
          </h1>
          <p className="text-sm text-gray-500 font-light tracking-wider">ADMIN PANEL</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4 border-b border-[#e8e2d4]">
        <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-[#f8f5f0] to-[#faf7f2] hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mr-3">
            <FaUser className="text-white text-[16px]" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-[14px]">Administrator</p>
            <p className="text-[12px] text-gray-500">Sterling Parfums</p>
          </div>
          <FaStar className="ml-auto text-[#d4af37] text-[14px]" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-8">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-widest mb-4 px-2">
              {getSectionTitle(section)}
            </h3>
            <ul className="space-y-1">
              {items.map(renderMenuItem)}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="p-6 border-t border-[#e8e2d4]">
        <button
          onClick={handleLogout}
          className="group flex items-center justify-center w-full text-[16px] cursor-pointer px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <FaSignOutAlt className="mr-3 text-[20px] transition-all duration-300 group-hover:scale-110" />
          <span className="font-medium relative z-10">Logout</span>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          </div>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#f4e4bc] to-[#d4af37]" />
    </div>
  );
};

export default Menu;