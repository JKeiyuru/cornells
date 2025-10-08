/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { 
  FaFilter, FaSort, FaSearch, FaTimes, FaStar, FaShoppingCart, 
  FaEye, FaHeart, FaBoxes, FaLeaf, FaGem, FaThLarge, FaThList,
  FaChevronDown, FaCheck, FaIndustry, FaStore, FaUsers, FaShippingFast, FaAward
} from "react-icons/fa";

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
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [activeBrand, setActiveBrand] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Simulate loading products - replace with actual API call
    setTimeout(() => {
      setProducts(SAMPLE_PRODUCTS);
      setLoading(false);
    }, 500);
  }, [query, filters, sort]);

  // Sample product data structure - REPLACE WITH YOUR ACTUAL PRODUCTS
  const SAMPLE_PRODUCTS = [
    {
      _id: "1",
      title: "Premium School Backpack - Adventure Series",
      brand: "Rekker",
      category: "Bags & Suitcases",
      subcategory: "School Bags",
      originalPrice: 2500,
      discountedPrice: 2200,
      wholesalePrice: 1800,
      wholesaleMinimumQuantity: 50,
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      desc: "Durable, ergonomic school backpack with multiple compartments and water-resistant material. Perfect for students of all ages.",
      inStock: true,
      featured: true,
      ratings: [{ star: 5 }, { star: 4 }, { star: 5 }]
    },
    {
      _id: "2",
      title: "Saffron Premium Hand Wash - Lavender",
      brand: "Saffron",
      category: "Personal Care",
      subcategory: "Hand Care",
      originalPrice: 350,
      discountedPrice: 280,
      wholesalePrice: 220,
      wholesaleMinimumQuantity: 100,
      img: "https://images.unsplash.com/photo-1585681442066-7b524503fb3c?w=500",
      desc: "Antibacterial hand wash with natural lavender extract. Gentle on skin, tough on germs. 99.9% germ protection.",
      inStock: true,
      featured: true,
      ratings: [{ star: 5 }, { star: 5 }, { star: 4 }, { star: 5 }]
    },
    {
      _id: "3",
      title: "Cornells Bold & Beautiful Body Lotion",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Lotions",
      originalPrice: 450,
      discountedPrice: 380,
      wholesalePrice: 320,
      wholesaleMinimumQuantity: 72,
      img: "https://images.unsplash.com/photo-1594736797933-d0401ba04662?w=500",
      desc: "Ultra-rich body lotion with Shea Butter. 24-hour hydration. Globally trusted, locally distributed.",
      inStock: true,
      featured: true,
      ratings: [{ star: 5 }, { star: 5 }, { star: 5 }]
    },
    // Add more sample products as needed
    {
      _id: "4",
      title: "Rekker Executive Notebook Set",
      brand: "Rekker",
      category: "Stationery",
      subcategory: "Office Supplies",
      originalPrice: 1200,
      discountedPrice: 950,
      wholesalePrice: 750,
      wholesaleMinimumQuantity: 100,
      img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500",
      desc: "Premium executive notebook set with leather cover and high-quality paper. Perfect for professionals.",
      inStock: true,
      featured: false,
      ratings: [{ star: 4 }, { star: 5 }, { star: 4 }, { star: 5 }]
    }
  ];

  const categories = {
    rekker: [
      "Stationery", "Bags & Suitcases", "Toys", "Kitchenware", 
      "Padlocks", "Stuffed Toys", "Party Items", "Educational Items"
    ],
    saffron: [
      "Hand Care", "Dish Care", "Laundry Care", "Body Care", "Grooming"
    ],
    cornells: [
      "Body Care", "Hair Care", "Kids Care", "Wellness", "Gift Sets"
    ]
  };

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
    if (!ratings || ratings.length === 0) return 4.5;
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
    // Apply search filter
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply brand filter
    if (activeBrand !== "all" && product.brand?.toLowerCase() !== activeBrand.toLowerCase()) {
      return false;
    }
    
    // Apply category filter
    if (query !== 'all' && product.category !== query) {
      return false;
    }
    
    // Apply other filters
    if (filters.inStock === 'true' && !product.inStock) return false;
    if (filters.featured === 'true' && !product.featured) return false;
    
    // Apply price range filter
    const displayPrice = product.discountedPrice || product.originalPrice;
    if (displayPrice < priceRange.min || displayPrice > priceRange.max) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "asc":
        return (a.discountedPrice || a.originalPrice) - (b.discountedPrice || b.originalPrice);
      case "desc":
        return (b.discountedPrice || b.originalPrice) - (a.discountedPrice || a.originalPrice);
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
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/10 to-purple-50/10">
      {/* Enhanced Hero Header */}
      <div className={`relative py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Premium Products
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover quality across Rekker, Saffron & Cornells brands
            </p>
            
            {/* Brand Quick Filter Pills */}
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

      {/* Enhanced Search & Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Bar */}
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
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`hidden lg:flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                  isFilterOpen
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
                }`}
              >
                <FaFilter className="w-4 h-4" />
                <span>Filters</span>
                {Object.keys(filters).length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.keys(filters).length}
                  </span>
                )}
              </button>

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

          {/* Advanced Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-6 bg-white rounded-xl border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={() => setFilters({})}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Clear All
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {Object.entries(categories).map(([brand, cats]) => (
                      <optgroup key={brand} label={brand.toUpperCase()}>
                        {cats.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    onChange={(e) => setFilters({...filters, inStock: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Products</option>
                    <option value="true">In Stock Only</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special
                  </label>
                  <select
                    onChange={(e) => setFilters({...filters, featured: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Products</option>
                    <option value="true">Featured Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-110"
      >
        <FaFilter className="w-6 h-6" />
      </button>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {Object.entries(categories).map(([brand, cats]) => (
                      <optgroup key={brand} label={brand.toUpperCase()}>
                        {cats.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    onChange={(e) => setFilters({...filters, inStock: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Products</option>
                    <option value="true">In Stock Only</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setFilters({});
                    setShowMobileFilters(false);
                  }}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> products
          </p>
          {activeBrand !== "all" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Filtering by:</span>
              <span className="font-semibold text-blue-600">
                {activeBrand.charAt(0).toUpperCase() + activeBrand.slice(1)}
              </span>
              <button
                onClick={() => setActiveBrand("all")}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
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
                setFilters({});
                setSearchTerm("");
                setActiveBrand("all");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {sortedProducts.map((product) => {
              const rating = getProductRating(product.ratings);
              const displayPrice = product.discountedPrice || product.originalPrice;

              return viewMode === "grid" ? (
                // Grid View
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
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
                    {!product.inStock && (
                      <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        OUT OF STOCK
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <Link
                          to={`/product/${product._id}`}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-lg transform hover:scale-110"
                        >
                          <FaEye className="w-5 h-5" />
                        </Link>
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg transform hover:scale-110">
                          <FaHeart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{product.subcategory}</p>
                      <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.desc}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className={`bg-gradient-to-r ${getBrandColor(product.brand)} bg-opacity-10 rounded-xl p-3`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Retail Price</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(displayPrice)}
                          </div>
                          {product.originalPrice > displayPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {product.wholesalePrice && (
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Wholesale (MOQ: {product.wholesaleMinimumQuantity})</span>
                            <span className="font-bold text-green-600">
                              {formatPrice(product.wholesalePrice)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to="/wholesale-request"
                        className={`flex-1 bg-gradient-to-r ${getBrandColor(product.brand)} text-white py-2.5 rounded-xl font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105`}
                      >
                        Order
                      </Link>
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold text-center hover:border-blue-500 hover:text-blue-600 transition-all"
                      >
                        Details
                      </Link>
                    </div>

                    {/* Stock Status */}
                    <div className={`flex items-center gap-2 text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      <FaCheck className="w-4 h-4" />
                      <span className="font-medium">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-48 h-48 flex-shrink-0">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={product.img}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBrandColor(product.brand)} shadow-lg flex items-center gap-1`}>
                          {getBrandIcon(product.brand)}
                          <span>{product.brand}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">{product.subcategory}</p>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                <FaStar className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-semibold">{rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.ratings?.length || 0} reviews)
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">
                              {product.desc}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {formatPrice(displayPrice)}
                            </div>
                            {product.originalPrice > displayPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                            {product.wholesalePrice && (
                              <div className="mt-2 text-xs text-green-600 font-semibold">
                                Wholesale: {formatPrice(product.wholesalePrice)}
                                <br />
                                <span className="text-gray-500">MOQ: {product.wholesaleMinimumQuantity}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to="/wholesale-request"
                          className={`px-6 py-2.5 bg-gradient-to-r ${getBrandColor(product.brand)} text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105`}
                        >
                          Order Wholesale
                        </Link>
                        <Link
                          to={`/product/${product._id}`}
                          className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all"
                        >
                          View Details
                        </Link>
                        <button className="p-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-red-500 hover:text-red-600 transition-all">
                          <FaHeart className="w-5 h-5" />
                        </button>
                        <div className={`ml-auto flex items-center gap-2 text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          <FaCheck className="w-4 h-4" />
                          <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Wholesale CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join hundreds of retailers who trust our premium products. Competitive wholesale pricing with dedicated support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">500+ Retailers</h3>
                <p className="text-blue-100">Trusted by businesses nationwide</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShippingFast className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Fast Delivery</h3>
                <p className="text-blue-100">Nationwide shipping within 48 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAward className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quality Guarantee</h3>
                <p className="text-blue-100">Premium products with 100% satisfaction</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/wholesale-request"
                  className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                  Start Wholesale Order
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
                >
                  Contact Sales Team
                </Link>
              </div>
              <p className="text-blue-200 mt-4 text-sm">
                Minimum order value: KES 50,000 • Bulk discounts available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;