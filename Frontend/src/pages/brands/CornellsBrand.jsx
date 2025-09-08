/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// pages/brands/CornellsBrand.jsx - Updated to match official Cornells website
import { useState, useEffect } from "react";
import { 
  FaLeaf, 
  FaHeart, 
  FaGlobe, 
  FaUserFriends,
  FaFlask,
  FaMedal,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaShoppingCart,
  FaEye,
  FaSun,
  FaHandHoldingHeart ,
  FaSeedling,
  FaGem
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CornellsBrand = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCollection, setActiveCollection] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Product Collections matching Cornells official website
  const productCollections = [
    {
      id: "bold-beautiful",
      name: "Bold & Beautiful",
      tagline: "Body Lotions & Care",
      description: "Deeply nourishing body lotions with Shea Butter and natural ingredients for ultra-rich, lightweight hydration.",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      products: [
        {
          name: "Bold & Beautiful Vanilla Lotion",
          size: "400ml",
          description: "Ultra-rich vanilla scented body lotion with Shea Butter",
          wholesalePrice: "KSh 280",
          moq: "24 units",
          keyBenefits: ["Shea Butter Enriched", "24hr Hydration", "Non-Greasy Formula", "Vanilla Fragrance"]
        },
        {
          name: "Bold & Beautiful Cocoa Butter Lotion", 
          size: "400ml",
          description: "Intensive moisture with natural cocoa butter for silky skin",
          wholesalePrice: "KSh 285",
          moq: "24 units", 
          keyBenefits: ["Cocoa Butter", "Deep Moisturizing", "Skin Repair", "Natural Fragrance"]
        }
      ]
    },
    {
      id: "cute-pretty",
      name: "Cute & Pretty",
      tagline: "Kids & Family Care",
      description: "Gentle, safe formulations designed specifically for children's delicate skin and family wellness.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      products: [
        {
          name: "Cute & Pretty Baby Lotion",
          size: "200ml",
          description: "Gentle moisturizing lotion for baby's sensitive skin",
          wholesalePrice: "KSh 180",
          moq: "36 units",
          keyBenefits: ["Pediatrician Tested", "Tear-Free Formula", "Hypoallergenic", "24hr Protection"]
        },
        {
          name: "Cute & Pretty Kids Sunscreen",
          size: "100ml", 
          description: "SPF 50+ protection specifically formulated for children",
          wholesalePrice: "KSh 320",
          moq: "24 units",
          keyBenefits: ["SPF 50+", "Water Resistant", "Kid-Safe Formula", "No White Residue"]
        }
      ]
    },
    {
      id: "dark-beautiful",
      name: "Dark & Beautiful",
      tagline: "Hair Care Excellence",
      description: "Professional hair care solutions celebrating natural beauty with nourishing ingredients for all hair types.",
      color: "from-amber-600 to-orange-600",
      bgColor: "bg-amber-50",
      products: [
        {
          name: "Dark & Beautiful Hair Oil",
          size: "250ml",
          description: "Nourishing hair oil blend for strength and shine",
          wholesalePrice: "KSh 240", 
          moq: "30 units",
          keyBenefits: ["Natural Oils", "Hair Strengthening", "Shine Enhancement", "Scalp Nourishment"]
        },
        {
          name: "Dark & Beautiful Shampoo",
          size: "400ml",
          description: "Gentle cleansing shampoo for healthy, beautiful hair",
          wholesalePrice: "KSh 260",
          moq: "24 units",
          keyBenefits: ["Sulfate-Free", "Color Safe", "Natural Extracts", "pH Balanced"]
        }
      ]
    },
    {
      id: "super-food",
      name: "Super Food",
      tagline: "Nutritive Wellness",
      description: "Vitamin and nutrient-enriched personal care products inspired by nature's superfoods for optimal wellness.",
      color: "from-green-600 to-emerald-600",
      bgColor: "bg-green-50",
      products: [
        {
          name: "Super Food Vitamin C Serum",
          size: "30ml",
          description: "Antioxidant-rich facial serum with natural vitamin C",
          wholesalePrice: "KSh 450",
          moq: "18 units",
          keyBenefits: ["Vitamin C", "Antioxidant Rich", "Anti-Aging", "Brightening Effect"]
        },
        {
          name: "Super Food Body Scrub",
          size: "200ml", 
          description: "Exfoliating scrub with superfood extracts and natural oils",
          wholesalePrice: "KSh 320",
          moq: "24 units",
          keyBenefits: ["Natural Exfoliation", "Superfood Extracts", "Skin Renewal", "Moisturizing"]
        }
      ]
    }
  ];

  // Global Stats matching official website
  const globalStats = [
    {
      icon: <FaGlobe className="w-8 h-8" />,
      number: "90+",
      label: "Countries",
      description: "Global Footprint"
    },
    {
      icon: <FaUserFriends className="w-8 h-8" />,
      number: "30M+",
      label: "Happy Customers",
      description: "Customer Joy"
    },
    {
      icon: <FaFlask className="w-8 h-8" />,
      number: "2000+",
      label: "Products",
      description: "Creative Innovations"
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      number: "0",
      label: "Animal Testing",
      description: "Ethics Upheld"
    }
  ];

  // Core Values matching Cornells philosophy
  const coreValues = [
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Cruelty-Free Beauty",
      description: "Every product is meticulously created without any animal testing, upholding the highest ethical standards."
    },
    {
      icon: <FaSeedling className="w-8 h-8" />,
      title: "Responsibly Sourced",
      description: "Our 2000+ products are responsibly sourced, supporting sustainable and ethical beauty practices."
    },
    {
      icon: <FaSun className="w-8 h-8" />,
      title: "Innovation Driven",
      description: "Driving progress in the beauty industry with advanced facilities and cutting-edge formulations."
    },
    {
      icon: <FaHandHoldingHeart  className="w-8 h-8" />,
      title: "Global Impact",
      description: "Making a positive impact across 90+ countries, fostering connections and spreading beauty worldwide."
    }
  ];

  // Best Sellers section
  const bestSellers = [
    {
      name: "Bold & Beautiful Shea Butter Lotion",
      collection: "Bold & Beautiful",
      price: "KSh 280",
      originalPrice: "KSh 320",
      discount: "12% OFF",
      rating: 4.8,
      reviews: 2847,
      moq: "24 units",
      image: "/placeholder/cornells-bold-beautiful.jpg"
    },
    {
      name: "Dark & Beautiful Hair Treatment Oil",
      collection: "Dark & Beautiful", 
      price: "KSh 240",
      originalPrice: "KSh 280",
      discount: "14% OFF",
      rating: 4.9,
      reviews: 1926,
      moq: "30 units",
      image: "/placeholder/cornells-hair-oil.jpg"
    },
    {
      name: "Super Food Vitamin E Face Cream",
      collection: "Super Food",
      price: "KSh 380", 
      originalPrice: "KSh 420",
      discount: "10% OFF",
      rating: 4.7,
      reviews: 1534,
      moq: "20 units",
      image: "/placeholder/cornells-vitamin-e.jpg"
    },
    {
      name: "Cute & Pretty Baby Care Set",
      collection: "Cute & Pretty",
      price: "KSh 450",
      originalPrice: "KSh 520", 
      discount: "13% OFF",
      rating: 4.9,
      reviews: 987,
      moq: "18 units",
      image: "/placeholder/cornells-baby-set.jpg"
    }
  ];

  const testimonials = [
    {
      name: "Grace Wanjiru",
      business: "Beauty Haven, Westlands",
      rating: 5,
      comment: "Cornells products are genuine global quality. The Bold & Beautiful line is our top seller, customers absolutely love the Shea Butter formulation."
    },
    {
      name: "Michael Oduya", 
      business: "Oduya Pharmacy, Kisumu",
      rating: 5,
      comment: "The variety in Cornells range is incredible. From baby care to anti-aging, we stock the full collection. Excellent margins and customer satisfaction."
    },
    {
      name: "Sarah Mbugua",
      business: "Mbugua Beauty Store, Nakuru", 
      rating: 5,
      comment: "Cornells has transformed our skincare section. The global brand recognition and cruelty-free promise really resonate with our customers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50/30 to-green-50/20">
      {/* Hero Section - Inspired by Cornells official hero */}
      <div className={`relative min-h-screen bg-gradient-to-br from-rose-900 via-purple-800 to-pink-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex items-center min-h-screen">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <FaGlobe className="w-5 h-5 text-rose-300" />
                  <span className="text-rose-100 font-medium">Global Beauty. Local Excellence.</span>
                </div>
                
                <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                  Cornells
                  <span className="block text-4xl font-light text-rose-200 mt-2">Wellness</span>
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mb-8 mx-auto lg:mx-0"></div>
                
                <p className="text-2xl text-rose-100 leading-relaxed mb-8 max-w-2xl">
                  Experience the beauty of wellness with our globally trusted, 
                  <span className="font-semibold text-white"> cruelty-free products</span> now exclusively 
                  available in Kenya through Rekker.
                </p>
              </div>

              {/* Global Stats Preview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {globalStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-rose-200 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="#collections"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-rose-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <FaEye className="w-5 h-5" />
                  <span>Explore Collections</span>
                </Link>
                <Link
                  to="/wholesale-request"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span>Wholesale Order</span>
                </Link>
              </div>
            </div>

            {/* Product Showcase */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-full flex items-center justify-center p-6">
                      <div className="text-center">
                        <FaGem className="w-16 h-16 text-rose-600 mx-auto mb-4" />
                        <h3 className="font-bold text-gray-800 text-lg">Bold & Beautiful</h3>
                        <p className="text-gray-600 text-sm">Body Care</p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-full flex items-center justify-center p-6">
                      <div className="text-center">
                        <FaLeaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="font-bold text-gray-800 text-lg">Super Food</h3>
                        <p className="text-gray-600 text-sm">Wellness</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-full flex items-center justify-center p-6">
                      <div className="text-center">
                        <FaSun className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-bold text-gray-800 text-lg">Cute & Pretty</h3>
                        <p className="text-gray-600 text-sm">Family Care</p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-full flex items-center justify-center p-6">
                      <div className="text-center">
                        <FaHeart className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                        <h3 className="font-bold text-gray-800 text-lg">Dark & Beautiful</h3>
                        <p className="text-gray-600 text-sm">Hair Care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="text-center">
            <div className="w-px h-16 bg-white/30 mx-auto mb-2"></div>
            <p className="text-sm font-medium">Discover More</p>
          </div>
        </div>
      </div>

      {/* Global Impact Section */}
      <section className="py-20 bg-white" id="global-impact">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Global Beauty, Local Excellence</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                With a presence in 90+ countries, we spread beauty and innovation worldwide, fostering connections and making a positive impact across diverse markets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {globalStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </div>
              ))}
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-rose-50/30 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-rose-50/30" id="best-sellers">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Best Sellers</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most loved products trusted by millions worldwide, now available for wholesale in Kenya
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-rose-100/30 overflow-hidden">
                    <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.discount}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <div className="flex items-center space-x-1">
                        <FaStar className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                      </div>
                    </div>
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center text-gray-500">
                        <FaGem className="w-20 h-20 mx-auto mb-4" />
                        <p className="font-medium text-sm">{product.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-xs font-medium text-rose-600 mb-2">{product.collection}</div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                        <FaStar className="w-3 h-3 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-rose-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Wholesale Price</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-rose-600">{product.price}</div>
                          <div className="text-xs text-gray-500 line-through">{product.originalPrice}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Min. Order</span>
                        <span className="font-semibold text-gray-900">{product.moq}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link
                        to="/wholesale-request"
                        className="flex-1 bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Order
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-center hover:border-rose-400 hover:text-rose-600 transition-all duration-300"
                      >
                        Quote
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Collections Section */}
      <section className="py-20 bg-white" id="collections">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Product Collections</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four distinct collections designed to meet every wellness and beauty need
              </p>
            </div>

            {/* Collection Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {productCollections.map((collection, index) => (
                <button
                  key={collection.id}
                  onClick={() => setActiveCollection(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCollection === index
                      ? `bg-gradient-to-r ${collection.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>

            {/* Active Collection Details */}
            <div className={`${productCollections[activeCollection].bgColor} rounded-3xl p-8 lg:p-12`}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">
                      {productCollections[activeCollection].name}
                    </h3>
                    <p className="text-xl font-medium text-gray-700 mb-4">
                      {productCollections[activeCollection].tagline}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {productCollections[activeCollection].description}
                    </p>
                  </div>

                  {/* Collection Products */}
                  <div className="space-y-6">
                    {productCollections[activeCollection].products.map((product, index) => (
                      <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            <div className="text-sm text-gray-500">Size: {product.size}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-rose-600 mb-1">{product.wholesalePrice}</div>
                            <div className="text-xs text-gray-500">MOQ: {product.moq}</div>
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-2">
                          {product.keyBenefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <FaCheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      to="/wholesale-request"
                      className={`inline-flex items-center space-x-2 bg-gradient-to-r ${productCollections[activeCollection].color} text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      <span>Order Collection</span>
                      <FaArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-rose-400 hover:text-rose-600 transition-all duration-300"
                    >
                      <span>Get Quote</span>
                    </Link>
                  </div>
                </div>

                {/* Collection Visual */}
                <div className="relative">
                  <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-full flex items-center justify-center p-12">
                      <div className="text-center">
                        <div className={`w-32 h-32 bg-gradient-to-r ${productCollections[activeCollection].color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                          <FaGem className="w-16 h-16 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                          {productCollections[activeCollection].name}
                        </h4>
                        <p className="text-gray-600">{productCollections[activeCollection].tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Retail Partner Success Stories</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beauty retailers across Kenya trust Cornells for premium quality and exceptional customer satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-rose-600 font-medium">{testimonial.business}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Partnership Section */}
      <section className="py-20 bg-gradient-to-r from-rose-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
                <FaMedal className="w-6 h-6 text-rose-600" />
                <span className="text-gray-800 font-bold text-lg">Exclusive Partnership</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Kenya's Official Cornells Distributor
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                Rekker is proud to be the sole authorized distributor of Cornells wellness products in Kenya. 
                Every authentic Cornells product in the country comes through our exclusive partnership.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-sm text-gray-600 mb-2">Global Manufacturer</div>
                  <div className="text-3xl font-bold text-rose-600 mb-4">CORNELLS WELLNESS</div>
                  <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
                  <div className="text-sm text-gray-600 mb-2">Exclusive Kenya Distributor</div>
                  <div className="text-2xl font-bold text-gray-900">REKKER LIMITED</div>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <FaCheckCircle className="w-5 h-5" />
                    <span className="font-medium">100% Authentic Products</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <FaCheckCircle className="w-5 h-5" />
                    <span className="font-medium">Direct from Manufacturer</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <FaCheckCircle className="w-5 h-5" />
                    <span className="font-medium">Full Product Range Available</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <FaCheckCircle className="w-5 h-5" />
                    <span className="font-medium">Competitive Wholesale Pricing</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Partner with Us?</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span>Guaranteed authentic Cornells products with full manufacturer warranty</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span>Competitive wholesale pricing with flexible MOQs for different business sizes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span>Full marketing support and product training for your team</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span>Reliable supply chain with nationwide delivery coverage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Global Quality, Local Service</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Experience the best of both worlds - internationally acclaimed Cornells quality 
                    backed by Rekker's local expertise and customer service excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your Beauty Business?
              </h2>
              <p className="text-2xl text-rose-100 leading-relaxed">
                Join Kenya's most successful beauty retailers who trust Cornells for premium quality, 
                global recognition, and exceptional profit margins.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaGlobe className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Global Brand Recognition</h3>
                <p className="text-rose-200 text-sm">Trusted in 90+ countries with 30M+ happy customers worldwide</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaHeart className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Ethical & Cruelty-Free</h3>
                <p className="text-purple-200 text-sm">100% cruelty-free products that resonate with conscious consumers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaArrowRight className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Exclusive Access</h3>
                <p className="text-pink-200 text-sm">Be the only authentic Cornells retailer in your area</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/wholesale-request"
                className="inline-flex items-center justify-center space-x-3 bg-white text-rose-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <FaShoppingCart className="w-6 h-6" />
                <span>Start Wholesale Order</span>
                <FaArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-3 border-3 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-rose-600 transition-all duration-300"
              >
                <span>Contact Sales Team</span>
              </Link>
            </div>

            <div className="mt-8 text-rose-200">
              <p className="text-sm">
                *Minimum order quantities apply. Special pricing available for established retailers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CornellsBrand;