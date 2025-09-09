/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// components/Products.jsx - Updated for dynamic product loading from admin
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
  FaLeaf,
  FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Products = ({ query, filters, sort, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const params = new URLSearchParams();
        
        // Add category filter if specified
        if (query && query !== 'all') {
          params.append('category', query);
        }
        
        // Add other filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'default') {
            params.append(key, value);
          }
        });
        
        // Add search term
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        // Add sort parameter
        if (sort) {
          params.append('sort', sort);
        }

        const response = await publicRequest.get(`/products?${params.toString()}`);
        setProducts(response.data.products || response.data || []);
        
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.response?.data?.message || "Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, filters, sort, searchTerm]);

  const getBrandColor = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return 'text-orange-600 bg-orange-100';
      case 'cornells': return 'text-rose-600 bg-rose-100';
      case 'rekker':
      default: return 'text-red-600 bg-red-100';
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
      return (Math.random() * 0.8 + 4.2).toFixed(1); // Mock rating for products without reviews
    }
    
    const average = ratings.reduce((sum, rating) => sum + rating.star, 0) / ratings.length;
    return average.toFixed(1);
  };

  const getReviewCount = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return Math.floor(Math.random() * 500 + 50); // Mock review count
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
    // Priority: discounted price > wholesale price > original price
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
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
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
          className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
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
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
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
            <div key={product._id || product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
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
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" style={{ display: product.img ? 'none' : 'flex' }}>
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
                      to={`/product/${product._id || product.id}`}
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
                    {product.brand?.toLowerCase() === 'cornells' && (
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <FaHeart className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Special Badge for Cornells */}
                {product.brand?.toLowerCase() === 'cornells' && (
                  <div className="absolute bottom-4 left-4 bg-rose-600 text-white px-2 py-1 rounded text-xs font-bold">
                    GLOBAL BRAND
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
                    {product.desc || product.description || "Premium quality product from Rekker"}
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
                <div className={`${
                  product.brand?.toLowerCase() === 'cornells' 
                    ? 'bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-100' 
                    : product.brand?.toLowerCase() === 'saffron'
                    ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100'
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-100'
                } rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {product.wholesalePrice ? 'Wholesale Price' : 'Price'}
                    </span>
                    <span className={`text-lg font-bold ${
                      product.brand?.toLowerCase() === 'cornells' ? 'text-rose-600' :
                      product.brand?.toLowerCase() === 'saffron' ? 'text-orange-600' : 'text-red-600'
                    }`}>
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
                    className={`flex-1 ${
                      product.brand?.toLowerCase() === 'cornells'
                        ? 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700'
                        : product.brand?.toLowerCase() === 'saffron'
                        ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
                        : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
                    } text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Order</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-red-400 hover:text-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
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
                  {product.brand?.toLowerCase() === 'cornells' && product.inStock !== false && (
                    <span className="text-rose-500 text-xs">• Global Quality</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 via-red-900 to-purple-900 rounded-2xl p-8 text-center text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Ready to Place a Wholesale Order?</h3>
          <p className="text-red-100 mb-8 max-w-3xl mx-auto text-lg">
            Join hundreds of successful retailers and distributors who trust Rekker for quality products, 
            competitive wholesale prices, and authentic global brands like Cornells.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">1000+</div>
              <div className="text-red-200 text-sm">Happy Retailers</div>
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
              className="inline-flex items-center justify-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Start Wholesale Request</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              <span>Contact Sales Team</span>
            </Link>
          </div>
          
          <div className="mt-6 text-red-200 text-sm">
            <p>*Competitive pricing available for established retailers. Special rates for bulk orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;