/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// pages/Product.jsx
import { FaMinus, FaPlus, FaShoppingBag, FaHeart, FaShare, FaStar } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { showAverage } from "../components/rating";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  let price;

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
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handlePrice = (
    originalPrice,
    discountedPrice,
    wholePrice,
    minimumQuantity,
    quantity
  ) => {
    if (quantity > minimumQuantity && discountedPrice) {
      discountedPrice = wholePrice;
      price = discountedPrice;
      return price;
    } else if (quantity > minimumQuantity && originalPrice) {
      originalPrice = wholePrice;
      price = originalPrice;
      return price;
    } else if (discountedPrice) {
      price = discountedPrice;
      return price;
    } else {
      price = originalPrice;
      return price;
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, price }));
    toast.success("Added to your exclusive collection", {
      style: {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#f8f8f8',
        border: '1px solid #d4af37',
      }
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      style: {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#f8f8f8',
        border: '1px solid #d4af37',
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading luxury experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Image Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[1, 2, 3].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeImageIndex === index 
                          ? 'bg-purple-600 w-8' 
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
                  <div>
                    <p className="text-purple-600 font-light text-sm tracking-wider uppercase mb-2">
                      Cornells Exclusive
                    </p>
                    <h1 className="text-4xl font-light text-gray-900 leading-tight tracking-wide">
                      {product.title}
                    </h1>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleWishlist}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isWishlisted 
                          ? 'bg-red-100 text-red-600 shadow-lg shadow-red-200/50' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaHeart className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300">
                      <FaShare className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  {product && product?.ratings && product?.ratings.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      {showAverage(product)}
                      <span className="text-gray-600 font-light">
                        ({product.ratings.length} reviews)
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500 font-light">No reviews yet</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-4 mb-8">
                  <span className="text-4xl font-light text-gray-900">
                    ${handlePrice(
                      product.originalPrice,
                      product.discountedPrice,
                      product.wholesalePrice,
                      product?.wholesaleMinimumQuantity,
                      quantity
                    )}
                  </span>
                  {product.discountedPrice && product.originalPrice > product.discountedPrice && (
                    <span className="text-xl text-gray-500 line-through font-light">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-light text-gray-900 tracking-wide">About This Product</h3>
                <div className="text-gray-600 font-light leading-relaxed">
                  {showFullDescription ? product.desc : `${product.desc?.slice(0, 200)}...`}
                  {product.desc?.length > 200 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-purple-600 hover:text-purple-700 ml-2 font-normal"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>

              {/* Wholesale Information */}
              {product.wholesalePrice && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="text-lg font-light text-gray-900 mb-2">Wholesale Available</h4>
                  <p className="text-gray-600 font-light">
                    Special price of <span className="font-normal text-purple-600">${product.wholesalePrice}</span> for orders of {product?.wholesaleMinimumQuantity}+ items
                  </p>
                </div>
              )}

              {/* What's in the Box */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-light text-gray-900 mb-4 text-center tracking-wide">
                  WHAT'S INCLUDED
                </h4>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
                <p className="text-gray-600 font-light leading-relaxed">
                  1 × {product.title} - Premium formulation with authentic ingredients and luxury packaging
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <span className="text-gray-700 font-light tracking-wide">QUANTITY</span>
                  <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200">
                    <button
                      onClick={() => handleQuantity("dec")}
                      className="p-4 hover:bg-gray-50 rounded-l-full transition-colors duration-200"
                    >
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-6 py-4 text-lg font-light min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity("inc")}
                      className="p-4 hover:bg-gray-50 rounded-r-full transition-colors duration-200"
                    >
                      <FaPlus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-3"
                >
                  <FaShoppingBag className="w-5 h-5" />
                  <span>Add to Collection</span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-purple-400 hover:text-purple-600 transition-all duration-300">
                    Buy Now
                  </button>
                  <button className="py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-purple-400 hover:text-purple-600 transition-all duration-300">
                    Find in Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light text-gray-900 mb-4 tracking-wider">
                CUSTOMER REVIEWS
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {product.ratings?.length > 0 ? (
                product.ratings.map((rating, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium">
                          {rating.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="font-medium text-gray-900">{rating.name}</h4>
                          <StarRatings
                            numberOfStars={5}
                            rating={rating.star}
                            starRatedColor="#9333ea"
                            starDimension="18px"
                            starSpacing="2px"
                          />
                        </div>
                        <p className="text-gray-600 font-light leading-relaxed">
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
                  <p className="text-gray-600 font-light text-lg">
                    Be the first to share your experience with this product
                  </p>
                </div>
              )}
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