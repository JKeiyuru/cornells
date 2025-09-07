// pages/Cart.jsx - Rekker Wholesale Request Cart
import { FaMinus, FaPlus, FaTrashAlt, FaShoppingBag, FaFileInvoiceDollar, FaEnvelope, FaPhone } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, clearCart, updateQuantity } from "../redux/cartRedux.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [deliveryPreference, setDeliveryPreference] = useState("pickup");

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < product.moq) {
      alert(`Minimum order quantity for ${product.title} is ${product.moq} units`);
      return;
    }
    if (newQuantity === 0) {
      dispatch(removeProduct(product));
    } else {
      dispatch(updateQuantity({ product, quantity: newQuantity }));
    }
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSubmitRequest = async () => {
    try {
      setIsSubmitting(true);
      
      const requestData = {
        userId: user.currentUser._id,
        userEmail: user.currentUser.email,
        userName: user.currentUser.name,
        businessName: user.currentUser.businessName || 'Not specified',
        products: cart.products,
        totalEstimate: estimatedTotal,
        requestMessage,
        urgency,
        deliveryPreference,
        submittedAt: new Date().toISOString()
      };

      // In a real app, this would be an API call
      console.log('Wholesale request submitted:', requestData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Wholesale request submitted successfully! Our team will contact you within 24 hours with a detailed quote.');
      
      // Clear cart after successful submission
      dispatch(clearCart());
      
    } catch (error) {
      console.error('Error submitting wholesale request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate estimated totals based on wholesale pricing
  const estimatedTotal = cart.products.reduce((total, product) => {
    return total + (product.wholesalePrice * product.quantity);
  }, 0);

  const estimatedSavings = cart.products.reduce((total, product) => {
    const retailTotal = product.price * product.quantity;
    const wholesaleTotal = product.wholesalePrice * product.quantity;
    return total + (retailTotal - wholesaleTotal);
  }, 0);

  if (cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaShoppingBag className="w-16 h-16 text-blue-500" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wider">
            YOUR WHOLESALE REQUEST IS EMPTY
          </h2>
          <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
            Browse our wholesale catalog and add products to request a detailed quote with MOQ pricing
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-2xl font-light tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            WHOLESALE REQUEST CART
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            {cart.products.length} product{cart.products.length !== 1 ? 's' : ''} selected for wholesale quote
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">Wholesale Request Items</h2>
                <button
                  onClick={handleClearCart}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors font-light"
                >
                  <FaTrashAlt className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-6">
                {cart.products.map((product, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
                    <div className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={product.img}
                            alt={product.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-light text-gray-900 mb-2 tracking-wide">
                                {product.title}
                              </h3>
                              <p className="text-gray-600 font-light text-sm leading-relaxed mb-2">
                                {product.desc?.slice(0, 100)}...
                              </p>
                              
                              {/* MOQ Information */}
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-light">
                                  MOQ: {product.moq} units
                                </span>
                                <span className="bg-green-50 text-green-700 px-2 py-1 rounded font-light">
                                  Wholesale: KSh {product.wholesalePrice}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveProduct(product)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            >
                              <FaTrashAlt className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-gray-50 rounded-xl">
                              <button
                                onClick={() => handleQuantityChange(product, Math.max(product.moq, product.quantity - 10))}
                                className="p-3 hover:bg-gray-100 rounded-l-xl transition-colors"
                                disabled={product.quantity <= product.moq}
                              >
                                <FaMinus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="px-4 py-3 text-lg font-light min-w-[80px] text-center">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(product, product.quantity + 10)}
                                className="p-3 hover:bg-gray-100 rounded-r-xl transition-colors"
                              >
                                <FaPlus className="w-3 h-3 text-gray-600" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-light text-gray-900">
                                KSh {(product.wholesalePrice * product.quantity).toLocaleString()}
                              </div>
                              <div className="text-sm text-green-600 font-light">
                                Save KSh {((product.price - product.wholesalePrice) * product.quantity).toLocaleString()}
                              </div>
                              {product.quantity < product.moq && (
                                <div className="text-xs text-red-500 mt-1">
                                  Below minimum order quantity
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Wholesale Request Summary</h3>

                {/* Request Details Form */}
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                      Request Priority
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                    >
                      <option value="normal">Normal (5-7 days)</option>
                      <option value="urgent">Urgent (2-3 days)</option>
                      <option value="asap">ASAP (24 hours)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                      Delivery Preference
                    </label>
                    <select
                      value={deliveryPreference}
                      onChange={(e) => setDeliveryPreference(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                    >
                      <option value="pickup">Pickup from warehouse</option>
                      <option value="delivery_nairobi">Delivery within Nairobi</option>
                      <option value="delivery_kenya">Delivery countrywide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                      Additional Requirements
                    </label>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      rows="4"
                      placeholder="Specify any special requirements, bulk discounts needed, payment terms, delivery timeline, etc..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light resize-none"
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Estimated Wholesale Total</span>
                    <span>KSh {estimatedTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600 font-light">
                    <span>Estimated Savings</span>
                    <span>KSh {estimatedSavings.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl text-gray-900 font-light">
                      <span>Request Value</span>
                      <span>KSh {estimatedTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-light mt-2">
                      *Final pricing will be provided in the official quote
                    </p>
                  </div>
                </div>

                {/* Business Information Display */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Request From:</h4>
                  <div className="text-sm text-blue-800 font-light space-y-1">
                    <p>{user.currentUser?.businessName || 'Business name not set'}</p>
                    <p>{user.currentUser?.name}</p>
                    <p>{user.currentUser?.email}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Request...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FaFileInvoiceDollar className="w-5 h-5" />
                      <span>Submit Wholesale Request</span>
                    </div>
                  )}
                </button>

                <Link
                  to="/products"
                  className="block w-full text-center py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
                >
                  Continue Browsing
                </Link>

                {/* Contact Information */}
                <div className="mt-8 space-y-3 text-sm text-gray-500 font-light">
                  <div className="text-center mb-4">
                    <h5 className="font-medium text-gray-700">Need Immediate Assistance?</h5>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <FaPhone className="w-4 h-4 text-blue-600" />
                      <span>+254 700 123 456</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="w-4 h-4 text-blue-600" />
                      <span>sales@rekker.co.ke</span>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-400 mt-4">
                    <p>Our wholesale team responds within 24 hours</p>
                    <p>Monday - Friday: 8AM - 6PM | Saturday: 9AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOQ Information Panel */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Understanding Wholesale Pricing</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Minimum Order Quantity (MOQ)</h4>
                  <p className="text-gray-600 font-light text-sm">
                    Each product has a minimum quantity requirement to qualify for wholesale pricing
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaFileInvoiceDollar className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Volume Discounts</h4>
                  <p className="text-gray-600 font-light text-sm">
                    Larger quantities often qualify for additional bulk pricing discounts
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPhone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Personal Service</h4>
                  <p className="text-gray-600 font-light text-sm">
                    Dedicated account managers for all wholesale partnerships
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">What Happens Next?</h4>
                <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-600 font-light">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">1</div>
                    <span>We review your request</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">2</div>
                    <span>Prepare detailed quote</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">3</div>
                    <span>Send official pricing</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-600">4</div>
                    <span>Process your order</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;