/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// pages/Home.jsx - Updated for dynamic product loading
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaBuilding, FaIndustry, FaTruck, FaGlobe, 
  FaPen, FaSchool, FaGamepad, FaUtensils, FaLock, 
  FaHeart, FaBirthdayCake, FaPaintBrush, FaHandsWash, 
  FaSoap, FaShower, FaSprayCan, FaStarOfLife,
  FaArrowRight, FaCheckCircle, FaAward, FaUsers, FaBoxes
} from "react-icons/fa";
import { productAPI, categoryAPI, brandAPI } from "../requestMethods";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({
    experience: "10+",
    products: "500+",
    clients: "1000+",
    counties: "47"
  });
  const videoRefs = useRef([]);

  useEffect(() => {
    setIsLoaded(true);
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch categories (or use predefined ones if backend not ready)
      try {
        const categoriesRes = await categoryAPI.getCategories();
        if (categoriesRes.data && categoriesRes.data.length > 0) {
          setCategories(categoriesRes.data);
        } else {
          // Fallback to predefined categories
          setCategories(getDefaultCategories());
        }
      } catch (error) {
        console.log("Using default categories");
        setCategories(getDefaultCategories());
      }

      // Fetch featured products
      try {
        const featuredRes = await productAPI.getFeaturedProducts();
        if (featuredRes.data && featuredRes.data.length > 0) {
          setFeaturedProducts(featuredRes.data.slice(0, 8));
        }
      } catch (error) {
        console.log("Featured products not available");
      }

      // You could also fetch real stats from analytics API
      // const statsRes = await analyticsAPI.getDashboardStats();
      
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  // Default categories (fallback)
  const getDefaultCategories = () => [
    {
      id: "stationery",
      name: "Stationery",
      icon: FaPen,
      description: "Complete range of office and school supplies",
      items: ["Rulers", "Pens", "Pencils", "Rubbers", "Math Sets", "Photocopy Papers"],
      color: "from-red-500 to-red-600",
      count: 25
    },
    {
      id: "bags",
      name: "Bags & Suitcases",
      icon: FaSchool,
      description: "Quality school bags and travel suitcases",
      items: ["School Backpacks", "Travel Suitcases", "Sports Bags", "Laptop Bags"],
      color: "from-rose-500 to-rose-600",
      count: 18
    },
    {
      id: "toys",
      name: "Toys",
      icon: FaGamepad,
      description: "Safe and educational toys for children",
      items: ["Educational Toys", "Action Figures", "Board Games", "Puzzles"],
      color: "from-red-600 to-rose-600",
      count: 42
    },
    {
      id: "kitchenware",
      name: "Kitchenware",
      icon: FaUtensils,
      description: "Essential kitchen tools and accessories",
      items: ["Cooking Utensils", "Storage Containers", "Kitchen Tools", "Tableware"],
      color: "from-rose-600 to-red-600",
      count: 35
    },
    {
      id: "padlocks",
      name: "Padlocks",
      icon: FaLock,
      description: "Secure and durable security solutions",
      items: ["Combination Locks", "Keyed Padlocks", "Heavy Duty Locks", "Security Chains"],
      color: "from-red-700 to-rose-700",
      count: 12
    },
    {
      id: "stuffed-toys",
      name: "Teddy Bears & Stuffed Toys",
      icon: FaHeart,
      description: "Soft and cuddly companions for all ages",
      items: ["Teddy Bears", "Stuffed Animals", "Character Plushies", "Baby Toys"],
      color: "from-rose-500 to-red-500",
      count: 28
    },
    {
      id: "party-items",
      name: "Party Items",
      icon: FaBirthdayCake,
      description: "Complete party and celebration supplies",
      items: ["Paper Cups & Plates", "Cutlery", "Birthday Hats", "Balloons", "Candles"],
      color: "from-red-500 to-rose-500",
      count: 67
    },
    {
      id: "educational",
      name: "Educational Items",
      icon: FaPaintBrush,
      description: "Art and craft supplies for creativity",
      items: ["Paintbrushes", "Canvas", "Modeling Clay", "Art Supplies", "Craft Materials"],
      color: "from-rose-600 to-red-700",
      count: 31
    }
  ];

  // Hero slides with video paths - UPDATE THESE PATHS TO YOUR VIDEO FILES
  const heroSlides = [
    {
      videoPath: "/videos/rekker-general-showcase.mp4", // Replace with your general company video
      title: "Quality Products, Trusted Brands",
      subtitle: "Leading manufacturer and distributor in Kenya",
      cta: "Explore Our Products"
    },
    {
      videoPath: "/videos/Saffron Aqua Handwash Rotating.mp4", // Replace with your Saffron video
      title: "Saffron by Rekker",
      subtitle: "Premium cleaning and personal care solutions",
      cta: "View Saffron Products"
    },
    {
      videoPath: "/videos/Cornells Lotion Rotating.mp4", // Replace with your Cornells video
      title: "Cornells Distribution",
      subtitle: "Exclusive distributor of premium beauty products",
      cta: "Discover Cornells"
    }
  ];

  // Brand showcase data
  const brands = [
    {
      name: "Saffron",
      tagline: "Manufactured by Rekker",
      description: "Premium cleaning and personal care products made in Kenya",
      products: ["Handwashes", "Dishwashing Soaps", "Detergents", "Shower Gels", "After-Shave"],
      image: "/api/placeholder/400/300",
      link: "/brands/saffron",
      color: "from-red-500 to-rose-500"
    },
    {
      name: "Cornells",
      tagline: "Distributed by Rekker",
      description: "Exclusive distributor of premium beauty products by Starling Parfums",
      products: ["Lotions", "Sunscreens", "Toners", "Beauty Care", "Skincare"],
      image: "/api/placeholder/400/300",
      link: "/brands/cornells", 
      color: "from-rose-500 to-red-500"
    }
  ];

  // Auto-slide functionality synchronized with 6-second videos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Changed to 6 seconds to match video length
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Handle video playback when slide changes
  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play the current slide's video
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      currentVideo.play().catch(error => {
        console.log("Video autoplay failed:", error);
        // Fallback: video will play when user interacts with page
      });
    }
  }, [currentSlide]);

  // Handle manual slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-rose-25/20 to-red-50/10">
      
      {/* Hero Section with Professional Carousel and Videos */}
      <div className={`relative h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Carousel with Videos */}
        <div className="relative h-full overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-red-900/50 to-transparent z-10"></div>
              
              {/* Video Background */}
              <video
                ref={el => videoRefs.current[index] = el}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.log(`Video ${index} failed to load:`, e);
                  // Hide video element if it fails to load
                  e.target.style.display = 'none';
                }}
              >
                <source src={slide.videoPath} type="video/mp4" />
                {/* Fallback image if video fails */}
                Your browser does not support the video tag.
              </video>

              {/* Fallback background image (shown if video fails to load) */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/api/placeholder/1200/600')`,
                  zIndex: -1
                }}
              ></div>

              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-6">
                  <div className="max-w-3xl">
                    <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-2xl text-red-100 mb-8 font-medium drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/products/all"
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <span>{slide.cta}</span>
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
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 text-white/70 animate-bounce z-30">
          <div className="text-center">
            <div className="w-px h-16 bg-white/30 mx-auto mb-2"></div>
            <p className="text-sm font-medium">Scroll</p>
          </div>
        </div>
      </div>

      {/* Company Introduction Section */}
      <section className={`py-20 bg-white transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Rekker</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Kenya's trusted manufacturer and distributor of quality products. From everyday essentials 
                to premium branded solutions, we serve retailers, wholesalers, and institutions across the region 
                with uncompromising quality and reliable service.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-red-200/50 transition-all duration-300 transform group-hover:scale-110">
                  <FaBuilding className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.experience}</h3>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-rose-200/50 transition-all duration-300 transform group-hover:scale-110">
                  <FaTruck className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.products}</h3>
                <p className="text-gray-600 font-medium">Products</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-red-200/50 transition-all duration-300 transform group-hover:scale-110">
                  <FaUsers className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.clients}</h3>
                <p className="text-gray-600 font-medium">Happy Clients</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-rose-200/50 transition-all duration-300 transform group-hover:scale-110">
                  <FaGlobe className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.counties}</h3>
                <p className="text-gray-600 font-medium">Counties Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className={`py-20 bg-gradient-to-br from-red-50/30 to-rose-50/30 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Product Categories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of quality products serving diverse market needs across Kenya
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id || category._id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer delay-${index * 100}`}
              >
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color || 'from-red-500 to-rose-500'} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon ? (
                      <category.icon className="w-8 h-8 text-white" />
                    ) : (
                      <FaBoxes className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    {category.count && (
                      <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                  <div className="space-y-2 mb-6">
                    {(category.items || []).slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <FaCheckCircle className="w-3 h-3 text-red-500 mr-2" />
                        {item}
                      </div>
                    ))}
                    {(category.items || []).length > 3 && (
                      <p className="text-sm text-gray-400">+{category.items.length - 3} more</p>
                    )}
                  </div>
                  <Link
                    to={`/products/${category.id || category._id}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold group-hover:translate-x-2 transition-transform duration-300"
                  >
                    View Products <FaArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="text-center mt-12">
            <Link
              to="/products/all"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span>View All Products</span>
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className={`py-20 bg-white transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Products</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular and best-selling products
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {product.img ? (
                      <img 
                        src={product.img} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBoxes className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h4>
                    <p className="text-red-600 font-bold mb-4">
                      KSh {product.discountedPrice || product.originalPrice || product.price}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-lg font-medium text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Brands Section */}
      <section className={`py-20 bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Premium Brands</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-rose-400 mx-auto mb-8"></div>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Trusted brands delivering quality and value across Kenya and beyond
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className={`group bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 delay-${index * 200}`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-80 z-10`}></div>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center text-white">
                      <h3 className="text-4xl font-bold mb-2">{brand.name}</h3>
                      <p className="text-lg opacity-90">{brand.tagline}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-red-100 text-lg mb-6 leading-relaxed">
                    {brand.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {brand.products.map((product, idx) => (
                      <div key={idx} className="flex items-center text-white/80">
                        <FaCheckCircle className="w-3 h-3 text-red-400 mr-2" />
                        <span className="text-sm">{product}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={brand.link}
                    className="inline-flex items-center space-x-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 hover:shadow-xl"
                  >
                    <span>Explore {brand.name}</span>
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Brands CTA */}
          <div className="text-center mt-16">
            <Link
              to="/brands"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span>View All Our Brands</span>
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Rekker Section */}
      <section className={`py-20 bg-white transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Rekker</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-red-200/50 transition-all duration-300 transform group-hover:scale-110">
                <FaAward className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality control processes ensure every product meets international standards and exceeds customer expectations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-rose-200/50 transition-all duration-300 transform group-hover:scale-110">
                <FaTruck className="w-10 h-10 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reliable Distribution</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive distribution network ensuring timely delivery across Kenya with competitive wholesale pricing and minimum order quantities.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-red-200/50 transition-all duration-300 transform group-hover:scale-110">
                <FaUsers className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer First</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated customer service team providing professional support, from product selection to after-sales service and business partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-20 bg-gradient-to-br from-red-600 via-rose-600 to-red-700 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Partner with Rekker?</h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed">
              Whether you're looking for wholesale opportunities, retail partnerships, or distribution agreements, 
              we're here to support your business growth with quality products and professional service.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link
                to="/wholesale-request"
                className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Request Wholesale Pricing
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-red-700"
              >
                Contact Our Team
              </Link>
            </div>

            <div className="mt-8 text-red-100">
              <p className="text-sm">
                *Minimum order quantities apply. Contact us for detailed pricing and terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;