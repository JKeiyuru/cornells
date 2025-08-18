// components/Navbar.jsx
import { FaSearch, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white text-sm h-10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <span className="relative z-10 font-light tracking-widest">
          COMPLIMENTARY SHIPPING ON ALL ORDERS OVER $150 • EXCLUSIVE MEMBERS GET 20% OFF
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 cursor-pointer group">
              <Link to="/" className="block">
                <div className="text-center">
                  <div className="text-3xl font-thin text-white mb-1 tracking-[0.2em] group-hover:text-amber-400 transition-colors duration-300">
                    CORNELLS
                  </div>
                  <div className="text-xs text-amber-400 font-light tracking-[0.3em] opacity-80">
                    BY STERLING PARFUMS
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1 group-hover:via-amber-300 transition-colors duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Premium Search Bar */}
            <div className="flex-1 max-w-2xl mx-12">
              <div className={`relative group ${isSearchFocused ? 'transform scale-105' : ''} transition-transform duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Discover luxury fragrances..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all duration-300 text-sm tracking-wide"
                  />
                  <Link 
                    to={`/products/${search}`}
                    className="absolute right-4 p-2 hover:bg-amber-400/20 rounded-full transition-colors duration-300 group"
                  >
                    <FaSearch className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Premium Actions */}
            <div className="flex items-center space-x-6">
              
              {/* Favorites */}
              <div className="relative group cursor-pointer">
                <div className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 group-hover:scale-110">
                  <FaHeart className="text-white group-hover:text-amber-400 transition-colors duration-300" size={18} />
                </div>
              </div>

              {/* Cart with Premium Badge */}
              <Link to="/cart" className="relative group">
                <div className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 group-hover:scale-110">
                  <Badge 
                    badgeContent={quantity} 
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#F59E0B',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        minWidth: '20px',
                        height: '20px',
                        borderRadius: '10px',
                      },
                    }}
                  >
                    <ShoppingBasketIcon className="text-white group-hover:text-amber-400 transition-colors duration-300" />
                  </Badge>
                </div>
              </Link>

              {/* Premium User Account */}
              <div className="relative group">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-3 px-6 py-3 border border-amber-400/40 rounded-full hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 group-hover:scale-105"
                >
                  <FaUser className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300" size={16} />
                  {!user.currentUser ? (
                    <span className="text-white group-hover:text-amber-300 transition-colors duration-300 font-light tracking-wide text-sm">
                      MEMBER LOGIN
                    </span>
                  ) : (
                    <Link to="/myaccount">
                      <span className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300 font-light tracking-wide text-sm uppercase">
                        {user.currentUser.name}
                      </span>
                    </Link>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
      </nav>
    </>
  );
};

export default Navbar;