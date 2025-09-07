// pages/SaffronBrand.jsx
import { useState, useEffect } from "react";
import { 
  FaLeaf, 
  FaShieldAlt, 
  FaAward, 
  FaRecycle,
  FaFlask,
  FaMedal,
  FaHeart,
  FaArrowRight,
  FaCheckCircle,
  FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SaffronBrand = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const products = [
    {
      id: 1,
      name: "Saffron Premium Handwash",
      category: "Personal Care",
      description: "Antibacterial handwash with natural moisturizing agents and fresh fragrance. Gentle on hands while providing superior cleaning.",
      keyFeatures: [
        "99.9% Germ Protection",
        "Natural Moisturizers",
        "Pleasant Fragrance",
        "pH Balanced Formula"
      ],
      sizes: ["250ml", "500ml", "1L", "5L"],
      wholesalePrice: "From KSh 85/unit",
      moq: "50 units",
      image: "/saffron-handwash.jpg"
    },
    {
      id: 2,
      name: "Saffron Dishwashing Liquid",
      category: "Kitchen Care",
      description: "Concentrated dishwashing liquid that cuts through grease effectively while being gentle on hands. Long-lasting formula for excellent value.",
      keyFeatures: [
        "Superior Grease Cutting",
        "Gentle on Hands",
        "Concentrated Formula",
        "Fresh Lemon Scent"
      ],
      sizes: ["500ml", "1L", "2L", "5L"],
      wholesalePrice: "From KSh 120/unit",
      moq: "40 units",
      image: "/saffron-dish-liquid.jpg"
    },
    {
      id: 3,
      name: "Saffron Liquid Detergent",
      category: "Laundry Care",
      description: "High-performance liquid detergent suitable for all fabric types. Removes tough stains while protecting fabric colors and texture.",
      keyFeatures: [
        "Deep Stain Removal",
        "Color Protection",
        "Fabric Softening",
        "All Fabric Types"
      ],
      sizes: ["1L", "2L", "5L", "20L"],
      wholesalePrice: "From KSh 180/unit",
      moq: "30 units",
      image: "/saffron-detergent.jpg"
    },
    {
      id: 4,
      name: "Saffron Shower Gel",
      category: "Personal Care",
      description: "Luxurious shower gel with moisturizing properties and invigorating fragrance. Leaves skin feeling soft, smooth, and refreshed.",
      keyFeatures: [
        "Deep Moisturizing",
        "Rich Lather",
        "Invigorating Scent",
        "Dermatologist Tested"
      ],
      sizes: ["250ml", "500ml", "1L"],
      wholesalePrice: "From KSh 150/unit",
      moq: "36 units",
      image: "/saffron-shower-gel.jpg"
    },
    {
      id: 5,
      name: "Saffron Anti-Bump After-Shave",
      category: "Men's Care",
      description: "Specially formulated after-shave lotion for men that prevents razor bumps and soothes skin. Provides long-lasting freshness.",
      keyFeatures: [
        "Prevents Razor Bumps",
        "Soothes Irritation",
        "Long-lasting Freshness",
        "Quick Absorption"
      ],
      sizes: ["100ml", "200ml", "500ml"],
      wholesalePrice: "From KSh 200/unit",
      moq: "24 units",
      image: "/saffron-aftershave.jpg"
    }
  ];

  const brandValues = [
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Natural Ingredients",
      description: "We use carefully selected natural ingredients that are gentle on skin and environmentally friendly."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing to ensure consistent quality and effectiveness."
    },
    {
      icon: <FaRecycle className="w-8 h-8" />,
      title: "Eco-Conscious",
      description: "Committed to sustainable manufacturing practices and environmentally responsible packaging."
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Family Safe",
      description: "All our products are formulated to be safe for the entire family with gentle, non-toxic formulations."
    }
  ];

  const certifications = [
    {
      icon: <FaAward className="w-6 h-6" />,
      title: "ISO 9001:2015",
      description: "Quality Management System"
    },
    {
      icon: <FaFlask className="w-6 h-6" />,
      title: "KEBS Certified",
      description: "Kenya Bureau of Standards"
    },
    {
      icon: <FaMedal className="w-6 h-6" />,
      title: "Halal Certified",
      description: "Islamic Certification"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Dermatologically Tested",
      description: "Skin Safety Approved"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Kimani",
      business: "Kimani Supermarket, Nakuru",
      rating: 5,
      comment: "Saffron products have been bestsellers in our store. Customers love the quality and keep coming back for more."
    },
    {
      name: "John Mwangi",
      business: "Mwangi Distributors, Eldoret",
      rating: 5,
      comment: "As a distributor, I appreciate Saffron's consistent quality and competitive pricing. Great profit margins too!"
    },
    {
      name: "Grace Wanjiku",
      business: "Grace Mini Market, Thika",
      rating: 5,
      comment: "The anti-bump after-shave is particularly popular with our male customers. Quality product at affordable prices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50/30 to-red-50/20">
      {/* Hero Section */}
      <div className={`relative py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaLeaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">Saffron</h1>
                  <p className="text-orange-100">Manufactured by Rekker</p>
                </div>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mb-8 mx-auto lg:mx-0"></div>
              <p className="text-xl text-orange-100 leading-relaxed mb-8">
                Premium household and personal care products crafted with natural ingredients 
                and advanced formulations for the modern Kenyan family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/wholesale-request"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Order Wholesale</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Brand Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-orange-100">Years Manufacturing</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-orange-100">Product Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-orange-100">Retail Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">47</div>
                <div className="text-orange-100">Counties Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className={`container mx-auto px-6 py-20 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Saffron?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on a foundation of quality, sustainability, and care for every family
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-300">
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Product Range</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete household and personal care solutions manufactured with precision and care
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
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
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
                  <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
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
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
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
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Wholesale Information</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Wholesale Price</div>
                      <div className="text-lg font-bold text-orange-600">
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
                        <span key={index} className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-orange-200">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link
                    to="/wholesale-request"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Order Now</span>
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-orange-400 hover:text-orange-600 transition-all duration-300"
                  >
                    <span>Get Quote</span>
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FaLeaf className="w-24 h-24 mx-auto mb-4 text-orange-400" />
                      <p className="text-lg font-medium">{products[activeProduct].name}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Manufactured by</div>
                    <div className="text-lg font-bold text-orange-600">REKKER</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Quality Certifications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to quality is backed by international certifications and standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                    {cert.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Partners Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our retail and distribution partners across Kenya
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Partner with Saffron Today
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join hundreds of successful retailers and distributors who trust Saffron for quality products and profitable partnerships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wholesale-request"
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Wholesale Order</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
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

export default SaffronBrand;