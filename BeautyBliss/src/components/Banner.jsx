// components/Banner.jsx
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods.js";

const Banner = () => {
  const [banner, setBanner] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchRandomBanner = async () => {
      try {
        const res = await userRequest.get("/banners/random");
        setBanner(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch random banner", error);
        // Fallback to default luxury banner
        setBanner({
          img: "/luxury-fragrance-banner.jpg",
          title: "DISCOVER THE ESSENCE OF LUXURY",
          subtitle: "CORNELLS SIGNATURE COLLECTION"
        });
        setIsLoaded(true);
      }
    };

    fetchRandomBanner();
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white font-light tracking-widest">LOADING LUXURY...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${banner.img || '/luxury-fragrance-banner.jpg'})`,
        }}
      ></div>

      {/* Sophisticated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="w-full lg:w-1/2 text-white space-y-8 transform transition-all duration-1000 ease-out">
          
          {/* Subtitle */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
              <div className="text-amber-400 text-sm font-light tracking-[0.3em] uppercase">
                {banner.subtitle || "CORNELLS SIGNATURE COLLECTION"}
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-thin tracking-wider leading-none">
              <span className="block text-white">
                {banner.title?.split(' ')[0] || "DISCOVER"}
              </span>
              <span className="block text-amber-400 text-4xl lg:text-6xl mt-2">
                {banner.title?.split(' ').slice(1).join(' ') || "THE ESSENCE OF LUXURY"}
              </span>
            </h1>
            
            <div className="w-24 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
          </div>

          {/* Description */}
          <p className="text-xl text-white/80 font-light leading-relaxed max-w-lg">
            Experience the pinnacle of luxury fragrance craftsmanship. Each scent tells a story of elegance, sophistication, and timeless beauty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <button className="group relative px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-medium tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">EXPLORE COLLECTION</span>
            </button>
            
            <button className="group relative px-12 py-4 border-2 border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-light tracking-widest uppercase transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-3">
                <span>PERSONAL CONSULTATION</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Premium Features */}
          <div className="flex items-center space-x-8 pt-8 text-sm text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="tracking-wide">FREE SHIPPING</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="tracking-wide">GIFT WRAPPING</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="tracking-wide">30-DAY RETURN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-widest uppercase">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;