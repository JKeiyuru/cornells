// components/Products.jsx
import { useState, useEffect } from "react";
import { 
  FaShoppingCart, 
  FaEye, 
  FaIndustry, 
  FaStore,
  FaTag,
  FaBoxes,
  FaArrowRight,
  FaCheck
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = ({ query, filters, sort, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock product data for Rekker's categories
  const mockProducts = [
    // Stationery
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
    // School Bags & Suitcases
    {
      id: 4,
      title: "Student Backpack - Large",
      category: "school-bags-suitcases",
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
      id: 5,
      title: "Travel Suitcase Set",
      category: "school-bags-suitcases",
      brand: "Rekker",
      subcategory: "Suitcases",
      description: "3-piece hardshell suitcase set with wheels and telescopic handles.",
      wholesalePrice: 3200,
      moq: 10,
      unit: "set", 
      available: true,
      image: "/products/suitcase-set.jpg"
    },
    // Toys
    {
      id: 6,
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
      id: 7,
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
    // Saffron Products
    {
      id: 8,
      title: "Saffron Premium Handwash",
      category: "personal-care",
      brand: "Saffron",
      subcategory: "Hand Care",
      description: "Antibacterial handwash with natural moisturizing agents. 500ml bottle.",
      wholesalePrice: 85,
      moq: 50,
      unit: "bottle",
      available: true,
      image: "/products/saffron-handwash.jpg"
    },
    {
      id: 9,
      title: "Saffron Dishwashing Liquid",
      category: "kitchen-care",
      brand: "Saffron",
      subcategory: "Cleaning Products", 
      description: "Concentrated dishwashing liquid with grease-cutting formula. 1L bottle.",
      wholesalePrice: 120,
      moq: 40,
      unit: "bottle",
      available: true,
      image: "/products/saffron-dish-liquid.jpg"
    },
    // Cornells Products
    {
      id: 10,
      title: "Cornells Moisturizing Lotion",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Body Care",
      description: "Premium moisturizing lotion with natural extracts. 400ml bottle.",
      wholesalePrice: 180,
      moq: 36,
      unit: "bottle",
      available: true,
      image: "/products/cornells-lotion.jpg"
    },
    {
      id: 11,
      title: "Cornells Sunscreen SPF 50+",
      category: "skincare",
      brand: "Cornells",
      subcategory: "Sun Protection",
      description: "Broad-spectrum sunscreen with maximum protection. 100ml tube.",
      wholesalePrice: 250,
      moq: 24,
      unit: "tube",
      available: true,
      image: "/products/cornells-sunscreen.jpg"
    },
    // Kitchenware
    {
      id: 12,
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
    // Party Items
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
    // Teddy Bears
    {
      id: 15,
      title: "Premium Teddy Bear - Large",
      category: "teddy-bears",
      brand: "Rekker",
      subcategory: "Stuffed Toys",
      description: "High-quality plush teddy bear, 60cm height. Soft and cuddly.",
      wholesalePrice: 680,
      moq: 20,
      unit: "piece",
      available: true,
      image: "/products/teddy-bear-large.jpg"
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
      case 'Cornells': return 'text-purple-600 bg-purple-100';
      default: return 'text-blue-600 bg-blue-100';
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
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FaBoxes className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm font-medium">{product.title}</p>
                </div>
              </div>
              
              {/* Brand Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getBrandColor(product.brand)}`}>
                {product.brand}
              </div>

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-3">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <FaEye className="w-5 h-5" />
                  </button>
                  <Link
                    to="/wholesale-request"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{product.subcategory}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Wholesale Info */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Wholesale Price</span>
                  <span className="text-lg font-bold text-blue-600">
                    KSh {product.wholesalePrice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Min. Order</span>
                  <span className="font-medium text-gray-900">
                    {product.moq} {product.unit}s
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Link
                  to="/wholesale-request"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Place a Wholesale Order?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join hundreds of successful retailers and distributors who trust Rekker for quality products and competitive wholesale prices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/wholesale-request"
            className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
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
      </div>
    </div>
  );
};

export default Products;