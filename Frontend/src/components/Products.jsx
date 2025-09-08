/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// components/Products.jsx - Updated with correct Cornells product range
import { useState, useEffect } from "react";
import { 
  FaShoppingCart, 
  FaEye, 
  FaIndustry, 
  FaStore,
  FaTag,
  FaBoxes,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaHeart,
  FaGem,
  FaLeaf
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = ({ query, filters, sort, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Updated product data matching official Cornells website and Rekker's actual range
  const mockProducts = [
    // Stationery - Rekker Products
    {
      id: 1,
      title: "Premium Ball Point Pens",
      category: "stationery",
      brand: "Rekker",
      subcategory: "Writing Instruments",
      description: "High-quality ball point pens with smooth ink flow. Available in blue, black, and red.",
      wholesalePrice: 12,
      moq: 100,
      unit: "piece",
      available: true,
      image: "/products/ballpoint-pens.jpg"
    },
    {
      id: 2,
      title: "A4 Photocopy Paper",
      category: "stationery", 
      brand: "Rekker",
      subcategory: "Paper Products",
      description: "High-grade A4 photocopy paper, 80gsm. Suitable for all printers and copiers.",
      wholesalePrice: 450,
      moq: 10,
      unit: "ream",
      available: true,
      image: "/products/a4-paper.jpg"
    },
    {
      id: 3,
      title: "Mathematical Instruments Set",
      category: "stationery",
      brand: "Rekker", 
      subcategory: "Educational Tools",
      description: "Complete math set with compass, protractor, rulers, and pencils in protective case.",
      wholesalePrice: 180,
      moq: 50,
      unit: "set",
      available: true,
      image: "/products/math-set.jpg"
    },
    {
      id: 4,
      title: "Plastic Rulers Set",
      category: "stationery",
      brand: "Rekker",
      subcategory: "Measuring Tools",
      description: "Durable plastic rulers in various sizes - 15cm, 30cm, and 50cm.",
      wholesalePrice: 25,
      moq: 200,
      unit: "piece",
      available: true,
      image: "/products/rulers.jpg"
    },
    {
      id: 5,
      title: "Pencils & Erasers Bundle",
      category: "stationery",
      brand: "Rekker",
      subcategory: "Writing Supplies",
      description: "HB pencils with quality erasers. Perfect for schools and offices.",
      wholesalePrice: 8,
      moq: 500,
      unit: "piece",
      available: true,
      image: "/products/pencils-erasers.jpg"
    },

    // School Bags & Suitcases - Rekker Products
    {
      id: 6,
      title: "Student Backpack - Large",
      category: "bags",
      brand: "Rekker",
      subcategory: "School Bags", 
      description: "Durable polyester backpack with multiple compartments. Perfect for students.",
      wholesalePrice: 850,
      moq: 25,
      unit: "piece",
      available: true,
      image: "/products/student-backpack.jpg"
    },
    {
      id: 7,
      title: "Travel Suitcase Set",
      category: "bags",
      brand: "Rekker",
      subcategory: "Suitcases",
      description: "3-piece hardshell suitcase set with wheels and telescopic handles.",
      wholesalePrice: 3200,
      moq: 10,
      unit: "set", 
      available: true,
      image: "/products/suitcase-set.jpg"
    },

    // Toys - Rekker Products
    {
      id: 8,
      title: "Educational Building Blocks",
      category: "toys",
      brand: "Rekker",
      subcategory: "Educational Toys",
      description: "Colorful building blocks set for creative play and learning. 100 pieces.",
      wholesalePrice: 320,
      moq: 30,
      unit: "set",
      available: true,
      image: "/products/building-blocks.jpg"
    },
    {
      id: 9,
      title: "Remote Control Car",
      category: "toys",
      brand: "Rekker", 
      subcategory: "Electronic Toys",
      description: "High-speed remote control car with rechargeable battery and LED lights.",
      wholesalePrice: 1200,
      moq: 20,
      unit: "piece",
      available: true,
      image: "/products/rc-car.jpg"
    },

    // Kitchenware - Rekker Products
    {
      id: 10,
      title: "Non-Stick Cooking Set",
      category: "kitchenware",
      brand: "Rekker",
      subcategory: "Cookware",
      description: "5-piece non-stick cooking pot set with glass lids and heat-resistant handles.",
      wholesalePrice: 2400,
      moq: 15,
      unit: "set",
      available: true,
      image: "/products/cooking-set.jpg"
    },

    // Padlocks - Rekker Products
    {
      id: 11,
      title: "Heavy Duty Padlocks",
      category: "padlocks",
      brand: "Rekker",
      subcategory: "Security",
      description: "Durable brass padlocks with hardened steel shackle. Various sizes available.",
      wholesalePrice: 180,
      moq: 50,
      unit: "piece",
      available: true,
      image: "/products/padlocks.jpg"
    },

    // Teddy Bears & Stuffed Toys - Rekker Products
    {
      id: 12,
      title: "Premium Teddy Bear - Large",
      category: "stuffed-toys",
      brand: "Rekker",
      subcategory: "Stuffed Toys",
      description: "High-quality plush teddy bear, 60cm height. Soft and cuddly.",
      wholesalePrice: 680,
      moq: 20,
      unit: "piece",
      available: true,
      image: "/products/teddy-bear-large.jpg"
    },

    // Party Items - Rekker Products
    {
      id: 13,
      title: "Birthday Party Pack",
      category: "party-items",
      brand: "Rekker",
      subcategory: "Party Supplies",
      description: "Complete birthday party pack with plates, cups, napkins, and decorations.",
      wholesalePrice: 450,
      moq: 30,
      unit: "pack",
      available: true,
      image: "/products/party-pack.jpg"
    },
    {
      id: 14,
      title: "Foil Balloons Assorted",
      category: "party-items", 
      brand: "Rekker",
      subcategory: "Balloons",
      description: "Assorted foil balloons in various shapes and colors. Pack of 20.",
      wholesalePrice: 180,
      moq: 50,
      unit: "pack",
      available: true,
      image: "/products/foil-balloons.jpg"
    },
    {
      id: 15,
      title: "Paper Plates & Cups Set",
      category: "party-items",
      brand: "Rekker",
      subcategory: "Disposables",
      description: "Quality paper plates, cups, and napkins for parties and events.",
      wholesalePrice: 120,
      moq: 100,
      unit: "pack",
      available: true,
      image: "/products/paper-plates-cups.jpg"
    },

    // Educational Items - Rekker Products
    {
      id: 16,
      title: "Art Supplies Kit",
      category: "educational",
      brand: "Rekker",
      subcategory: "Art Materials",
      description: "Complete art kit with paintbrushes, canvas, modeling clay, and paints.",
      wholesalePrice: 380,
      moq: 25,
      unit: "kit",
      available: true,
      image: "/products/art-kit.jpg"
    },

    // Saffron Products - Manufactured by Rekker
    {
      id: 17,
      title: "Saffron Premium Handwash",
      category: "personal-care",
      brand: "Saffron",
      subcategory: "Hand Care",
      description: "Antibacterial handwash with natural moisturizing agents. Manufactured by Rekker.",
      wholesalePrice: 85,
      moq: 50,
      unit: "bottle",
      available: true,
      image: "/products/saffron-handwash.jpg"
    },
    {
      id: 18,
      title: "Saffron Dishwashing Liquid",
      category: "kitchen-care",
      brand: "Saffron",
      subcategory: "Cleaning Products", 
      description: "Concentrated dishwashing liquid with grease-cutting formula. Manufactured by Rekker.",
      wholesalePrice: 120,
      moq: 40,
      unit: "bottle",
      available: true,
      image: "/products/saffron-dish-liquid.jpg"
    },
    {
      id: 19,
      title: "Saffron Shower Gel",
      category: "personal-care",
      brand: "Saffron",
      subcategory: "Body Care",
      description: "Moisturizing shower gel with fresh fragrance. Manufactured by Rekker.",
      wholesalePrice: 95,
      moq: 48,
      unit: "bottle",
      available: true,
      image: "/products/saffron-shower-gel.jpg"
    },
    {
      id: 20,
      title: "Saffron After-Shave Anti-Bump",
      category: "personal-care",
      brand: "Saffron",
      subcategory: "Men's Care",
      description: "Anti-bump after-shave for men. Soothes and protects skin. Manufactured by Rekker.",
      wholesalePrice: 110,
      moq: 36,
      unit: "bottle",
      available: true,
      image: "/products/saffron-aftershave.jpg"
    },
    {
      id: 21,
      title: "Saffron Liquid Detergent",
      category: "laundry-care",
      brand: "Saffron",
      subcategory: "Laundry",
      description: "High-efficiency liquid detergent for all fabric types. Manufactured by Rekker.",
      wholesalePrice: 140,
      moq: 30,
      unit: "bottle",
      available: true,
      image: "/products/saffron-detergent.jpg"
    },

    // Cornells Products - Distributed by Rekker, matching official website collections
    {
      id: 22,
      title: "Cornells Bold & Beautiful Vanilla Lotion",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Body Lotions",
      description: "Ultra-rich vanilla scented body lotion with Shea Butter. Part of Bold & Beautiful collection.",
      wholesalePrice: 280,
      moq: 24,
      unit: "bottle",
      available: true,
      image: "/products/cornells-bold-beautiful-vanilla.jpg"
    },
    {
      id: 23,
      title: "Cornells Bold & Beautiful Cocoa Butter Lotion",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Body Lotions",
      description: "Intensive moisture with natural cocoa butter for silky skin. Bold & Beautiful collection.",
      wholesalePrice: 285,
      moq: 24,
      unit: "bottle",
      available: true,
      image: "/products/cornells-cocoa-butter.jpg"
    },
    {
      id: 24,
      title: "Cornells Cute & Pretty Baby Lotion",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Baby Care",
      description: "Gentle moisturizing lotion for baby's sensitive skin. Cute & Pretty collection.",
      wholesalePrice: 180,
      moq: 36,
      unit: "bottle",
      available: true,
      image: "/products/cornells-baby-lotion.jpg"
    },
    {
      id: 25,
      title: "Cornells Cute & Pretty Kids Sunscreen SPF 50+",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Sun Protection",
      description: "Maximum protection sunscreen specifically formulated for children. Cute & Pretty collection.",
      wholesalePrice: 320,
      moq: 24,
      unit: "bottle",
      available: true,
      image: "/products/cornells-kids-sunscreen.jpg"
    },
    {
      id: 26,
      title: "Cornells Dark & Beautiful Hair Oil",
      category: "hair-care",
      brand: "Cornells",
      subcategory: "Hair Treatments",
      description: "Nourishing hair oil blend for strength and shine. Dark & Beautiful collection.",
      wholesalePrice: 240,
      moq: 30,
      unit: "bottle",
      available: true,
      image: "/products/cornells-hair-oil.jpg"
    },
    {
      id: 27,
      title: "Cornells Dark & Beautiful Shampoo",
      category: "hair-care",
      brand: "Cornells",
      subcategory: "Hair Cleansing",
      description: "Gentle cleansing shampoo for healthy, beautiful hair. Dark & Beautiful collection.",
      wholesalePrice: 260,
      moq: 24,
      unit: "bottle",
      available: true,
      image: "/products/cornells-shampoo.jpg"
    },
    {
      id: 28,
      title: "Cornells Super Food Vitamin C Serum",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Facial Serums",
      description: "Antioxidant-rich facial serum with natural vitamin C. Super Food collection.",
      wholesalePrice: 450,
      moq: 18,
      unit: "bottle",
      available: true,
      image: "/products/cornells-vitamin-c-serum.jpg"
    },
    {
      id: 29,
      title: "Cornells Super Food Body Scrub",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Body Exfoliation",
      description: "Exfoliating scrub with superfood extracts and natural oils. Super Food collection.",
      wholesalePrice: 320,
      moq: 24,
      unit: "jar",
      available: true,
      image: "/products/cornells-body-scrub.jpg"
    },
    {
      id: 30,
      title: "Cornells Bold & Beautiful Rose Hip Oil",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Facial Oils",
      description: "Premium rose hip oil for anti-aging and skin regeneration. Bold & Beautiful collection.",
      wholesalePrice: 380,
      moq: 20,
      unit: "bottle",
      available: true,
      image: "/products/cornells-rosehip-oil.jpg"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = [...mockProducts];

      // Apply category filter based on query
      if (query) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === query
        );
      }

      // Apply other filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'default') {
          filteredProducts = filteredProducts.filter(product => 
            product[key]?.toLowerCase() === value.toLowerCase()
          );
        }
      });

      // Apply search
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply sorting
      switch (sort) {
        case 'asc':
          filteredProducts.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
          break;
        case 'desc':
          filteredProducts.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
          break;
        case 'popular':
          filteredProducts.sort((a, b) => b.id - a.id); // Mock popularity
          break;
        default:
          // newest first
          filteredProducts.sort((a, b) => b.id - a.id);
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 800);
  }, [query, filters, sort, searchTerm]);

  const getBrandColor = (brand) => {
    switch (brand) {
      case 'Saffron': return 'text-orange-600 bg-orange-100';
      case 'Cornells': return 'text-rose-600 bg-rose-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getBrandIcon = (brand) => {
    switch (brand) {
      case 'Saffron': return <FaLeaf className="w-4 h-4" />;
      case 'Cornells': return <FaGem className="w-4 h-4" />;
      default: return <FaBoxes className="w-4 h-4" />;
    }
  };

  const getProductRating = (brand) => {
    // Mock ratings based on brand
    switch (brand) {
      case 'Cornells': return (Math.random() * 0.5 + 4.5).toFixed(1); // 4.5-5.0
      case 'Saffron': return (Math.random() * 0.7 + 4.3).toFixed(1); // 4.3-5.0
      default: return (Math.random() * 0.8 + 4.2).toFixed(1); // 4.2-5.0
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaBoxes className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-light text-gray-900 mb-4">No Products Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {products.length} Product{products.length !== 1 ? 's' : ''} Found
          </h2>
          {query && (
            <p className="text-gray-600 mt-1">
              in {query.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const rating = getProductRating(product.brand);
          const reviews = Math.floor(Math.random() * 2000 + 100); // Random review count

          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-20 h-20 mx-auto mb-3">
                      {getBrandIcon(product.brand)}
                    </div>
                    <p className="text-sm font-medium px-4">{product.title}</p>
                  </div>
                </div>
                
                {/* Brand Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getBrandColor(product.brand)}`}>
                  {getBrandIcon(product.brand)}
                  <span>{product.brand}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-700">{rating}</span>
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <FaEye className="w-5 h-5" />
                    </button>
                    <Link
                      to="/wholesale-request"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </Link>
                    {product.brand === 'Cornells' && (
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <FaHeart className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Special Badge for Cornells */}
                {product.brand === 'Cornells' && (
                  <div className="absolute bottom-4 left-4 bg-rose-600 text-white px-2 py-1 rounded text-xs font-bold">
                    GLOBAL BRAND
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{product.subcategory}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{rating}</span>
                    <span className="text-sm text-gray-400">({reviews} reviews)</span>
                  </div>
                </div>

                {/* Wholesale Info */}
                <div className={`${
                  product.brand === 'Cornells' 
                    ? 'bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-100' 
                    : product.brand === 'Saffron'
                    ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100'
                    : 'bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100'
                } rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Wholesale Price</span>
                    <span className={`text-lg font-bold ${
                      product.brand === 'Cornells' ? 'text-rose-600' :
                      product.brand === 'Saffron' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      KSh {product.wholesalePrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Min. Order</span>
                    <span className="font-medium text-gray-900">
                      {product.moq} {product.unit}s
                    </span>
                  </div>
                  
                  {/* Brand-specific info */}
                  {product.brand === 'Cornells' && (
                    <div className="mt-2 text-xs text-rose-600 font-medium">
                      ✨ Distributed Exclusively by Rekker
                    </div>
                  )}
                  {product.brand === 'Saffron' && (
                    <div className="mt-2 text-xs text-orange-600 font-medium">
                      🏭 Manufactured by Rekker
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to="/wholesale-request"
                    className={`flex-1 ${
                      product.brand === 'Cornells'
                        ? 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700'
                        : product.brand === 'Saffron'
                        ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
                        : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
                    } text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Order</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Quote</span>
                  </Link>
                </div>

                {/* Availability Status */}
                <div className={`flex items-center space-x-2 text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                  <FaCheck className="w-4 h-4" />
                  <span>{product.available ? 'In Stock' : 'Out of Stock'}</span>
                  {product.brand === 'Cornells' && product.available && (
                    <span className="text-rose-500 text-xs">• Global Quality</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-center text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Ready to Place a Wholesale Order?</h3>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
            Join hundreds of successful retailers and distributors who trust Rekker for quality products, 
            competitive wholesale prices, and authentic global brands like Cornells.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">1000+</div>
              <div className="text-blue-200 text-sm">Happy Retailers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">30+</div>
              <div className="text-purple-200 text-sm">Product Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">47</div>
              <div className="text-green-200 text-sm">Counties Served</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/wholesale-request"
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Start Wholesale Request</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <span>Contact Sales Team</span>
            </Link>
          </div>
          
          <div className="mt-6 text-blue-200 text-sm">
            <p>*Competitive pricing available for established retailers. Special rates for bulk orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;