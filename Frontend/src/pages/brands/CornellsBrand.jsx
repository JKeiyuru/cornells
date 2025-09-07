// pages/CornellsBrand.jsx
import { useState, useEffect } from "react";
import { 
  FaSun, 
  FaSpa, 
  FaGem, 
  FaLeaf,
  FaFlask,
  FaMedal,
  FaHeart,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaGlobe
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CornellsBrand = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const products = [
    {
      id: 1,
      name: "Cornells Moisturizing Lotion",
      category: "Body Care",
      description: "Luxurious moisturizing lotion enriched with natural extracts and vitamins. Provides long-lasting hydration for soft, smooth skin.",
      keyFeatures: [
        "24-Hour Hydration",
        "Natural Extracts",
        "Non-Greasy Formula",
        "All Skin Types"
      ],
      sizes: ["200ml", "400ml", "500ml", "1L"],
      wholesalePrice: "From KSh 180/unit",
      moq: "36 units",
      image: "/cornells-lotion.jpg"
    },
    {
      id: 2,
      name: "Cornells Sunscreen SPF 50+",
      category: "Sun Protection",
      description: "Broad-spectrum sunscreen offering maximum protection against UVA and UVB rays. Water-resistant formula perfect for outdoor activities.",
      keyFeatures: [
        "SPF 50+ Protection",
        "Water Resistant",
        "Broad Spectrum",
        "Non-Comedogenic"
      ],
      sizes: ["50ml", "100ml", "200ml"],
      wholesalePrice: "From KSh 250/unit",
      moq: "24 units",
      image: "/cornells-sunscreen.jpg"
    },
    {
      id: 3,
      name: "Cornells Facial Toner",
      category: "Facial Care",
      description: "Refreshing facial toner that helps balance skin pH and minimize pores. Infused with botanical extracts for healthy, glowing skin.",
      keyFeatures: [
        "pH Balancing",
        "Pore Minimizing",
        "Botanical Extracts",
        "Alcohol-Free"
      ],
      sizes: ["100ml", "200ml", "300ml"],
      wholesalePrice: "From KSh 220/unit",
      moq: "30 units",
      image: "/cornells-toner.jpg"
    },
    {
      id: 4,
      name: "Cornells Anti-Aging Serum",
      category: "Anti-Aging",
      description: "Advanced anti-aging serum with powerful peptides and antioxidants. Reduces fine lines and improves skin texture and firmness.",
      keyFeatures: [
        "Peptide Complex",
        "Antioxidant Rich",
        "Fine Line Reduction",
        "Skin Firming"
      ],
      sizes: ["30ml", "50ml", "100ml"],
      wholesalePrice: "From KSh 350/unit",
      moq: "18 units",
      image: "/cornells-serum.jpg"
    },
    {
      id: 5,
      name: "Cornells Vitamin C Face Cream",
      category: "Facial Care",
      description: "Brightening face cream infused with Vitamin C and natural brightening agents. Helps even skin tone and provides radiant complexion.",
      keyFeatures: [
        "Vitamin C Enriched",
        "Skin Brightening",
        "Even Skin Tone",
        "Radiance Boost"
      ],
      sizes: ["50ml", "100ml", "200ml"],
      wholesalePrice: "From KSh 280/unit",
      moq: "24 units",
      image: "/cornells-vitamin-c.jpg"
    },
    {
      id: 6,
      name: "Cornells Body Scrub",
      category: "Body Care",
      description: "Exfoliating body scrub with natural ingredients that gently removes dead skin cells, revealing smoother, softer skin.",
      keyFeatures: [
        "Natural Exfoliation",
        "Dead Skin Removal",
        "Skin Softening",
        "Pleasant Fragrance"
      ],
      sizes: ["200ml", "400ml", "500ml"],
      wholesalePrice: "From KSh 200/unit",
      moq: "30 units",
      image: "/cornells-scrub.jpg"
    }
  ];

  const brandValues = [
    {
      icon: <FaGem className="w-8 h-8" />,
      title: "Premium Quality",
      description: "International standards with carefully selected ingredients for superior skincare results."
    },
    {
      icon: <FaFlask className="w-8 h-8" />,
      title: "Scientific Innovation",
      description: "Advanced formulations backed by dermatological research and clinical testing."
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Natural Ingredients",
      description: "Enriched with botanical extracts and natural compounds for gentle, effective care."
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Skin Love",
      description: "Products designed with deep understanding of diverse skin needs and concerns."
    }
  ];

  const achievements = [
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "International Brand",
      description: "Manufactured by Sterling Parfums"
    },
    {
      icon: <FaMedal className="w-6 h-6" />,
      title: "Dermatologist Tested",
      description: "Clinically Proven Results"
    },
    {
      icon: <FaSpa className="w-6 h-6" />,
      title: "Spa Quality",
      description: "Professional Grade Formulations"
    },
    {
      icon: <FaSun className="w-6 h-6" />,
      title: "All Weather Protection",
      description: "Suitable for Kenyan Climate"
    }
  ];

  const testimonials = [
    {
      name: "Mary Wanjiru",
      business: "Beauty Palace, Westlands",
      rating: 5,
      comment: "Cornells products are premium quality at competitive prices. My customers love the results and keep coming back."
    },
    {
      name: "David Ochieng",
      business: "Ochieng Pharmacy, Kisumu",
      rating: 5,
      comment: "The sunscreen range is particularly popular. Great margins and consistent demand from our customers."
    },
    {
      name: "Rose Muthoni",
      business: "Rose Beauty Store, Nakuru",
      rating: 5,
      comment: "Cornells has elevated our skincare section. The quality matches international brands at better prices."
    }
  ];

  const skinTypes = [
    {
      type: "Oily Skin",
      products: ["Facial Toner", "Oil-Free Moisturizer", "Sunscreen SPF 50+"],
      description: "Oil-control and pore-minimizing formulations"
    },
    {
      type: "Dry Skin", 
      products: ["Moisturizing Lotion", "Hydrating Serum", "Rich Face Cream"],
      description: "Deep hydration and barrier repair solutions"
    },
    {
      type: "Sensitive Skin",
      products: ["Gentle Toner", "Soothing Lotion", "Hypoallergenic Cream"],
      description: "Gentle, fragrance-free formulations for reactive skin"
    },
    {
      type: "Combination Skin",
      products: ["Balancing Toner", "Lightweight Moisturizer", "Targeted Serums"],
      description: "Balanced care for mixed skin concerns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-indigo-50/20">
      {/* Hero Section */}
      <div className={`relative py-20 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaGem className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">Cornells</h1>
                  <p className="text-purple-100">Distributed by Rekker • Made by Sterling Parfums</p>
                </div>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mb-8 mx-auto lg:mx-0"></div>
              <p className="text-xl text-purple-100 leading-relaxed mb-8">
                International premium skincare and beauty products crafted with advanced formulations 
                and natural ingredients for the discerning Kenyan consumer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/wholesale-request"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Order Wholesale</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Brand Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">20+</div>
                <div className="text-purple-100">Premium Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-purple-100">Dermatologist Tested</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">300+</div>
                <div className="text-purple-100">Beauty Retailers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">#1</div>
                <div className="text-purple-100">Exclusive Distributor</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className={`container mx-auto px-6 py-20 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Cornells Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              International skincare excellence, exclusively available in Kenya through Rekker
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Premium Product Collection</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced skincare solutions for every skin type and concern
              </p>
            </div>

            {/* Product Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeProduct === index
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>

            {/* Active Product Details */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                    {products[activeProduct].category}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {products[activeProduct].name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {products[activeProduct].description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {products[activeProduct].keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wholesale Information */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Wholesale Information</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Wholesale Price</div>
                      <div className="text-lg font-bold text-purple-600">
                        {products[activeProduct].wholesalePrice}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Minimum Order</div>
                      <div className="text-lg font-bold text-gray-900">
                        {products[activeProduct].moq}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Available Sizes</div>
                    <div className="flex flex-wrap gap-2">
                      {products[activeProduct].sizes.map((size, index) => (
                        <span key={index} className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-purple-200">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link
                    to="/wholesale-request"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Order Now</span>
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
                  >
                    <span>Get Quote</span>
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FaGem className="w-24 h-24 mx-auto mb-4 text-purple-400" />
                      <p className="text-lg font-medium">{products[activeProduct].name}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Distributed by</div>
                    <div className="text-lg font-bold text-purple-600">REKKER</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skin Type Guide */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Perfect for Every Skin Type</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive range addresses all skin types and concerns with scientifically proven formulations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skinTypes.map((skinType, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{skinType.type}</h3>
                  <p className="text-gray-600 text-sm mb-4">{skinType.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-purple-600 mb-2">Recommended Products:</div>
                    {skinType.products.map((product, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Premium Standards</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                International quality backed by professional certifications and clinical testing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-purple-50 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Beauty Retailer Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from beauty retailers who have transformed their business with Cornells premium products
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.business}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Distribution Notice */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FaGlobe className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">Exclusive Distribution Partnership</h2>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Rekker is the sole authorized distributor of Cornells products in Kenya. 
              All authentic Cornells products are exclusively available through our distribution network.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg inline-block">
              <div className="text-sm text-gray-600 mb-2">Manufactured by</div>
              <div className="text-2xl font-bold text-purple-600 mb-2">STERLING PARFUMS</div>
              <div className="text-sm text-gray-600">Exclusively Distributed in Kenya by</div>
              <div className="text-xl font-bold text-gray-900">REKKER LIMITED</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Elevate Your Beauty Retail Business
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Partner with Kenya's exclusive distributor of Cornells premium skincare products. 
              Offer your customers international quality with attractive wholesale margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wholesale-request"
                className="inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Wholesale Order</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                <span>Contact Sales Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CornellsBrand;