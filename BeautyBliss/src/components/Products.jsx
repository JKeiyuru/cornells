// components/Products.jsx
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods.js";
import { Link } from "react-router-dom";
import { showAverage } from "./rating.jsx";
import PropTypes from "prop-types";

const Products = ({ filters, sort, query }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        let res;
        if (query) {
          res = await userRequest.get(`/products?search=${query}`);
        } else {
          res = await userRequest.get(`/products`);
        }
        
        // Handle different possible response structures
        let productsData = [];
        if (res.data) {
          if (Array.isArray(res.data)) {
            // Direct array response
            productsData = res.data;
          } else if (res.data.products && Array.isArray(res.data.products)) {
            // Object with products property
            productsData = res.data.products;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            // Object with data property containing products
            productsData = res.data.data;
          } else if (typeof res.data === 'object' && res.data !== null) {
            // Single product object, wrap in array
            productsData = [res.data];
          }
        }
        
        console.log('Products data received:', productsData); // Debug log
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [query]);

  useEffect(() => {
    // Ensure products is always an array before spreading
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      setFilteredProducts([]);
      return;
    }

    let tempProducts = [...products];

    // Apply filters
    if (filters) {
      tempProducts = tempProducts.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true; // Skip empty filters
          // Safely check if the property exists and contains the value
          if (!item[key]) return false;
          if (Array.isArray(item[key])) {
            return item[key].includes(value);
          } else if (typeof item[key] === 'string') {
            return item[key].toLowerCase().includes(value.toLowerCase());
          }
          return item[key] === value;
        });
      });
    }

    // Apply sorting
    if (sort === "newest") {
      tempProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "asc") {
      tempProducts.sort((a, b) => {
        const priceA = a.discountedPrice || a.price || 0;
        const priceB = b.discountedPrice || b.price || 0;
        return priceA - priceB;
      });
    } else if (sort === "desc") {
      tempProducts.sort((a, b) => {
        const priceA = a.discountedPrice || a.price || 0;
        const priceB = b.discountedPrice || b.price || 0;
        return priceB - priceA;
      });
    }

    setFilteredProducts(tempProducts);
  }, [products, filters, sort]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
          <div className="text-white font-light tracking-widest text-lg">CURATING LUXURY...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="text-amber-400 text-sm font-light tracking-[0.3em] uppercase">
              EXCLUSIVE COLLECTIONS
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-thin text-white tracking-wider">
            LUXURY <span className="text-amber-400">FRAGRANCES</span>
          </h2>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.isArray(filteredProducts) && filteredProducts.map((product, index) => (
            <Link 
              to={`/product/${product._id}`} 
              key={product._id || index}
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="group relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/10 transform hover:scale-105 hover:-translate-y-2">
                
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.img || '/placeholder-image.jpg'}
                    alt={product.title || 'Product'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-3">
                      <button className="p-3 bg-amber-400 text-black rounded-full hover:bg-amber-300 transition-colors duration-300 transform hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors duration-300 transform hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                    LUXURY
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-white font-light text-lg tracking-wide group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                      {product.title || 'Untitled Product'}
                    </h3>
                    
                    {/* Rating */}
                    {product && product?.ratings && Array.isArray(product.ratings) && product.ratings.length > 0 && (
                      <div className="transform scale-90 origin-left">
                        {showAverage(product)}
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="space-y-2">
                    {product.originalPrice && (
                      <div className="text-white/40 text-sm line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                    <div className="text-amber-400 text-xl font-light tracking-wide">
                      ${product.discountedPrice || product.price || '0'}
                    </div>
                  </div>

                  {/* Premium Features */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <span>FREE SHIPPING</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <span>GIFT WRAP</span>
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 text-amber-400 rounded-lg hover:from-amber-500/30 hover:to-amber-600/30 hover:border-amber-400/50 transition-all duration-300 font-light tracking-widest text-sm uppercase backdrop-blur-sm">
                    ADD TO COLLECTION
                  </button>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 border-2 border-amber-400/0 rounded-2xl transition-all duration-500 ${hoveredProduct === index ? 'border-amber-400/30' : ''}`}></div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-2xl transition-opacity duration-500 ${hoveredProduct === index ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {(!Array.isArray(filteredProducts) || filteredProducts.length === 0) && !loading && (
          <div className="text-center py-20">
            <div className="space-y-6">
              <div className="text-6xl text-white/10">🔍</div>
              <div className="text-white/60 text-xl font-light">
                No luxury fragrances found matching your criteria
              </div>
              <div className="text-white/40 text-sm">
                Refine your search or explore our full collection
              </div>
            </div>
          </div>
        )}
      </div> 
    </div> 
  );
};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
  query: PropTypes.string,
};

export default Products;