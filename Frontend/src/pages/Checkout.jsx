/* eslint-disable react/no-unescaped-entities */
// pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLock, FaCreditCard, FaShippingFast, FaGift, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const [shippingData, setShippingData] = useState({
    name: user?.currentUser?.name || "",
    email: user?.currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const [giftOptions, setGiftOptions] = useState({
    isGift: false,
    giftMessage: "",
    giftWrapping: false
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleGiftChange = (e) => {
    const { name, type, checked, value } = e.target;
    setGiftOptions({
      ...giftOptions,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const steps = [
    { number: 1, title: "Shipping", icon: FaShippingFast },
    { number: 2, title: "Payment", icon: FaCreditCard },
    { number: 3, title: "Review", icon: FaLock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      {/* Header */}
      <div className={`bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            SECURE CHECKOUT
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            Complete your exclusive Cornells purchase
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className={`mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep >= step.number;
                const isComplete = activeStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${index > 0 ? 'ml-8' : ''}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isComplete 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className={`mt-2 text-sm font-light ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-px ml-4 ${isComplete ? 'bg-green-500' : isActive ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className={`lg:col-span-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaShippingFast className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Shipping Information</h2>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Full Name
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            name="name"
                            value={shippingData.name}
                            onChange={handleShippingChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Email Address
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            name="email"
                            value={shippingData.email}
                            onChange={handleShippingChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            name="phone"
                            value={shippingData.phone}
                            onChange={handleShippingChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Country
                        </label>
                        <select
                          name="country"
                          value={shippingData.country}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Street Address
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="address"
                          value={shippingData.address}
                          onChange={handleShippingChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingData.zipCode}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    {/* Gift Options */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <FaGift className="w-5 h-5 text-purple-600" />
                        <h3 className="font-medium text-gray-900">Gift Options</h3>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="isGift"
                            checked={giftOptions.isGift}
                            onChange={handleGiftChange}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="font-light text-gray-700">This is a gift</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="giftWrapping"
                            checked={giftOptions.giftWrapping}
                            onChange={handleGiftChange}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="font-light text-gray-700">Add luxury gift wrapping (+$15)</span>
                        </label>

                        {giftOptions.isGift && (
                          <div>
                            <label className="block text-gray-700 font-light mb-2 text-sm">
                              Gift Message
                            </label>
                            <textarea
                              name="giftMessage"
                              value={giftOptions.giftMessage}
                              onChange={handleGiftChange}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light resize-none"
                              placeholder="Write your special message here..."
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaCreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Payment Information</h2>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="nameOnCard"
                        value={paymentData.nameOnCard}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                        placeholder="Full name as on card"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formatCardNumber(paymentData.cardNumber)}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                      <FaLock className="w-5 h-5 text-green-600" />
                      <p className="text-green-700 font-light text-sm">
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Review Order */}
              {activeStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FaLock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Review Your Order</h2>
                  </div>

                  {/* Shipping Summary */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
                    <div className="text-gray-600 font-light">
                      <p>{shippingData.name}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                      <p>{shippingData.country}</p>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="text-gray-600 font-light">
                      <p>•••• •••• •••• {paymentData.cardNumber.slice(-4)}</p>
                      <p>{paymentData.nameOnCard}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-gray-400 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-8">
                  {cart.products?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-600 font-light text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-gray-900 font-light">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Subtotal</span>
                    <span>${cart.total?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  {giftOptions.giftWrapping && (
                    <div className="flex justify-between text-gray-600 font-light">
                      <span>Gift Wrapping</span>
                      <span>$15.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl text-gray-900 font-light pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${(cart.total + 10 + (giftOptions.giftWrapping ? 15 : 0)).toFixed(2)}</span>
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

export default Checkout;