/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// components/Navbar.jsx - Updated Professional Rekker Navigation with Red Theme and Scrollable Dropdown
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { 
  FaShoppingCart, FaUser, FaChevronDown, FaBars, FaTimes,
  FaPen, FaSchool, FaGamepad, FaUtensils, FaLock, FaHeart,
  FaBirthdayCake, FaPaintBrush, FaHandsWash, FaSprayCan,
  FaBuilding, FaIndustry, FaTruck, FaPhone, FaGem, FaLeaf,
  FaSpa, FaSun, FaStar, FaGlobe
} from "react-icons/fa";

const Navbar = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Updated product categories with distinct red color schemes
  const productCategories = [
    { 
      name: "Rekker Products", 
      isHeader: true,
      description: "Quality products manufactured and distributed by Rekker",
      colorScheme: "crimson", // Deep red
      bgGradient: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
      iconBg: "from-red-100 to-red-200",
      iconColor: "text-red-700",
      hoverColor: "hover:text-red-700",
      buttonGradient: "from-red-600 to-red-700",
      items: [
        { name: "Stationery", icon: FaPen, path: "/products/stationery", desc: "Pens, Pencils, Rulers, Papers, Math Sets" },
        { name: "School Bags & Suitcases", icon: FaSchool, path: "/products/bags", desc: "Backpacks, Travel Bags, Suitcases" },
        { name: "Toys", icon: FaGamepad, path: "/products/toys", desc: "Educational Toys, Building Blocks, Games" },
        { name: "Kitchenware", icon: FaUtensils, path: "/products/kitchenware", desc: "Cooking Sets, Kitchen Tools, Utensils" },
        { name: "Padlocks", icon: FaLock, path: "/products/padlocks", desc: "Security Locks, Heavy Duty Padlocks" },
        { name: "Teddy Bears & Stuffed Toys", icon: FaHeart, path: "/products/stuffed-toys", desc: "Plush Toys, Teddy Bears, Soft Toys" },
        { name: "Party Items", icon: FaBirthdayCake, path: "/products/party-items", desc: "Paper Cups, Plates, Balloons, Party Supplies" },
        { name: "Educational Items", icon: FaPaintBrush, path: "/products/educational", desc: "Art Supplies, Paintbrushes, Canvas, Clay" }
      ]
    },
    {
      name: "Saffron Brand",
      isHeader: true,
      description: "Premium personal care products manufactured by Rekker",
      colorScheme: "orange-red", // Orange-red
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      iconBg: "from-orange-100 to-red-100",
      iconColor: "text-orange-700",
      hoverColor: "hover:text-orange-700",
      buttonGradient: "from-orange-600 to-red-600",
      items: [
        { name: "Handwash", icon: FaHandsWash, path: "/products/personal-care", desc: "Premium Antibacterial Handwash" },
        { name: "Dishwashing Liquid", icon: FaUtensils, path: "/products/kitchen-care", desc: "Concentrated Grease-Cutting Formula" },
        { name: "Shower Gels", icon: FaSpa, path: "/products/personal-care", desc: "Moisturizing Body Wash" },
        { name: "After-Shave Anti-Bump", icon: FaSun, path: "/products/personal-care", desc: "Men's Skincare Solution" },
        { name: "Liquid Detergent", icon: FaBuilding, path: "/products/laundry-care", desc: "High-Efficiency Laundry Care" }
      ]
    },
    {
      name: "Cornells Brand",
      isHeader: true,
      description: "Global wellness products exclusively distributed by Rekker",
      colorScheme: "rose", // Pink-red
      bgGradient: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200",
      iconBg: "from-rose-100 to-pink-100",
      iconColor: "text-rose-700",
      hoverColor: "hover:text-rose-700",
      buttonGradient: "from-rose-600 to-pink-600",
      items: [
        { name: "Bold & Beautiful Collection", icon: FaGem, path: "/products/skincare", desc: "Premium Body Lotions with Shea Butter" },
        { name: "Cute & Pretty Collection", icon: FaHeart, path: "/products/skincare", desc: "Gentle Family & Baby Care" },
        { name: "Dark & Beautiful Collection", icon: FaStar, path: "/products/hair-care", desc: "Professional Hair Care Solutions" },
        { name: "Super Food Collection", icon: FaLeaf, path: "/products/skincare", desc: "Nutritive Wellness Products" }
      ]
    }
  ];

  // Services dropdown items
  const services = [
    { name: "Wholesale Distribution", icon: FaTruck, path: "/services#wholesale", desc: "Bulk orders with competitive pricing" },
    { name: "Private Labeling", icon: FaBuilding, path: "/services#private-label", desc: "Custom branding solutions" },
    { name: "Contract Manufacturing", icon: FaIndustry, path: "/services#manufacturing", desc: "OEM manufacturing services" },
    { name: "Retail Partnerships", icon: FaHandsWash, path: "/services#retail", desc: "Become an authorized retailer" }
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
    <nav className={`w-full transition-all duration-300 bg-gradient-to-r from-red-50 via-red-25 to-rose-50 border-b border-red-100 ${scrolled ? 'py-2' : 'py-4'}`} ref={dropdownRef}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo with Red Theme */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-rose-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaGlobe className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors duration-300">
                REKKER
              </h1>
              <p className="text-xs text-red-600 font-medium">Quality Products, Global Brands</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Home */}
            <Link
              to="/"
              className="text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2 relative group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2 relative group"
            >
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Enhanced Horizontal Products Dropdown with Scroll */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className="flex items-center space-x-1 text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2 group"
              >
                <span>Products</span>
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white rounded-2xl shadow-2xl border border-red-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200 max-h-[80vh] overflow-y-auto">
                  <div className="p-8">
                    {/* Horizontal Layout with Three Sections */}
                    <div className="grid grid-cols-3 gap-8">
                      {productCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className={`p-6 rounded-xl bg-gradient-to-br ${category.bgGradient} border ${category.borderColor} flex flex-col h-full`}>
                          {/* Section Header */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                                {category.name}
                              </h3>
                              {category.name === 'Cornells Brand' && (
                                <div className="flex items-center space-x-1 text-xs text-rose-600 font-medium bg-white px-2 py-1 rounded-full">
                                  <FaGlobe className="w-3 h-3" />
                                  <span>Global</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                          </div>
                          
                          {/* Products Grid - Scrollable */}
                          <div className="flex-1 overflow-y-auto max-h-80 pr-2">
                            <div className="space-y-3">
                              {category.items.map((item, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={item.path}
                                  onClick={closeDropdown}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/70 transition-all duration-200 group border border-transparent hover:border-white/50"
                                >
                                  <div className={`w-10 h-10 bg-gradient-to-br ${category.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm flex-shrink-0`}>
                                    <item.icon className={`w-5 h-5 ${category.iconColor}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-gray-900 group-${category.hoverColor} transition-colors text-sm leading-tight`}>
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          
                          {/* Section CTA Button - Fixed at Bottom */}
                          <div className="mt-6 pt-4 border-t border-gray-200 flex-shrink-0">
                            <Link
                              to={category.name === 'Rekker Products' ? '/products/all' : 
                                  category.name === 'Saffron Brand' ? '/brands/saffron' : '/brands/cornells'}
                              onClick={closeDropdown}
                              className={`block w-full text-center bg-gradient-to-r ${category.buttonGradient} text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm`}
                            >
                              {category.name === 'Rekker Products' ? 'View All Products' : 
                               category.name === 'Saffron Brand' ? 'Explore Saffron' : 'Explore Cornells'}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Bottom Action Bar */}
                    <div className="mt-8 pt-6 border-t border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-red-600">
                          <span className="font-medium">Need bulk orders?</span> Contact us for wholesale pricing
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            to="/contact"
                            onClick={closeDropdown}
                            className="px-6 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                          >
                            Contact Us
                          </Link>
                          <Link
                            to="/wholesale-request"
                            onClick={closeDropdown}
                            className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Get Wholesale Quote
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className="flex items-center space-x-1 text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2"
              >
                <span>Services</span>
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-red-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-red-900 uppercase tracking-wide mb-2">Our Services</h4>
                      <p className="text-xs text-red-600">Professional solutions for your business needs</p>
                    </div>
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        onClick={closeDropdown}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-rose-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <service.icon className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors block">
                            {service.name}
                          </span>
                          <p className="text-xs text-red-500 mt-1">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Distributors */}
            <Link
              to="/distributors"
              className="text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2 relative group"
            >
              Distributors
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="text-red-800 hover:text-red-600 font-semibold transition-colors duration-300 py-2 relative group"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Wholesale Request Button */}
            <Link
              to="/wholesale-request"
              className="hidden lg:inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <FaTruck className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Wholesale</span>
            </Link>

            {/* Cart Icon */}
            {user && (
              <Link
                to="/cart"
                className="relative p-2 text-red-800 hover:text-red-600 transition-colors duration-300 group"
              >
                <FaShoppingCart className="w-6 h-6" />
                {cart.quantity > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cart.quantity}
                  </span>
                )}
                <div className="absolute inset-0 rounded-full border-2 border-red-600 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-110 transition-all duration-300"></div>
              </Link>
            )}

            {/* Enhanced User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('user')}
                  className="flex items-center space-x-2 p-2 text-red-800 hover:text-red-600 transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">{user.name}</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-red-100 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="p-2">
                      <div className="px-4 py-3 border-b border-red-100">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-red-600">{user.email}</div>
                      </div>
                      <Link
                        to="/myAccount"
                        onClick={closeDropdown}
                        className="flex items-center space-x-3 px-4 py-3 text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        <FaUser className="w-4 h-4" />
                        <span>My Account</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={closeDropdown}
                        className="flex items-center space-x-3 px-4 py-3 text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        <FaTruck className="w-4 h-4" />
                        <span>Order History</span>
                      </Link>
                      <div className="border-t border-red-100 mt-2 pt-2">
                        <button
                          onClick={handlelogOut}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-red-800 hover:text-red-600 font-semibold transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/create-account"
                  className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 text-red-800 hover:text-red-600 transition-colors duration-300 relative group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-red-600 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-110 transition-all duration-300"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Red Theme */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-red-50 to-white shadow-2xl border-t border-red-100 z-40 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                <Link
                  to="/"
                  onClick={closeDropdown}
                  className="block py-3 text-red-800 hover:text-red-600 font-semibold border-b border-red-100 transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeDropdown}
                  className="block py-3 text-red-800 hover:text-red-600 font-semibold border-b border-red-100 transition-colors duration-300"
                >
                  About
                </Link>
                
                {/* Mobile Products */}
                <div className="border-b border-red-100">
                  <button
                    onClick={() => toggleDropdown('mobile-products')}
                    className="flex items-center justify-between w-full py-3 text-red-800 hover:text-red-600 font-semibold transition-colors duration-300"
                  >
                    <span>Products</span>
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobile-products' && (
                    <div className="pb-4 pl-4">
                      {productCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-sm font-bold uppercase ${category.iconColor}`}>{category.name}</h4>
                            {category.name === 'Cornells Brand' && (
                              <div className="flex items-center space-x-1 text-xs text-rose-600 font-medium">
                                <FaGlobe className="w-3 h-3" />
                                <span>Global</span>
                              </div>
                            )}
                          </div>
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.path}
                              onClick={closeDropdown}
                              className={`flex items-center space-x-2 py-2 text-red-600 ${category.hoverColor} transition-colors pl-2`}
                            >
                              <item.icon className={`w-4 h-4 ${category.iconColor}`} />
                              <span className="text-sm">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Services */}
                <div className="border-b border-red-100">
                  <button
                    onClick={() => toggleDropdown('mobile-services')}
                    className="flex items-center justify-between w-full py-3 text-red-800 hover:text-red-600 font-semibold transition-colors duration-300"
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
                          className="flex items-center space-x-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <service.icon className="w-4 h-4 text-red-600" />
                          <span className="text-sm">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/distributors"
                  onClick={closeDropdown}
                  className="block py-3 text-red-800 hover:text-red-600 font-semibold border-b border-red-100 transition-colors duration-300"
                >
                  Distributors
                </Link>
                
                <Link
                  to="/contact"
                  onClick={closeDropdown}
                  className="block py-3 text-red-800 hover:text-red-600 font-semibold border-b border-red-100 transition-colors duration-300"
                >
                  Contact
                </Link>

                {/* Mobile Auth/User Menu */}
                {user ? (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center space-x-3 pb-3 border-b border-red-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-red-900">{user.name}</div>
                        <div className="text-xs text-red-600">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      to="/cart"
                      onClick={closeDropdown}
                      className="flex items-center space-x-3 py-2 text-red-700 hover:text-red-600 transition-colors"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      <span>Cart ({cart.quantity})</span>
                    </Link>
                    <Link
                      to="/myAccount"
                      onClick={closeDropdown}
                      className="block py-2 text-red-700 hover:text-red-600 transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      onClick={closeDropdown}
                      className="block py-2 text-red-700 hover:text-red-600 transition-colors"
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
                      className="block py-2 text-red-800 hover:text-red-600 font-semibold transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/create-account"
                      onClick={closeDropdown}
                      className="block py-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
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
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <FaTruck className="w-4 h-4" />
                    <span>Request Wholesale Pricing</span>
                  </Link>
                </div>

                {/* Mobile Brand Shortcuts */}
                <div className="pt-4 border-t border-red-100">
                  <div className="text-xs text-red-600 uppercase tracking-wide font-bold mb-3">Featured Brands</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to="/products/all"
                      onClick={closeDropdown}
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-lg text-center font-medium text-xs"
                    >
                      Rekker
                    </Link>
                    <Link
                      to="/brands/saffron"
                      onClick={closeDropdown}
                      className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-2 rounded-lg text-center font-medium text-xs"
                    >
                      Saffron
                    </Link>
                    <Link
                      to="/brands/cornells"
                      onClick={closeDropdown}
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-2 rounded-lg text-center font-medium text-xs"
                    >
                      Cornells
                    </Link>
                  </div>
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