/* eslint-disable react/no-unescaped-entities */
// pages/Order.jsx
import { useEffect, useState } from "react";
import { FaCheckCircle, FaStar, FaBox, FaShippingFast, FaCreditCard, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import StarRating from "react-star-ratings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeRatingProduct, setActiveRatingProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const getUserOrder = async () => {
      try {
        const res = await userRequest.get(
          `/orders/find/${user.currentUser._id}`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load orders");
      }
    };

    if (user.currentUser?._id) {
      getUserOrder();
    }
  }, [user]);

  const handleRating = async (id) => {
    const singleRating = {
      star: rating,
      name: user.currentUser.name,
      postedBy: user.currentUser._id,
      comment: comment,
    };
    
    try {
      await userRequest.put(`/products/ratings/${id}`, singleRating);
      toast.success("Thank you for your review!", {
        style: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#f8f8f8',
          border: '1px solid #d4af37',
        }
      });
      setComment("");
      setRating(0);
      setActiveRatingProduct(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getOrderStatus = (index) => {
    const statuses = ['Processing', 'Shipped', 'Delivered', 'Completed'];
    return statuses[Math.min(index % 4, 3)];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Completed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaBox className="w-16 h-16 text-purple-400" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wider">
            NO ORDERS YET
          </h2>
          <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
            Start your exclusive beauty journey with Cornells premium products
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-light tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Shop Now</span>
          </Link>
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
      />

      {/* Hero Header */}
      <div className={`bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            ORDER HISTORY
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            Thank you for choosing Cornells for your beauty needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {orders.map((order, index) => {
            const orderStatus = getOrderStatus(index);
            return (
              <div 
                key={index} 
                className={`mb-12 transition-all duration-700 delay-${index * 200} ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
              >
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-wide">
                          Order #{String(index + 1).padStart(6, '0')}
                        </h2>
                        <p className="text-gray-600 font-light">
                          Placed on {formatDate(order.createdAt || new Date())}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderStatus)}`}>
                          {orderStatus}
                        </span>
                        <div className="text-right">
                          <p className="text-gray-600 font-light">Total</p>
                          <p className="text-2xl font-light text-gray-900">${order.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-8">
                    <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide">Items Ordered</h3>
                    <div className="space-y-6">
                      {order.products.map((item, idx) => (
                        <div key={idx} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                          <div className="flex items-start space-x-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-light text-gray-900 mb-2 tracking-wide">
                                    {item.title}
                                  </h4>
                                  <p className="text-gray-600 font-light">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-light text-gray-900">${item.price}</p>
                                </div>
                              </div>

                              {/* Rating Section */}
                              <div className="bg-gray-50 rounded-xl p-6 mt-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h5 className="font-medium text-gray-900">Rate This Product</h5>
                                  {activeRatingProduct === item._id && (
                                    <button
                                      onClick={() => setActiveRatingProduct(null)}
                                      className="text-gray-500 hover:text-gray-700 text-sm font-light"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>

                                {activeRatingProduct === item._id ? (
                                  <div className="space-y-4">
                                    <StarRating
                                      numberOfStars={5}
                                      starDimension="30px"
                                      starSpacing="4px"
                                      rating={rating}
                                      isSelectable={true}
                                      starRatedColor="#9333ea"
                                      starHoverColor="#a855f7"
                                      changeRating={(newRating) => setRating(newRating)}
                                    />
                                    <textarea
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light resize-none"
                                      rows="3"
                                      placeholder="Share your experience with this product..."
                                    />
                                    <div className="flex items-center space-x-3">
                                      <button 
                                        onClick={() => handleRating(item._id)}
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                                      >
                                        Submit Review
                                      </button>
                                      <button
                                        onClick={() => setActiveRatingProduct(null)}
                                        className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-light hover:border-gray-400 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => setActiveRatingProduct(item._id)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-light"
                                    >
                                      <FaStar className="w-4 h-4" />
                                      <span>Write Review</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-light">
                                      <FaHeart className="w-4 h-4" />
                                      <span>Add to Wishlist</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="bg-gray-50 p-8 grid md:grid-cols-3 gap-8">
                    {/* Shipping Information */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaShippingFast className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Shipping Details</h4>
                      </div>
                      <div className="text-gray-600 font-light space-y-1">
                        <p>{order.name}</p>
                        <p>{order.email}</p>
                        {order.phone && <p>{order.phone}</p>}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FaCreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Payment Method</h4>
                      </div>
                      <p className="text-gray-600 font-light">VISA ending in ••••</p>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FaBox className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">Order Summary</h4>
                      </div>
                      <div className="text-gray-600 font-light space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${order.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>$10.00</span>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                          <span>Total:</span>
                          <span>${(parseFloat(order.total) + 10).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-light tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;