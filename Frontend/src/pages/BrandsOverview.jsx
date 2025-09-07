/* eslint-disable react/no-unescaped-entities */
// pages/BrandsOverview.jsx - Rekker Brands Overview
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaHandsWash, FaSprayCan, FaSoap, FaShower, FaPumpSoap,
  FaSun, FaTint, FaLeaf, FaAward, FaGlobe, FaArrowRight,
  FaCertificate, FaIndustry, FaTruck, FaHeart
} from "react-icons/fa";

const BrandsOverview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Brand showcase slides
  const brandSlides = [
    {
      brand: "Saffron",
      tagline: "Manufactured by Rekker",
      description: "Premium cleaning and personal care solutions made in Kenya",
      image: "/api/placeholder/800/600",
      color: "from-orange-500 to-red-500"
    },
    {
      brand: "Cornells", 
      tagline: "Distributed by Rekker",
      description: "Exclusive distributor of luxury beauty products by Starling Parfums",
      image: "/api/placeholder/800/600",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Saffron products
  const saffronProducts = [
    {
      name: "Premium Handwash",
      description: "Antibacterial handwash with moisturizing formula",
      image: "/api/placeholder/300/400",
      features: ["Antibacterial", "Moisturizing", "Long-lasting fragrance"],
      icon: FaHandsWash
    },
    {
      name: "Liquid Dishwashing Soap",
      description: "Powerful grease-cutting formula that's gentle on hands",
      image: "/api/placeholder/300/400",
      features: ["Grease-cutting", "Gentle formula", "Pleasant scent"],
      icon: FaSoap
    },
    {
      name: "Liquid Detergent",
      description: "High-efficiency detergent for all fabric types",
      image: "/api/placeholder/300/400",
      features: ["Deep cleaning", "Color protection", "Eco-friendly"],
      icon: FaPumpSoap
    },
    {
      name: "Shower Gel",
      description: "Luxurious shower gel with natural moisturizers",
      image: "/api/placeholder/300/400",
      features: ["Natural ingredients", "Rich lather", "Skin moisturizing"],
      icon: FaShower
    },
    {
      name: "After-Shave Anti-Bump",
      description: "Soothing after-shave solution for men",
      image: "/api/placeholder/300/400",
      features: ["Anti-bump formula", "Soothing", "Quick absorption"],
      icon: FaSprayCan
    }
  ];

  // Cornells products
  const cornellsProducts = [
    {
      name: "Premium Lotions",
      description: "Nourishing body lotions for all skin types",
      image: "/api/placeholder/300/400",
      features: ["Deep moisturizing", "All skin types", "Long-lasting"],
      icon: FaTint
    },
    {
      name: "Sunscreen Collection",
      description: "Broad-spectrum UV protection for daily use",
      image: "/api/placeholder/300/400",
      features: ["SPF 30-50", "Water resistant", "Non-greasy"],
      icon: FaSun
    },
    {
      name: "Facial Toners",
      description: "Refreshing toners for healthy, glowing skin",
      image: "/api/placeholder/300/400",
      features: ["pH balancing", "Pore minimizing", "Natural extracts"],
      icon: FaLeaf
    },
    {
      name: "Skincare Essentials",
      description: "Complete skincare routine products",
      image: "/api/placeholder/300/400",
      features: ["Anti-aging", "Hydrating", "Dermatologist tested"],
      icon: FaHeart
    }
  ];

  // Brand achievements
  const achievements = [
    {
      icon: FaAward,
      title: "Quality Certified",
      description: "All products meet international quality standards"
    },
    {
      icon: FaGlobe,
      title: "Market Leaders",
      description: "Trusted by thousands of customers across Kenya"
    },
    {
      icon: FaCertificate,
      title: "ISO Certified",
      description: "Manufacturing processes certified to ISO standards"
    },
    {
      icon: FaTruck,
      title: "Nationwide Distribution",
      description: "Available in all 47 counties through our network"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % brandSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [brandSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-green-50/10">
      {/* Hero Section with Brand Carousel */}
      <div className={`relative h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative h-full overflow-hidden">
          {brandSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90 z-10`}></div>
              <img
                src={slide.image}
                alt={slide.brand}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-6">
                  <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-7xl font-bold mb-4 tracking-wide">
                      {slide.brand}
                    </h1>
                    <p className="text-2xl mb-6 font-medium opacity-90">
                      {slide.tagline}
                    </p>
                    <p className="text-xl mb-10 leading-relaxed opacity-80 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    <Link
                      to={`/brands/${slide.brand.toLowerCase()}`}
                      className="inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <span>Explore {slide.brand}</span>
                      <FaArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {brandSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Brand Introduction */}
      <section className={`py-20 bg-white transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Two Distinctive Brands, One Quality Promise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Rekker proudly presents two premium brands that serve different market needs while maintaining 
              our commitment to quality, innovation, and customer satisfaction. From manufacturing excellence 
              to exclusive distribution partnerships, we bring you the best products in their respective categories.
            </p>
          </div>
        </div>
      </section>

      {/* Saffron Brand Section */}
      <section className={`py-20 bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Saffron Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <FaHandsWash className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Saffron</h2>
                  <p className="text-lg text-orange-600 font-semibold">Manufactured by Rekker</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our flagship brand of premium cleaning and personal care products, manufactured in Kenya 
                with international quality standards. Saffron represents our commitment to local manufacturing excellence.
              </p>
            </div>

            {/* Saffron Products Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
              {saffronProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saffron CTA */}
            <div className="text-center">
              <Link
                to="/brands/saffron"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span>Explore All Saffron Products</span>
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cornells Brand Section */}
      <section className={`py-20 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Cornells Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaSprayCan className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Cornells</h2>
                  <p className="text-lg text-purple-600 font-semibold">Distributed by Rekker</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                As the exclusive distributor of Cornells beauty products in Kenya, we bring you premium 
                skincare solutions manufactured by Starling Parfums. Experience luxury beauty products 
                with proven results.
              </p>
            </div>

            {/* Cornells Products Grid */}
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-8 mb-16">
              {cornellsProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <product.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-500">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cornells CTA */}
            <div className="text-center">
              <Link
                to="/brands/cornells"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span>Explore All Cornells Products</span>
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Achievements */}
      <section className={`py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Why Our Brands Excel</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-purple-400 mx-auto mb-8"></div>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Both Saffron and Cornells represent excellence in their respective categories, 
                backed by our commitment to quality and customer satisfaction.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100/10 to-green-100/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 border border-white/10">
                    <achievement.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Partner with Our Brands</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Whether you're interested in Saffron's manufacturing excellence or Cornells' luxury beauty solutions, 
              we offer wholesale opportunities and distribution partnerships across Kenya.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Link
                to="/wholesale-request"
                className="bg-white text-blue-700 px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Wholesale Inquiry
              </Link>
              <Link
                to="/distributors"
                className="border-2 border-white text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-blue-700"
              >
                Become a Distributor
              </Link>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandsOverview;