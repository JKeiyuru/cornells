// components/Category.jsx
import { useState } from "react";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    { name: "All", label: "ALL COLLECTIONS" },
    { name: "Face Products", label: "FACE ESSENTIALS" },
    { name: "Body Products", label: "BODY LUXURIES" },
    { name: "Nails Products", label: "NAIL ARTISTRY" },
    { name: "Hair Products", label: "HAIR COUTURE" }
  ];

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-amber-500/20 relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-center space-x-0">
          {categories.map((category, index) => (
            <div key={category.name} className="relative group">
              <button
                onClick={() => setActiveCategory(category.name)}
                className={`relative px-8 py-4 text-sm font-light tracking-[0.15em] uppercase transition-all duration-500 hover:scale-105 ${
                  activeCategory === category.name
                    ? "text-amber-400"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {/* Background Glow for Active Item */}
                {activeCategory === category.name && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-400/20 to-amber-400/10 rounded-lg blur-sm"></div>
                )}
                
                <span className="relative z-10">{category.label}</span>
                
                {/* Animated Underline */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 ${
                    activeCategory === category.name
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60"
                  }`}
                ></div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>

              {/* Separator */}
              {index < categories.length - 1 && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" 
                style={{animationDelay: `${i * 0.3}s`}}
              ></div>
            ))}
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>
      </div>

      {/* Premium Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
      
      {/* Subtle Animation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
    </div>
  );
};

export default Category;