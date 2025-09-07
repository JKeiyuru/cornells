/* eslint-disable react/no-unescaped-entities */
// pages/Checkout.jsx - Rekker Wholesale Quote Request Page
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaFileInvoiceDollar, FaClipboardCheck, FaTruck } from "react-icons/fa";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [businessData, setBusinessData] = useState({
    businessName: user?.currentUser?.businessName || "",
    businessType: user?.currentUser?.businessType || "",
    contactPerson: user?.currentUser?.name || "",
    email: user?.currentUser?.email || "",
    phone: user?.currentUser?.phone || "",
    kraPin: user?.currentUser?.kraPin || "",
    businessAddress: user?.currentUser?.address || "",
    city: user?.currentUser?.city || "",
    region: user?.currentUser?.region || "",
    yearsInBusiness: "",
    currentSuppliers: "",
    monthlyVolume: ""
  });

  const [deliveryData, setDeliveryData] = useState({
    preferredDelivery: "pickup",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryRegion: "",
    deliveryInstructions: "",
    urgency: "normal"
  });

  const [businessRequirements, setBusinessRequirements] = useState({
    paymentTerms: "cash_on_delivery",
    creditTermsNeeded: false,
    requestedCreditDays: "",
    bulkDiscountNeeded: false,
    seasonalOrders: false,
    partnershipInterest: false,
    additionalServices: [],
    specialRequirements: ""
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBusinessChange = (e) => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeliveryChange = (e) => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value
    });
  };

  const handleRequirementsChange = (e) => {
    const { name, type, checked, value } = e.target;
    
    if (name === 'additionalServices') {
      const updatedServices = checked 
        ? [...businessRequirements.additionalServices, value]
        : businessRequirements.additionalServices.filter(service => service !== value);
      
      setBusinessRequirements({
        ...businessRequirements,
        additionalServices: updatedServices
      });
    } else {
      setBusinessRequirements({
        ...businessRequirements,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmitQuoteRequest = async () => {
    try {
      setIsSubmitting(true);
      
      const quoteRequest = {
        userId: user.currentUser._id,
        businessData,
        deliveryData,
        businessRequirements,
        products: cart.products,
        totalEstimatedValue: cart.products.reduce((total, p) => total + (p.wholesalePrice * p.quantity), 0),
        submittedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('Quote request submitted:', quoteRequest);
      alert('Wholesale quote request submitted successfully! Our team will contact you within 24 hours with a comprehensive quote and partnership details.');
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Business Info", icon: FaBuilding },
    { number: 2, title: "Delivery", icon: FaTruck },
    { number: 3, title: "Requirements", icon: FaFileInvoiceDollar },
    { number: 4, title: "Review", icon: FaClipboardCheck }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className={`bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            WHOLESALE QUOTE REQUEST
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            Complete your business information for a comprehensive wholesale quote
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
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className={`mt-2 text-sm font-light ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-px ml-4 ${isComplete ? 'bg-green-500' : isActive ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className={`lg:col-span-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              
              {/* Step 1: Business Information */}
              {activeStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaBuilding className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Business Information</h2>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Business Name *
                        </label>
                        <div className="relative">
                          <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            name="businessName"
                            value={businessData.businessName}
                            onChange={handleBusinessChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                            placeholder="Your registered business name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Business Type *
                        </label>
                        <select
                          name="businessType"
                          value={businessData.businessType}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                          required
                        >
                          <option value="">Select business type</option>
                          <option value="retail_shop">Retail Shop</option>
                          <option value="supermarket">Supermarket/Chain Store</option>
                          <option value="wholesaler">Wholesaler</option>
                          <option value="distributor">Distributor</option>
                          <option value="school">School/Educational Institution</option>
                          <option value="restaurant">Restaurant/Hotel</option>
                          <option value="pharmacy">Pharmacy/Chemist</option>
                          <option value="office_supplies">Office Supplies Store</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Contact Person *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            name="contactPerson"
                            value={businessData.contactPerson}
                            onChange={handleBusinessChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                            placeholder="Primary contact person"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Email Address *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            name="email"
                            value={businessData.email}
                            onChange={handleBusinessChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                            placeholder="business@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            name="phone"
                            value={businessData.phone}
                            onChange={handleBusinessChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                            placeholder="+254 700 000 000"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          KRA PIN (Optional)
                        </label>
                        <input
                          type="text"
                          name="kraPin"
                          value={businessData.kraPin}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                          placeholder="P051234567X"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Business Address *
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="businessAddress"
                          value={businessData.businessAddress}
                          onChange={handleBusinessChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                          placeholder="Street address, building name, floor"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          City/Town *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={businessData.city}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                          placeholder="City/Town"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Region/County *
                        </label>
                        <select
                          name="region"
                          value={businessData.region}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                          required
                        >
                          <option value="">Select region</option>
                          <option value="nairobi">Nairobi</option>
                          <option value="central">Central Kenya</option>
                          <option value="coast">Coast</option>
                          <option value="eastern">Eastern</option>
                          <option value="western">Western</option>
                          <option value="nyanza">Nyanza</option>
                          <option value="north_eastern">North Eastern</option>
                          <option value="rift_valley">Rift Valley</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                          Years in Business
                        </label>
                        <select
                          name="yearsInBusiness"
                          value={businessData.yearsInBusiness}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                        >
                          <option value="">Select</option>
                          <option value="less_than_1">Less than 1 year</option>
                          <option value="1_to_3">1-3 years</option>
                          <option value="3_to_5">3-5 years</option>
                          <option value="5_to_10">5-10 years</option>
                          <option value="more_than_10">More than 10 years</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Continue to Delivery Options
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: Delivery Information */}
              {activeStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaTruck className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Delivery Preferences</h2>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-light mb-4 tracking-wide uppercase text-sm">
                        Preferred Delivery Method *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="preferredDelivery"
                            value="pickup"
                            checked={deliveryData.preferredDelivery === "pickup"}
                            onChange={handleDeliveryChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Pickup from Warehouse</div>
                            <div className="text-sm text-gray-600 font-light">Collect orders from our Nairobi warehouse - No delivery charges</div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="preferredDelivery"
                            value="delivery_nairobi"
                            checked={deliveryData.preferredDelivery === "delivery_nairobi"}
                            onChange={handleDeliveryChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Delivery within Nairobi</div>
                            <div className="text-sm text-gray-600 font-light">Same day or next day delivery within Nairobi metropolitan area</div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="preferredDelivery"
                            value="delivery_kenya"
                            checked={deliveryData.preferredDelivery === "delivery_kenya"}
                            onChange={handleDeliveryChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Countrywide Delivery</div>
                            <div className="text-sm text-gray-600 font-light">Delivery anywhere in Kenya - 2-5 working days depending on location</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {(deliveryData.preferredDelivery === "delivery_nairobi" || deliveryData.preferredDelivery === "delivery_kenya") && (
                      <div className="space-y-6 p-6 bg-blue-50 rounded-xl">
                        <h3 className="font-medium text-gray-900 mb-4">Delivery Address Details</h3>
                        
                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Delivery Address
                          </label>
                          <div className="relative">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="deliveryAddress"
                              value={deliveryData.deliveryAddress}
                              onChange={handleDeliveryChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                              placeholder="Complete delivery address"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                              Delivery City/Town
                            </label>
                            <input
                              type="text"
                              name="deliveryCity"
                              value={deliveryData.deliveryCity}
                              onChange={handleDeliveryChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                              placeholder="Delivery city/town"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                              Delivery Region
                            </label>
                            <select
                              name="deliveryRegion"
                              value={deliveryData.deliveryRegion}
                              onChange={handleDeliveryChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                            >
                              <option value="">Select delivery region</option>
                              <option value="nairobi">Nairobi</option>
                              <option value="central">Central Kenya</option>
                              <option value="coast">Coast</option>
                              <option value="eastern">Eastern</option>
                              <option value="western">Western</option>
                              <option value="nyanza">Nyanza</option>
                              <option value="north_eastern">North Eastern</option>
                              <option value="rift_valley">Rift Valley</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Special Delivery Instructions
                          </label>
                          <textarea
                            name="deliveryInstructions"
                            value={deliveryData.deliveryInstructions}
                            onChange={handleDeliveryChange}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light resize-none"
                            placeholder="Access codes, landmarks, best delivery times, contact person at delivery location..."
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Delivery Urgency
                      </label>
                      <select
                        name="urgency"
                        value={deliveryData.urgency}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                      >
                        <option value="normal">Standard (5-7 working days)</option>
                        <option value="urgent">Urgent (2-3 working days)</option>
                        <option value="asap">ASAP (24-48 hours)</option>
                      </select>
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
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      >
                        Continue to Requirements
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Business Requirements */}
              {activeStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <FaFileInvoiceDollar className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Business Requirements</h2>
                  </div>

                  <form className="space-y-8">
                    <div>
                      <label className="block text-gray-700 font-light mb-4 tracking-wide uppercase text-sm">
                        Preferred Payment Terms
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentTerms"
                            value="cash_on_delivery"
                            checked={businessRequirements.paymentTerms === "cash_on_delivery"}
                            onChange={handleRequirementsChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <span className="font-light">Cash on Delivery (COD)</span>
                        </label>

                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentTerms"
                            value="advance_payment"
                            checked={businessRequirements.paymentTerms === "advance_payment"}
                            onChange={handleRequirementsChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <span className="font-light">Advance Payment (Bank Transfer/Mobile Money)</span>
                        </label>

                        <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentTerms"
                            value="credit_terms"
                            checked={businessRequirements.paymentTerms === "credit_terms"}
                            onChange={handleRequirementsChange}
                            className="w-4 h-4 text-blue-600 mr-4"
                          />
                          <span className="font-light">Credit Terms (For qualified businesses)</span>
                        </label>
                      </div>
                    </div>

                    {businessRequirements.paymentTerms === "credit_terms" && (
                      <div className="p-6 bg-yellow-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-4">Credit Terms Details</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-light mb-2 text-sm">
                              Requested Credit Period
                            </label>
                            <select
                              name="requestedCreditDays"
                              value={businessRequirements.requestedCreditDays}
                              onChange={handleRequirementsChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 font-light"
                            >
                              <option value="">Select credit period</option>
                              <option value="7">7 days</option>
                              <option value="14">14 days</option>
                              <option value="30">30 days</option>
                              <option value="45">45 days</option>
                              <option value="60">60 days</option>
                            </select>
                          </div>
                          <p className="text-sm text-yellow-700 font-light">
                            * Credit terms subject to business verification and approval
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Additional Business Interests</h4>
                      
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="bulkDiscountNeeded"
                          checked={businessRequirements.bulkDiscountNeeded}
                          onChange={handleRequirementsChange}
                          className="w-4 h-4 text-blue-600 mt-1"
                        />
                        <div>
                          <span className="font-light text-gray-900">Volume/Bulk Discount Pricing</span>
                          <p className="text-sm text-gray-600 font-light">Request special pricing for large volume orders</p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="seasonalOrders"
                          checked={businessRequirements.seasonalOrders}
                          onChange={handleRequirementsChange}
                          className="w-4 h-4 text-blue-600 mt-1"
                        />
                        <div>
                          <span className="font-light text-gray-900">Seasonal Order Planning</span>
                          <p className="text-sm text-gray-600 font-light">Advanced planning for peak seasons (back to school, holidays)</p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="partnershipInterest"
                          checked={businessRequirements.partnershipInterest}
                          onChange={handleRequirementsChange}
                          className="w-4 h-4 text-blue-600 mt-1"
                        />
                        <div>
                          <span className="font-light text-gray-900">Regional Distribution Partnership</span>
                          <p className="text-sm text-gray-600 font-light">Interest in becoming an authorized distributor in your region</p>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-4 tracking-wide uppercase text-sm">
                        Additional Services Needed
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { value: "product_training", label: "Product Training for Staff" },
                          { value: "marketing_materials", label: "Marketing Materials & POS" },
                          { value: "inventory_management", label: "Inventory Management Support" },
                          { value: "custom_packaging", label: "Custom Packaging/Branding" },
                          { value: "technical_support", label: "Technical Support" },
                          { value: "market_insights", label: "Market Insights & Trends" }
                        ].map((service) => (
                          <label key={service.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              name="additionalServices"
                              value={service.value}
                              checked={businessRequirements.additionalServices.includes(service.value)}
                              onChange={handleRequirementsChange}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="font-light text-gray-700 text-sm">{service.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Special Requirements & Notes
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={businessRequirements.specialRequirements}
                        onChange={handleRequirementsChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light resize-none"
                        placeholder="Any specific requirements, questions about products, special packaging needs, timeline constraints, or other details that would help us provide the best quote..."
                      />
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
                        onClick={() => setActiveStep(4)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      >
                        Review Request
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: Review Request */}
              {activeStep === 4 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaClipboardCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Review Your Request</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Business Information Summary */}
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-4">Business Information</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Business Name:</span>
                          <span className="ml-2 text-gray-600">{businessData.businessName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Business Type:</span>
                          <span className="ml-2 text-gray-600">{businessData.businessType.replace('_', ' ')}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Contact:</span>
                          <span className="ml-2 text-gray-600">{businessData.contactPerson}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-600">{businessData.email}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <span className="ml-2 text-gray-600">{businessData.phone}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Location:</span>
                          <span className="ml-2 text-gray-600">{businessData.city}, {businessData.region}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Information Summary */}
                    <div className="p-6 bg-blue-50 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-4">Delivery Preferences</h3>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Method:</span>
                          <span className="ml-2 text-gray-600">
                            {deliveryData.preferredDelivery === 'pickup' && 'Pickup from Warehouse'}
                            {deliveryData.preferredDelivery === 'delivery_nairobi' && 'Delivery within Nairobi'}
                            {deliveryData.preferredDelivery === 'delivery_kenya' && 'Countrywide Delivery'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Urgency:</span>
                          <span className="ml-2 text-gray-600">
                            {deliveryData.urgency === 'normal' && 'Standard (5-7 days)'}
                            {deliveryData.urgency === 'urgent' && 'Urgent (2-3 days)'}
                            {deliveryData.urgency === 'asap' && 'ASAP (24-48 hours)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Requirements Summary */}
                    <div className="p-6 bg-green-50 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-4">Business Requirements</h3>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Payment Terms:</span>
                          <span className="ml-2 text-gray-600">
                            {businessRequirements.paymentTerms.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        {businessRequirements.additionalServices.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-700">Additional Services:</span>
                            <span className="ml-2 text-gray-600">
                              {businessRequirements.additionalServices.join(', ').replace(/_/g, ' ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-light tracking-wide uppercase hover:border-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitQuoteRequest}
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-2xl font-light tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting Request...</span>
                          </div>
                        ) : (
                          'Submit Quote Request'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Quote Request Summary</h3>

                {/* Products Summary */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-medium text-gray-900">Products for Quote:</h4>
                  {cart.products?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-light text-gray-900">{item.title}</p>
                        <p className="text-gray-600 font-light">Qty: {item.quantity} (MOQ: {item.moq})</p>
                      </div>
                      <div className="text-gray-900 font-light">
                        KSh {(item.wholesalePrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estimated Totals */}
                <div className="space-y-3 pt-6 border-t border-gray-200 mb-8">
                  <div className="flex justify-between text-gray-600 font-light">
                    <span>Estimated Total</span>
                    <span>KSh {cart.products?.reduce((total, p) => total + (p.wholesalePrice * p.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    *Final pricing in official quote may vary based on current rates, bulk discounts, and special offers
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-medium text-blue-900 mb-4">Need Help?</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaPhone className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">+254 700 123 456</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">wholesale@rekker.co.ke</span>
                    </div>
                    <div className="text-xs text-blue-600 font-light mt-3">
                      Our wholesale team is available Monday-Friday, 8AM-6PM to assist with your quote request.
                    </div>
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