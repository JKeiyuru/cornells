/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// pages/ProductList.jsx - Simplified Wholesale Product Listing
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { 
  FaFilter, FaSort, FaSearch, FaTimes, FaStar, FaShoppingCart, 
  FaEye, FaBoxes, FaLeaf, FaGem, FaThLarge, FaThList,
  FaCheck, FaUsers, FaShippingFast, FaAward, FaHandshake
} from "react-icons/fa";
import { getAllProducts, getProductsByBrand, getProductsByCategory, searchProducts } from "../components/data";

const ProductList = () => {
  const location = useLocation();
  const { category } = useParams();
  const query = category || location.pathname.split("/")[2] || 'all';
  
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [activeBrand, setActiveBrand] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
    try {
      setLoading(true);
      let filteredProducts = [];

      if (query && query !== 'all') {
        filteredProducts = getProductsByCategory(query);
        if (filteredProducts.length === 0) {
          filteredProducts = getProductsByBrand(query);
        }
      } else {
        filteredProducts = getAllProducts();
      }

      if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(term) ||
          product.desc.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        );
      }

      if (filters.brand && filters.brand !== 'default') {
        filteredProducts = filteredProducts.filter(p => 
          p.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      if (filters.inStock === 'true') {
        filteredProducts = filteredProducts.filter(p => p.inStock === true);
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [query, filters, sort, searchTerm]);

  const getBrandColor = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return 'from-orange-500 to-red-500';
      case 'cornells': return 'from-purple-500 to-pink-500';
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
    if (!ratings || ratings.length === 0) return (Math.random() * 0.8 + 4.2).toFixed(1);
    const average = ratings.reduce((sum, rating) => sum + rating.star, 0) / ratings.length;
    return average.toFixed(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProducts = products.filter(product => {
    if (activeBrand !== "all" && product.brand?.toLowerCase() !== activeBrand.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "asc":
        return a.wholesalePrice - b.wholesalePrice;
      case "desc":
        return b.wholesalePrice - a.wholesalePrice;
      case "popular":
        return (b.ratings?.length || 0) - (a.ratings?.length || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/10 to-purple-50/10">
      {/* Hero Header */}
      <div className={`relative py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Wholesale Products
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Premium quality products at competitive wholesale prices
            </p>
            
            {/* Brand Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {["all", "rekker", "saffron", "cornells"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeBrand === brand
                      ? 'bg-white text-gray-900 shadow-xl'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {brand === "all" ? "All Brands" : brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, category, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold focus:border-blue-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>

              <div className="flex gap-2 bg-white border-2 border-gray-200 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FaThLarge className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FaThList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="container mx-auto px-6 py-6">
        <p className="text-gray-600">
          Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> wholesale products
        </p>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 pb-12">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBoxes className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveBrand("all");
                setFilters({});
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {sortedProducts.map((product) => {
              const rating = getProductRating(product.ratings);

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" 
                      style={{ display: 'none' }}
                    >
                      <div className="text-center text-gray-500">
                        <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                          {getBrandIcon(product.brand)}
                        </div>
                        <p className="text-sm font-medium px-4">{product.title}</p>
                      </div>
                    </div>
                    
                    {/* Brand Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBrandColor(product.brand)} shadow-lg flex items-center gap-1`}>
                      {getBrandIcon(product.brand)}
                      <span>{product.brand}</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-lg">
                      <FaStar className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-800">{rating}</span>
                    </div>

                    {/* Stock Badge */}
                    {product.inStock === false && (
                      <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        OUT OF STOCK
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Link
                        to={`/product/${product._id}`}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-lg transform hover:scale-110"
                      >
                        <FaEye className="w-5 h-5" />
                      </Link>
                    </div>

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        FEATURED
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{product.subcategory || product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product.desc || "Premium quality product"}
                      </p>
                    </div>

                    {/* Wholesale Pricing Card */}
                    <div className={`bg-gradient-to-r ${getBrandColor(product.brand)} bg-opacity-10 rounded-xl p-4`}>
                      <div className="text-center mb-2">
                        <div className="text-xs text-gray-600 mb-1">Wholesale Price</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(product.wholesalePrice)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">per {product.unit || 'piece'}</div>
                      </div>
                      
                      {product.wholesaleMinimumQuantity && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Minimum Order</span>
                            <span className="font-bold text-gray-900">
                              {product.wholesaleMinimumQuantity} {product.unit || 'pieces'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Brand-specific info */}
                      {product.brand?.toLowerCase() === 'cornells' && (
                        <div className="mt-2 text-xs text-purple-600 font-medium text-center">
                          ✨ Exclusively Distributed by Rekker
                        </div>
                      )}
                      {product.brand?.toLowerCase() === 'saffron' && (
                        <div className="mt-2 text-xs text-orange-600 font-medium text-center">
                          🏭 Manufactured by Rekker
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to="/wholesale-request"
                        className={`flex-1 bg-gradient-to-r ${getBrandColor(product.brand)} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        <span>Order</span>
                      </Link>
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-center"
                      >
                        Details
                      </Link>
                    </div>

                    {/* Availability Status */}
                    <div className={`flex items-center justify-center gap-2 text-sm ${
                      product.inStock !== false ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FaCheck className="w-4 h-4" />
                      <span className="font-medium">{product.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Partnership CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Partner With Rekker
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join our network of successful retailers across Kenya
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">500+ Retailers</h3>
                <p className="text-blue-100">Trusted partners nationwide</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShippingFast className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Fast Delivery</h3>
                <p className="text-blue-100">48-hour nationwide shipping</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAward className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quality Assured</h3>
                <p className="text-blue-100">Premium products guaranteed</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/wholesale-request"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span>Place Wholesale Order</span>
                </Link>
                <Link
                  to="/retail-partnership"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
                >
                  <FaHandshake className="w-5 h-5" />
                  <span>Become a Retailer</span>
                </Link>
              </div>
              <p className="text-blue-200 text-sm">
                Competitive wholesale pricing • Dedicated support • Flexible payment terms
              </p>
            </div>
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

export default ProductList;