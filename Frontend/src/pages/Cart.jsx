// pages/Cart.jsx
import { FaMinus, FaPlus, FaTrashAlt, FaShoppingBag, FaLock, FaGift } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import { removeProduct, clearCart, updateQuantity } from "../redux/cartRedux.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (product, newQuantity) => {
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

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await userRequest.post("/stripe/create-checkout-session", {
        cart,
        userId: user.currentUser._id,
        email: user.currentUser.email,
        name: user.currentUser.name,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyPromoCode = () => {
    // Simple promo code logic - in real app, this would be handled by backend
    if (promoCode.toLowerCase() === "cornell10") {
      setDiscount(cart.total * 0.1);
    } else if (promoCode.toLowerCase() === "vip15") {
      setDiscount(cart.total * 0.15);
    } else {
      setDiscount(0);
    }
  };

  const finalTotal = cart.total - discount + 10; // Including shipping

  if (cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaShoppingBag className="w-16 h-16 text-purple-400" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wider">
            YOUR COLLECTION IS EMPTY
          </h2>
          <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
            Discover our exclusive range of premium beauty products and start building your perfect collection
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-light tracking-wide uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            YOUR EXCLUSIVE COLLECTION
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            {cart.products.length} item{cart.products.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900 tracking-wide">Shopping Cart</h2>
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
                              <p className="text-gray-600 font-light text-sm leading-relaxed">
                                {product.desc?.slice(0, 100)}...
                              </p>
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
                                onClick={() => handleQuantityChange(product, product.quantity - 1)}
                                className="p-3 hover:bg-gray-100 rounded-l-xl transition-colors"
                              >
                                <FaMinus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="px-4 py-3 text-lg font-light min-w-[60px] text-center">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(product, product.quantity + 1)}
                                className="p-3 hover:bg-gray-100 rounded-r-xl transition-colors"
                              >
                                <FaPlus className="w-3 h-3 text-gray-600" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-light text-gray-900">
                                ${(product.price * product.quantity).toFixed(2)}
                              </div>
                              {product.quantity > 1 && (
                                <div className="text-sm text-gray-500 font-light">
                                  ${product.price} each
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

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Order Summary</h3>

                {/* Promo Code */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-light mb-3 tracking-wide uppercase text-sm">
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-6 py-3 bg-gray-900 text-white rounded-r-xl hover:bg-gray-800 transition-colors font-light"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-2 font-light">
                      Promo code applied! You saved ${discount.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Order Totals */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-light">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl text-gray-900 font-light">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 mb-6 p-4 bg-green-50 rounded-xl">
                  <FaLock className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-light text-sm">Secure Checkout</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                <Link
                  to="/"
                  className="block w-full text-center py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
                >
                  Continue Shopping
                </Link>

                {/* Additional Info */}
                <div className="mt-8 space-y-3 text-sm text-gray-500 font-light">
                  <div className="flex items-center space-x-2">
                    <FaGift className="w-4 h-4" />
                    <span>Free gift wrapping available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaShoppingBag className="w-4 h-4" />
                    <span>Free shipping on orders over $100</span>
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