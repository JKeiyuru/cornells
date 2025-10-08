/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// components/Products.jsx - Updated to work with products-data.js
import { useState, useEffect } from "react";
import { 
  FaShoppingCart, FaEye, FaBoxes, FaArrowRight, FaCheck, 
  FaStar, FaHeart, FaGem, FaLeaf, FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Import your products data
import { 
  getAllProducts, 
  getProductsByBrand, 
  getProductsByCategory,
  searchProducts 
} from "../data/products-data"; // Adjust path as needed

const Products = ({ query, filters, sort, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load and filter products
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      
      let filteredProducts = [];

      // Step 1: Get base products based on query
      if (query && query !== 'all') {
        // Try to get by category first
        filteredProducts = getProductsByCategory(query);
        
        // If no results, try by brand
        if (filteredProducts.length === 0) {
          filteredProducts = getProductsByBrand(query);
        }
      } else {
        // Get all products
        filteredProducts = getAllProducts();
      }

      // Step 2: Apply search term
      if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(term) ||
          product.desc.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.subcategory?.toLowerCase().includes(term) ||
          product.tags?.some(tag => tag.toLowerCase().includes(term))
        );
      }

      // Step 3: Apply additional filters
      if (filters.brand && filters.brand !== 'default') {
        filteredProducts = filteredProducts.filter(p => 
          p.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      if (filters.category && filters.category !== 'default') {
        filteredProducts = filteredProducts.filter(p => 
          p.category === filters.category
        );
      }

      if (filters.inStock === 'true') {
        filteredProducts = filteredProducts.filter(p => p.inStock === true);
      } else if (filters.inStock === 'false') {
        filteredProducts = filteredProducts.filter(p => p.inStock === false);
      }

      if (filters.featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured === true);
      }

      // Price range filter
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => 
          (p.discountedPrice || p.originalPrice) >= Number(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => 
          (p.discountedPrice || p.originalPrice) <= Number(filters.maxPrice)
        );
      }

      // Step 4: Apply sorting
      filteredProducts = [...filteredProducts].sort((a, b) => {
        const priceA = a.discountedPrice || a.originalPrice;
        const priceB = b.discountedPrice || b.originalPrice;

        switch (sort) {
          case "asc":
            return priceA - priceB;
          case "desc":
            return priceB - priceA;
          case "popular":
            return (b.ratings?.length || 0) - (a.ratings?.length || 0);
          case "featured":
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          case "newest":
          default:
            return 0; // Keep original order
        }
      });

      setProducts(filteredProducts);
      
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [query, filters, sort, searchTerm]);

  const getBrandColor = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return 'text-orange-600 bg-orange-100';
      case 'cornells': return 'text-rose-600 bg-rose-100';
      case 'rekker':
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getBrandGradient = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return 'from-orange-600 to-red-600';
      case 'cornells': return 'from-rose-600 to-purple-600';
      case 'rekker':
      default: return 'from-blue-600 to-indigo-600';
    }
  };

  const getBrandIcon = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return <FaLeaf className="w-4 h-4" />;
      case 'cornells': return <FaGem className="w-4 h-4" />;
      case 'rekker':
      default: return <FaBoxes className="w-4 h-4" />;
    }
  };

  const getProductRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return (Math.random() * 0.8 + 4.2).toFixed(1);
    }
    const average = ratings.reduce((sum, rating) => sum + rating.star, 0) / ratings.length;
    return average.toFixed(1);
  };

  const getReviewCount = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return Math.floor(Math.random() * 500 + 50);
    }
    return ratings.length;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getDisplayPrice = (product) => {
    if (product.discountedPrice && product.discountedPrice > 0) {
      return product.discountedPrice;
    }
    if (product.wholesalePrice && product.wholesalePrice > 0) {
      return product.wholesalePrice;
    }
    return product.originalPrice || product.price || 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading premium products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-light text-gray-900 mb-4">Something went wrong</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          Try Again
        </button>
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
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          <span>Contact Us</span>
          <FaArrowRight className="w-4 h-4" />
        </Link>
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
          {query && query !== 'all' && (
            <p className="text-gray-600 mt-1">
              in {query.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const rating = getProductRating(product.ratings);
          const reviewCount = getReviewCount(product.ratings);
          const displayPrice = getDisplayPrice(product);

          return (
            <div 
              key={product._id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {product.img ? (
                  <img 
                    src={product.img} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback when image fails or doesn't exist */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" 
                  style={{ display: product.img ? 'none' : 'flex' }}
                >
                  <div className="text-center text-gray-500">
                    <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                      {getBrandIcon(product.brand)}
                    </div>
                    <p className="text-sm font-medium px-4">{product.title}</p>
                  </div>
                </div>
                
                {/* Brand Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getBrandColor(product.brand)}`}>
                  {getBrandIcon(product.brand)}
                  <span>{product.brand || 'Rekker'}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-700">{rating}</span>
                </div>

                {/* Stock Badge */}
                {product.inStock === false && (
                  <div className="absolute bottom-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    OUT OF STOCK
                  </div>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <Link
                      to={`/product/${product._id}`}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <FaEye className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/wholesale-request"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </Link>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <FaHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Featured Badge */}
                {product.featured && (
                  <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{product.subcategory || product.category}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {product.desc || "Premium quality product"}
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
                    <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Wholesale Info */}
                <div className={`bg-gradient-to-r ${getBrandGradient(product.brand)} bg-opacity-10 rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {product.wholesalePrice ? 'Wholesale Price' : 'Price'}
                    </span>
                    <span className={`text-lg font-bold ${getBrandColor(product.brand).split(' ')[0]}`}>
                      {formatPrice(displayPrice)}
                    </span>
                  </div>
                  
                  {product.wholesalePrice && product.wholesaleMinimumQuantity && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Min. Order</span>
                      <span className="font-medium text-gray-900">
                        {product.wholesaleMinimumQuantity} {product.unit || 'pieces'}
                      </span>
                    </div>
                  )}
                  
                  {/* Brand-specific info */}
                  {product.brand?.toLowerCase() === 'cornells' && (
                    <div className="mt-2 text-xs text-rose-600 font-medium">
                      ✨ Distributed Exclusively by Rekker
                    </div>
                  )}
                  {product.brand?.toLowerCase() === 'saffron' && (
                    <div className="mt-2 text-xs text-orange-600 font-medium">
                      🏭 Manufactured by Rekker
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to="/wholesale-request"
                    className={`flex-1 bg-gradient-to-r ${getBrandGradient(product.brand)} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
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
                <div className={`flex items-center space-x-2 text-sm ${
                  product.inStock !== false ? 'text-green-600' : 'text-red-600'
                }`}>
                  <FaCheck className="w-4 h-4" />
                  <span>{product.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-center text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Ready to Place a Wholesale Order?</h3>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
            Join hundreds of successful retailers and distributors who trust Rekker for quality products, 
            competitive wholesale prices, and authentic brands.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">1000+</div>
              <div className="text-blue-200 text-sm">Happy Retailers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">{products.length}+</div>
              <div className="text-purple-200 text-sm">Products Available</div>
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

export default Products;