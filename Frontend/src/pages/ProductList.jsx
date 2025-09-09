// pages/ProductList.jsx - Updated for dynamic product filtering
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaFilter, FaSort, FaSearch, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import Products from "../components/Products";
import { categoryAPI, brandAPI } from "../requestMethods";

const ProductList = () => {
  const location = useLocation();
  const { category } = useParams();
  const query = category || location.pathname.split("/")[2] || 'all';
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    brands: [],
    subcategories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      
      // Fetch categories for filter dropdown
      try {
        const categoriesRes = await categoryAPI.getCategories();
        setAvailableFilters(prev => ({
          ...prev,
          categories: categoriesRes.data || getDefaultCategories()
        }));
      } catch (err) {
        console.log("Using default categories for filters");
        setAvailableFilters(prev => ({
          ...prev,
          categories: getDefaultCategories()
        }));
      }

      // Fetch brands for filter dropdown
      try {
        const brandsRes = await brandAPI.getBrands();
        setAvailableFilters(prev => ({
          ...prev,
          brands: brandsRes.data || getDefaultBrands()
        }));
      } catch (err) {
        console.log("Using default brands for filters");
        setAvailableFilters(prev => ({
          ...prev,
          brands: getDefaultBrands()
        }));
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching filter options:", err);
      setError("Failed to load filter options");
    } finally {
      setLoading(false);
    }
  };

  // Default categories (fallback)
  const getDefaultCategories = () => [
    { id: 'stationery', name: 'Stationery' },
    { id: 'bags', name: 'Bags & Suitcases' },
    { id: 'toys', name: 'Toys' },
    { id: 'kitchenware', name: 'Kitchenware' },
    { id: 'padlocks', name: 'Padlocks' },
    { id: 'stuffed-toys', name: 'Teddy Bears & Stuffed Toys' },
    { id: 'party-items', name: 'Party Items' },
    { id: 'educational', name: 'Educational Items' },
    { id: 'personal-care', name: 'Personal Care' },
    { id: 'kitchen-care', name: 'Kitchen Care' },
    { id: 'laundry-care', name: 'Laundry Care' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'hair-care', name: 'Hair Care' }
  ];

  // Default brands (fallback)
  const getDefaultBrands = () => [
    { id: 'rekker', name: 'Rekker' },
    { id: 'saffron', name: 'Saffron' },
    { id: 'cornells', name: 'Cornells' }
  ];

  const handleFilters = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    
    if (value !== "default" && value !== "") {
      setFilters({
        ...filters,
        [name]: value,
      });
    } else {
      const newFilters = { ...filters };
      delete newFilters[name];
      setFilters(newFilters);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    // Reset all select elements
    const selects = document.querySelectorAll('select');
    selects.forEach(select => select.value = 'default');
  };

  const getCategoryDisplayName = (categoryId) => {
    if (!categoryId || categoryId === 'all') return 'All Products';
    
    const category = availableFilters.categories.find(cat => 
      (cat.id || cat._id) === categoryId
    );
    
    return category ? category.name : categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-rose-50/20 to-red-50/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-rose-50/20 to-red-50/10">
      {/* Hero Header */}
      <div className={`relative py-20 bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-wide">
            {getCategoryDisplayName(query)}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of premium products, each crafted for excellence and trusted by businesses across Kenya
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className={`bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
                  isFilterOpen 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white/70 hover:bg-white/90 text-gray-700'
                }`}
              >
                <FaFilter className="w-4 h-4" />
                <span className="font-medium">
                  {Object.keys(filters).length > 0 ? `Filters (${Object.keys(filters).length})` : 'Filters'}
                </span>
              </button>

              <div className="flex items-center space-x-2">
                <FaSort className="w-4 h-4 text-gray-600" />
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-3 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 font-medium backdrop-blur-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="featured">Featured Products</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <div className={`transition-all duration-500 overflow-hidden ${isFilterOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 tracking-wide">REFINE YOUR SEARCH</h3>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  <FaTimes className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 tracking-wide uppercase text-sm">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 font-medium"
                  >
                    <option value="default">All Categories</option>
                    {availableFilters.categories.map(category => (
                      <option key={category.id || category._id} value={category.id || category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 tracking-wide uppercase text-sm">
                    Brand
                  </label>
                  <select
                    name="brand"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 font-medium"
                  >
                    <option value="default">All Brands</option>
                    {availableFilters.brands.map(brand => (
                      <option key={brand.id || brand._id} value={brand.name || brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Status Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 tracking-wide uppercase text-sm">
                    Stock Status
                  </label>
                  <select
                    name="inStock"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 font-medium"
                  >
                    <option value="default">All Products</option>
                    <option value="true">In Stock Only</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-3 tracking-wide uppercase text-sm">
                  Price Range (KSh)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min Price"
                      onChange={handleFilters}
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max Price"
                      onChange={handleFilters}
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {Object.keys(filters).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-600 font-medium mr-2">Active filters:</span>
                    {Object.entries(filters).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                      >
                        {key === 'inStock' 
                          ? (value === 'true' ? 'In Stock' : 'Out of Stock')
                          : value
                        }
                        <button
                          onClick={() => {
                            const newFilters = { ...filters };
                            delete newFilters[key];
                            setFilters(newFilters);
                            
                            // Reset the corresponding select/input
                            const element = document.querySelector(`[name="${key}"]`);
                            if (element) {
                              element.value = element.type === 'number' ? '' : 'default';
                            }
                          }}
                          className="ml-2 hover:text-red-600 transition-colors"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={fetchFilterOptions}
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Products Section */}
      {!error && (
        <div className={`container mx-auto px-6 py-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <Products query={query === 'all' ? null : query} filters={filters} sort={sort} searchTerm={searchTerm} />
        </div>
      )}

      {/* Floating Filter Toggle for Mobile */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`lg:hidden fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 transform hover:scale-110 ${
          isFilterOpen 
            ? 'bg-gradient-to-r from-red-700 to-rose-700' 
            : 'bg-gradient-to-r from-red-600 to-rose-600'
        }`}
      >
        <FaFilter className="w-5 h-5" />
        {Object.keys(filters).length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-red-600 rounded-full text-xs font-bold flex items-center justify-center">
            {Object.keys(filters).length}
          </span>
        )}
      </button>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-100/30 to-rose-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-100/20 to-red-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default ProductList;