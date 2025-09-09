// components/Slider.jsx - Red Theme
import { useState } from "react";

const Slider = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      title: "LUXURY SERUMS",
      subtitle: "INTENSIVE CARE",
      image: "/serum.jpg",
      description: "Advanced anti-aging formulas with premium ingredients",
      gradient: "from-red-600/80 to-rose-800/80"
    },
    {
      id: 2,
      title: "PREMIUM TONERS",
      subtitle: "PERFECT BALANCE",
      image: "/serum1.jpg",
      description: "Alcohol-free toners that restore your skin's natural pH",
      gradient: "from-rose-600/80 to-red-800/80"
    },
    {
      id: 3,
      title: "SILK LOTIONS",
      subtitle: "VELVET TOUCH",
      image: "/lotion.jpg",
      description: "Luxurious moisturizers for the ultimate skin comfort",
      gradient: "from-red-500/80 to-rose-700/80"
    },
    {
      id: 4,
      title: "COUTURE FOUNDATION",
      subtitle: "FLAWLESS FINISH",
      image: "/foundation.jpg",
      description: "Professional makeup that enhances natural beauty",
      gradient: "from-rose-500/80 to-red-700/80"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-red-400"></div>
            <div className="text-red-400 text-sm font-light tracking-[0.3em] uppercase">
              DISCOVER OUR COLLECTIONS
            </div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-red-400"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-thin text-white tracking-wider">
            CURATED <span className="text-red-400">LUXURY</span>
          </h2>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Experience our handpicked selection of premium beauty essentials, crafted for the discerning connoisseur
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative h-96 cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-4"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 group-hover:border-red-400/30 transition-all duration-500">
                
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} transition-opacity duration-500 ${hoveredCard === index ? 'opacity-90' : 'opacity-70'}`}></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="space-y-3 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    
                    {/* Subtitle */}
                    <div className="text-red-400 text-xs font-light tracking-[0.2em] uppercase opacity-80">
                      {category.subtitle}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-thin tracking-wide leading-tight">
                      {category.title}
                    </h3>

                    {/* Description - appears on hover */}
                    <p className={`text-white/80 text-sm font-light leading-relaxed transition-all duration-500 ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      {category.description}
                    </p>

                    {/* Decorative Line */}
                    <div className="pt-4">
                      <div className={`h-px bg-gradient-to-r from-red-400 to-transparent transition-all duration-700 ${hoveredCard === index ? 'w-20' : 'w-8'}`}></div>
                    </div>

                    {/* Shop Now Button */}
                    <div className={`pt-2 transition-all duration-500 ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <button className="text-red-400 text-sm font-light tracking-widest uppercase hover:text-red-300 transition-colors duration-300">
                        EXPLORE COLLECTION
                      </button>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-t from-red-400/0 via-red-400/5 to-red-400/0 rounded-2xl transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400/20 rounded-2xl transition-all duration-500"></div>
              </div>

              {/* Card Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl transform translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-12 space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-thin text-white tracking-wider">
              CAN'T DECIDE? <span className="text-red-400">WE'RE HERE TO HELP</span>
            </h3>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Book a complimentary consultation with our beauty experts and discover your perfect fragrance profile
            </p>
          </div>
          <button className="px-12 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-medium tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl rounded-lg">
            BOOK CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;