/* eslint-disable react/prop-types */
// components/Navbar.jsx - Professional Rekker Navigation
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { 
  FaShoppingCart, FaUser, FaChevronDown, FaBars, FaTimes,
  FaPen, FaSchool, FaGamepad, FaUtensils, FaLock, FaHeart,
  FaBirthdayCake, FaPaintBrush, FaHandsWash, FaSprayCan,
  FaBuilding, FaIndustry, FaTruck, FaPhone
} from "react-icons/fa";

const Navbar = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Product categories for dropdown
  const productCategories = [
    { 
      name: "Rekker Products", 
      isHeader: true,
      items: [
        { name: "Stationery", icon: FaPen, path: "/products/stationery" },
        { name: "School Bags & Suitcases", icon: FaSchool, path: "/products/bags" },
        { name: "Toys", icon: FaGamepad, path: "/products/toys" },
        { name: "Kitchenware", icon: FaUtensils, path: "/products/kitchenware" },
        { name: "Padlocks", icon: FaLock, path: "/products/padlocks" },
        { name: "Teddy Bears & Stuffed Toys", icon: FaHeart, path: "/products/stuffed-toys" },
        { name: "Party Items", icon: FaBirthdayCake, path: "/products/party-items" },
        { name: "Educational Items", icon: FaPaintBrush, path: "/products/educational" }
      ]
    },
    {
      name: "Our Brands",
      isHeader: true,
      items: [
        { name: "Saffron Products", icon: FaHandsWash, path: "/brands/saffron", desc: "Cleaning & Personal Care" },
        { name: "Cornells Products", icon: FaSprayCan, path: "/brands/cornells", desc: "Beauty & Skincare" }
      ]
    }
  ];

  // Services dropdown items
  const services = [
    { name: "Wholesale Distribution", icon: FaTruck, path: "/services#wholesale" },
    { name: "Private Labeling", icon: FaBuilding, path: "/services#private-label" },
    { name: "Contract Manufacturing", icon: FaIndustry, path: "/services#manufacturing" },
    { name: "Bulk Orders", icon: FaBuilding, path: "/services#bulk-orders" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlelogOut = () => {
    dispatch(logOut());
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`w-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`} ref={dropdownRef}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                REKKER
              </h1>
              <p className="text-xs text-gray-500 font-medium">Quality Products, Trusted Brands</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Home */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
            >
              About
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
              >
                <span>Products</span>
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-6">
                    {productCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="mb-6 last:mb-0">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-100 pb-2">
                          {category.name}
                        </h4>
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.path}
                              onClick={closeDropdown}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <item.icon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </p>
                                {item.desc && (
                                  <p className="text-xs text-gray-500">{item.desc}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <Link
                        to="/products/all"
                        onClick={closeDropdown}
                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
              >
                <span>Services</span>
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-4">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        onClick={closeDropdown}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <service.icon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                          {service.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Distributors */}
            <Link
              to="/distributors"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
            >
              Distributors
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 py-2"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wholesale Request Button */}
            <Link
              to="/wholesale-request"
              className="hidden lg:inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
            >
              <FaTruck className="w-4 h-4" />
              <span>Wholesale</span>
            </Link>

            {/* Cart Icon */}
            {user && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                <FaShoppingCart className="w-6 h-6" />
                {cart.quantity > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cart.quantity}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('user')}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="hidden md:block font-medium">{user.name}</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="p-2">
                      <Link
                        to="/myAccount"
                        onClick={closeDropdown}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={closeDropdown}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      >
                        Order History
                      </Link>
                      <button
                        onClick={handlelogOut}
                        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/create-account"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-40 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                <Link
                  to="/"
                  onClick={closeDropdown}
                  className="block py-3 text-gray-700 hover:text-blue-600 font-semibold border-b border-gray-100 transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeDropdown}
                  className="block py-3 text-gray-700 hover:text-blue-600 font-semibold border-b border-gray-100 transition-colors duration-300"
                >
                  About
                </Link>
                
                {/* Mobile Products */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown('mobile-products')}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                  >
                    <span>Products</span>
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobile-products' && (
                    <div className="pb-4 pl-4">
                      {productCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4">
                          <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">{category.name}</h4>
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.path}
                              onClick={closeDropdown}
                              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors pl-2"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Services */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown('mobile-services')}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                  >
                    <span>Services</span>
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'mobile-services' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobile-services' && (
                    <div className="pb-4 pl-4">
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          to={service.path}
                          onClick={closeDropdown}
                          className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/distributors"
                  onClick={closeDropdown}
                  className="block py-3 text-gray-700 hover:text-blue-600 font-semibold border-b border-gray-100 transition-colors duration-300"
                >
                  Distributors
                </Link>
                
                <Link
                  to="/contact"
                  onClick={closeDropdown}
                  className="block py-3 text-gray-700 hover:text-blue-600 font-semibold border-b border-gray-100 transition-colors duration-300"
                >
                  Contact
                </Link>

                {/* Mobile Auth/User Menu */}
                {user ? (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                      <FaUser className="w-5 h-5 text-gray-500" />
                      <span className="font-semibold text-gray-900">{user.name}</span>
                    </div>
                    <Link
                      to="/cart"
                      onClick={closeDropdown}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      <span>Cart ({cart.quantity})</span>
                    </Link>
                    <Link
                      to="/myAccount"
                      onClick={closeDropdown}
                      className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      onClick={closeDropdown}
                      className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={handlelogOut}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 space-y-3">
                    <Link
                      to="/login"
                      onClick={closeDropdown}
                      className="block py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/create-account"
                      onClick={closeDropdown}
                      className="block py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                )}

                {/* Mobile Wholesale CTA */}
                <div className="pt-4">
                  <Link
                    to="/wholesale-request"
                    onClick={closeDropdown}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-3 rounded-lg font-semibold"
                  >
                    <FaTruck className="w-4 h-4" />
                    <span>Request Wholesale Pricing</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;