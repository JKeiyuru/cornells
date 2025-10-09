/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// pages/Product.jsx - Wholesale Product Details Page
import { FaMinus, FaPlus, FaShoppingCart, FaShare, FaStar, FaCheck, FaBox, FaTruck, FaPhone } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { showAverage } from "../components/rating";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const id = location.pathname.split("/")[2];

  const handleQuantity = (action) => {
    if (action === "dec") {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    }
    if (action === "inc") {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API call
        // const res = await userRequest.get("/products/find/" + id);
        // setProduct(res.data);
        
        // Mock data for demonstration
        setProduct({
          _id: id,
          title: "Premium Hand Wash - Lavender",
          brand: "Saffron",
          category: "Personal Care",
          subcategory: "Hand Care",
          wholesalePrice: 220,
          wholesaleMinimumQuantity: 100,
          unit: "bottles",
          img: "https://images.unsplash.com/photo-1585681442066-7b524503fb3c?w=500",
          desc: "Premium antibacterial hand wash with natural lavender extract. Provides 99.9% germ protection while being gentle on skin. Enriched with moisturizing ingredients to keep hands soft and smooth. Perfect for retail stores, hotels, schools, and offices. Manufactured by Rekker with the highest quality standards.",
          inStock: true,
          featured: true,
          ratings: [
            { star: 5, name: "John Doe", comment: "Excellent product quality!" },
            { star: 4, name: "Jane Smith", comment: "Great value for wholesale" }
          ]
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const getBrandColor = (brand) => {
    switch (brand?.toLowerCase()) {
      case 'saffron': return 'from-orange-500 to-red-500';
      case 'cornells': return 'from-purple-500 to-pink-500';
      case 'rekker':
      default: return 'from-blue-600 to-indigo-600';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    return formatPrice(product.wholesalePrice * quantity);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} - Wholesale available from Rekker`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        className="custom-toast-container"
      />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/products/all" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Image Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[1, 2, 3].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeImageIndex === index 
                          ? `bg-gradient-to-r ${getBrandColor(product.brand)} w-8` 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Header Section */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBrandColor(product.brand)} mb-3`}>
                      <span>{product.brand}</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">
                      {product.title}
                    </h1>
                    <p className="text-gray-600">{product.subcategory || product.category}</p>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                    title="Share this product"
                  >
                    <FaShare className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  {product && product?.ratings && product?.ratings.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      {showAverage(product)}
                      <span className="text-gray-600 font-medium">
                        ({product.ratings.length} reviews)
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">No reviews yet</span>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <FaCheck className="w-4 h-4" />
                  <span className="font-semibold">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Wholesale Pricing */}
              <div className={`bg-gradient-to-r ${getBrandColor(product.brand)} bg-opacity-10 rounded-2xl p-6 border-2 ${
                product.brand?.toLowerCase() === 'saffron' ? 'border-orange-200' :
                product.brand?.toLowerCase() === 'cornells' ? 'border-purple-200' :
                'border-blue-200'
              }`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Wholesale Pricing</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price per Unit</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.wholesalePrice)}
                    </p>
                    <p className="text-xs text-gray-500">per {product.unit || 'piece'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Minimum Order</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {product.wholesaleMinimumQuantity}
                    </p>
                    <p className="text-xs text-gray-500">{product.unit || 'pieces'}</p>
                  </div>
                </div>
                
                {product.brand?.toLowerCase() === 'cornells' && (
                  <div className="pt-4 border-t border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      ✨ Exclusively distributed by Rekker in Kenya
                    </p>
                  </div>
                )}
                {product.brand?.toLowerCase() === 'saffron' && (
                  <div className="pt-4 border-t border-orange-200">
                    <p className="text-sm text-orange-600 font-medium">
                      🏭 Manufactured by Rekker - Quality Guaranteed
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
                <div className="text-gray-600 leading-relaxed">
                  {showFullDescription ? product.desc : `${product.desc?.slice(0, 200)}...`}
                  {product.desc?.length > 200 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className={`text-blue-600 hover:text-blue-700 ml-2 font-semibold`}
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-3">Order Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-full shadow-lg border-2 border-gray-200">
                      <button
                        onClick={() => handleQuantity("dec")}
                        className="p-4 hover:bg-gray-50 rounded-l-full transition-colors duration-200"
                      >
                        <FaMinus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-8 py-4 text-xl font-bold min-w-[80px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity("inc")}
                        className="p-4 hover:bg-gray-50 rounded-r-full transition-colors duration-200"
                      >
                        <FaPlus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {calculateTotal()}
                      </div>
                    </div>
                  </div>
                  {quantity < product.wholesaleMinimumQuantity && (
                    <p className="text-sm text-orange-600 mt-2">
                      ⚠️ Minimum order quantity is {product.wholesaleMinimumQuantity} {product.unit}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/wholesale-request"
                    className={`w-full bg-gradient-to-r ${getBrandColor(product.brand)} text-white py-4 rounded-2xl font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3`}
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    <span>Request Wholesale Quote</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold tracking-wide uppercase hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaPhone className="w-5 h-5" />
                    <span>Contact Sales</span>
                  </Link>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaTruck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-600">Nationwide shipping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quality Assured</p>
                    <p className="text-xs text-gray-600">Premium products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Customer Reviews
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {product.ratings?.length > 0 ? (
                product.ratings.map((rating, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-lg">
                          {rating.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900">{rating.name}</h4>
                          <StarRatings
                            numberOfStars={5}
                            rating={rating.star}
                            starRatedColor="#3b82f6"
                            starDimension="18px"
                            starSpacing="2px"
                          />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {rating.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaStar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Have Questions About This Product?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Our sales team is ready to help you with pricing, availability, and bulk order inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                <FaPhone className="w-5 h-5" />
                <span>Contact Sales Team</span>
              </Link>
              <Link
                to="/wholesale-request"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all"
              >
                <FaShoppingCart className="w-5 h-5" />
                <span>Request Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-toast-container .Toastify__toast {
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Product;