// pages/ProductList.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFilter, FaSort, FaSearch, FaTimes } from "react-icons/fa";
import Products from "../components/Products";

const ProductList = () => {
  const location = useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value !== "default") {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    } else {
      const newFilters = { ...filters };
      delete newFilters[e.target.name];
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

  const filterOptions = {
    concern: [
      "Dry Skin", "Pigmentation", "Oil Control", "Anti Acne", "Sunburn",
      "Skin Brightening", "Tan Removal", "Night Routine", "UV Protection",
      "Damaged Hair", "Frizzy Hair", "Stretch Marks", "Color Protection",
      "Dry Hair", "Soothing", "Dandruff", "Greying", "Hairfall",
      "Hair Color", "Well Being", "Acne", "Hair Growth"
    ],
    brand: [
      "Garnier", "Kylie", "Kiss Beauty", "Dr Rashel", "Luron",
      "Nivea", "Heaven Dove", "Disaar", "Johnsons Baby", "Rexona"
    ],
    skintype: ["All", "Oily", "Dry", "Sensitive", "Normal"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      {/* Hero Header */}
      <div className={`relative py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-light text-white mb-6 tracking-wider">
            {query ? query.toUpperCase().replace(/-/g, ' ') : 'ALL PRODUCTS'}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of premium beauty products, each crafted for excellence
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
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-6 py-3 bg-white/70 border border-gray-200 rounded-2xl hover:bg-white/90 transition-all duration-300 backdrop-blur-sm"
              >
                <FaFilter className="w-4 h-4 text-gray-600" />
                <span className="font-light">Filters</span>
              </button>

              <div className="flex items-center space-x-2">
                <FaSort className="w-4 h-4 text-gray-600" />
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-3 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light backdrop-blur-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <div className={`transition-all duration-500 overflow-hidden ${isFilterOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-light text-gray-900 tracking-wide">REFINE YOUR SEARCH</h3>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                  <span className="font-light">Clear All</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Concern Filter */}
                <div>
                  <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                    Skin Concern
                  </label>
                  <select
                    name="concern"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                  >
                    <option value="default">All Concerns</option>
                    {filterOptions.concern.map(concern => (
                      <option key={concern} value={concern}>{concern}</option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                    Brand
                  </label>
                  <select
                    name="brand"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                  >
                    <option value="default">All Brands</option>
                    {filterOptions.brand.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Skin Type Filter */}
                <div>
                  <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                    Skin Type
                  </label>
                  <select
                    name="skintype"
                    onChange={handleFilters}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                  >
                    <option value="default">All Skin Types</option>
                    {filterOptions.skintype.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {Object.keys(filters).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-600 font-light mr-2">Active filters:</span>
                    {Object.entries(filters).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-light"
                      >
                        {value}
                        <button
                          onClick={() => {
                            const newFilters = { ...filters };
                            delete newFilters[key];
                            setFilters(newFilters);
                          }}
                          className="ml-2 hover:text-purple-600"
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

      {/* Products Section */}
      <div className={`container mx-auto px-6 py-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <Products query={query} filters={filters} sort={sort} searchTerm={searchTerm} />
      </div>

      {/* Floating Filter Toggle for Mobile */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 transform hover:scale-110"
      >
        <FaFilter className="w-5 h-5" />
      </button>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default ProductList;