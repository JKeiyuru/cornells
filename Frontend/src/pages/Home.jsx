/* eslint-disable react/no-unescaped-entities */
// pages/Home.jsx
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import SliderItem from "../components/Slider";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 overflow-hidden">
      {/* Hero Section with Enhanced Visuals */}
      <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
        </div>

        <Banner />
      </div>

      {/* Enhanced Slider Section */}
      <div className={`relative py-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-pink-900/5"></div>
        
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block">
            <h2 className="text-5xl font-light text-gray-900 mb-4 tracking-wider relative">
              FEATURED
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium beauty essentials, curated for the most discerning tastes
          </p>
        </div>

        <SliderItem />
      </div>

      {/* Enhanced Products Section */}
      <div className={`relative py-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block">
            <h2 className="text-5xl font-light text-gray-900 mb-4 tracking-wider relative">
              COLLECTIONS
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </h2>
          </div>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Explore our complete range of luxury beauty products, each crafted with the finest ingredients and uncompromising quality
          </p>
        </div>

        <Products />
      </div>

      {/* Enhanced Newsletter Section */}
      <div className={`relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-light text-white mb-6 tracking-wider">
              JOIN THE CORNELLS EXPERIENCE
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 font-light mb-12 leading-relaxed">
              Be the first to discover our latest collections, exclusive offers, and beauty insights from our expert curators
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-light tracking-wide uppercase rounded-r-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4 font-light">
                *Unsubscribe at any time. Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Features Section */}
      <div className={`py-20 bg-white/50 backdrop-blur-sm transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-200/50 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-3 tracking-wide">PREMIUM QUALITY</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Each product is meticulously crafted with the finest ingredients and undergoes rigorous quality testing
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-200/50 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-3 tracking-wide">SECURE SHIPPING</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Your luxury products are carefully packaged and delivered with premium protection worldwide
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-200/50 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-3 tracking-wide">EXPERT CURATION</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Our beauty experts personally select and test every product to ensure exceptional results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;