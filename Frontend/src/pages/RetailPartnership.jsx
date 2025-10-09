/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// pages/RetailPartnership.jsx - Comprehensive Retail Partnership Application
import { useState, useEffect } from "react";
import { 
  FaHandshake, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaIndustry, FaShoppingCart, FaCheckCircle, FaClipboardList,
  FaCalculator, FaAward, FaClock, FaTruck, FaUsers, FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RetailPartnership = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessLicense: '',
    yearsInBusiness: '',
    taxPin: '',
    
    // Contact Information
    contactPerson: '',
    position: '',
    email: '',
    phone: '',
    alternativePhone: '',
    
    // Location Information
    physicalAddress: '',
    county: '',
    town: '',
    
    // Business Details
    currentSuppliers: '',
    targetMarket: '',
    estimatedMonthlyVolume: '',
    
    // Product Interest
    interestedBrands: [],
    specificProducts: '',
    
    // Additional Information
    additionalRequirements: '',
    preferredPaymentTerms: '',
    deliveryRequirements: '',
    
    // References
    businessReference1: '',
    businessReference2: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const businessTypes = [
    "Supermarket/Retail Chain",
    "Pharmacy",
    "Beauty Salon/Spa",
    "General Store/Kiosk",
    "Distributor/Wholesaler",
    "Online Retailer",
    "Hotel/Hospitality",
    "Institution/School",
    "Other"
  ];

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi",
    "Kitale", "Garissa", "Moyale", "Wajir", "Marsabit", "Isiolo", "Meru",
    "Embu", "Machakos", "Makueni", "Kitui", "Murang'a", "Nyeri", "Kirinyaga",
    "Nyandarua", "Laikipia", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet",
    "Nandi", "Baringo", "Turkana", "West Pokot", "Kajiado", "Narok", "Bomet",
    "Kericho", "Nyamira", "Kisii", "Migori", "Homa Bay", "Siaya", "Busia",
    "Vihiga", "Kakamega", "Bungoma", "Tharaka Nithi", "Taita Taveta", "Kwale", "Kilifi"
  ];

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.businessName && formData.businessType && formData.contactPerson && formData.yearsInBusiness;
      case 2:
        return formData.email && formData.phone && formData.county && formData.town;
      case 3:
        return formData.targetMarket && formData.estimatedMonthlyVolume && formData.interestedBrands.length > 0;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interestedBrands: checked 
          ? [...prev.interestedBrands, value]
          : prev.interestedBrands.filter(brand => brand !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Partnership application submitted! We'll review and contact you within 48 hours.", {
        position: "top-right",
        autoClose: 5000,
      });
      
      // Reset form
      setFormData({
        businessName: '', businessType: '', businessLicense: '', yearsInBusiness: '', taxPin: '',
        contactPerson: '', position: '', email: '', phone: '', alternativePhone: '',
        physicalAddress: '', county: '', town: '',
        currentSuppliers: '', targetMarket: '', estimatedMonthlyVolume: '',
        interestedBrands: [], specificProducts: '',
        additionalRequirements: '', preferredPaymentTerms: '', deliveryRequirements: '',
        businessReference1: '', businessReference2: ''
      });
      setCurrentStep(1);
      
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.warning("Please fill in all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const benefits = [
    {
      icon: FaAward,
      title: "Exclusive Benefits",
      description: "Priority access to new products and special promotions"
    },
    {
      icon: FaTruck,
      title: "Reliable Supply",
      description: "Consistent stock availability with dedicated account management"
    },
    {
      icon: FaChartLine,
      title: "Growth Support",
      description: "Marketing materials and business development assistance"
    },
    {
      icon: FaClock,
      title: "Flexible Terms",
      description: "Customized payment and delivery options for partners"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      <ToastContainer />
      
      {/* Hero Section */}
      <div className={`relative py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FaHandshake className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Become a Retail Partner</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto mb-8"></div>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join our exclusive network of retail partners and grow your business with premium products, competitive pricing, and dedicated support.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <section className={`py-16 bg-white transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Benefits</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center group hover:shadow-xl rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={`py-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header with Progress */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
                <div className="text-center text-white mb-8">
                  <h2 className="text-3xl font-bold mb-2">Partnership Application</h2>
                  <p className="text-purple-100">Complete all steps to become a retail partner</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step <= currentStep ? 'bg-white text-purple-600' : 'bg-purple-400 text-white'
                      }`}>
                        {step < currentStep ? <FaCheckCircle /> : step}
                      </div>
                      {step < totalSteps && (
                        <div className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-white' : 'bg-purple-400'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-purple-100">
                  <span>Business Info</span>
                  <span>Contact & Location</span>
                  <span>Requirements</span>
                  <span>Final Details</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Business Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaBuilding className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h3>
                      <p className="text-gray-600">Tell us about your business</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter business name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Business Type *
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Business License Number
                        </label>
                        <input
                          type="text"
                          name="businessLicense"
                          value={formData.businessLicense}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="License number"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          KRA PIN Number
                        </label>
                        <input
                          type="text"
                          name="taxPin"
                          value={formData.taxPin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="KRA PIN"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Years in Business *
                        </label>
                        <select
                          name="yearsInBusiness"
                          value={formData.yearsInBusiness}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select years</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="More than 10 years">More than 10 years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Position/Title
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Owner, Manager, Director"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact & Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaUser className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact & Location</h3>
                      <p className="text-gray-600">How can we reach you?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="+254 700 000 000"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Alternative Phone
                        </label>
                        <input
                          type="tel"
                          name="alternativePhone"
                          value={formData.alternativePhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="+254 700 000 001"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          County *
                        </label>
                        <select
                          name="county"
                          value={formData.county}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select county</option>
                          {counties.map((county) => (
                            <option key={county} value={county}>{county}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Town/City *
                        </label>
                        <input
                          type="text"
                          name="town"
                          value={formData.town}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter town"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Physical Address *
                      </label>
                      <textarea
                        name="physicalAddress"
                        value={formData.physicalAddress}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Enter complete business address"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Business Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaShoppingCart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Requirements</h3>
                      <p className="text-gray-600">What are you looking for?</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-4">
                        Interested Brands *
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {['Saffron Products', 'Cornells Products', 'Rekker General Products', 'All Products'].map((brand) => (
                          <label key={brand} className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-xl hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all">
                            <input
                              type="checkbox"
                              name="interestedBrands"
                              value={brand}
                              checked={formData.interestedBrands.includes(brand)}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <span className="font-semibold text-gray-900">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Target Market *
                        </label>
                        <select
                          name="targetMarket"
                          value={formData.targetMarket}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select market</option>
                          <option value="Direct Consumers">Direct Consumers</option>
                          <option value="Retail Stores">Retail Stores</option>
                          <option value="Institutions">Institutions</option>
                          <option value="Hotels/Hospitality">Hotels/Hospitality</option>
                          <option value="Online Sales">Online Sales</option>
                          <option value="Mixed">Mixed Market</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Estimated Monthly Volume *
                        </label>
                        <select
                          name="estimatedMonthlyVolume"
                          value={formData.estimatedMonthlyVolume}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select volume</option>
                          <option value="Less than KES 50,000">Less than KES 50,000</option>
                          <option value="KES 50,000 - 100,000">KES 50,000 - 100,000</option>
                          <option value="KES 100,000 - 500,000">KES 100,000 - 500,000</option>
                          <option value="KES 500,000 - 1,000,000">KES 500,000 - 1,000,000</option>
                          <option value="More than KES 1,000,000">More than KES 1,000,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Specific Products of Interest
                      </label>
                      <textarea
                        name="specificProducts"
                        value={formData.specificProducts}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="List specific products..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Current Suppliers (if any)
                      </label>
                      <input
                        type="text"
                        name="currentSuppliers"
                        value={formData.currentSuppliers}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Current suppliers"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaClipboardList className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Additional Details</h3>
                      <p className="text-gray-600">Almost done!</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Preferred Payment Terms
                        </label>
                        <select
                          name="preferredPaymentTerms"
                          value={formData.preferredPaymentTerms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select terms</option>
                          <option value="Cash on Delivery">Cash on Delivery</option>
                          <option value="30 Days Credit">30 Days Credit</option>
                          <option value="60 Days Credit">60 Days Credit</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Mobile Money">Mobile Money</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Delivery Requirements
                        </label>
                        <select
                          name="deliveryRequirements"
                          value={formData.deliveryRequirements}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select preference</option>
                          <option value="Weekly Delivery">Weekly Delivery</option>
                          <option value="Bi-weekly Delivery">Bi-weekly Delivery</option>
                          <option value="Monthly Delivery">Monthly Delivery</option>
                          <option value="On-demand Delivery">On-demand Delivery</option>
                          <option value="Self Collection">Self Collection</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Business Reference 1 (Optional)
                      </label>
                      <input
                        type="text"
                        name="businessReference1"
                        value={formData.businessReference1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Name and contact of business reference"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Business Reference 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="businessReference2"
                        value={formData.businessReference2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Name and contact of business reference"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Additional Requirements
                      </label>
                      <textarea
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Any additional information..."
                      />
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-purple-600" />
                        Next Steps
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>✓ Application review within 48 hours</p>
                        <p>✓ Account manager assigned to your business</p>
                        <p>✓ Partnership agreement and terms discussion</p>
                        <p>✓ First order setup and delivery</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-8 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      currentStep === 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="w-5 h-5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Quick Order Link */}
              <div className="mt-8 text-center pb-8">
                <p className="text-gray-600 mb-4">
                  Need to place a quick order instead?
                </p>
                <Link
                  to="/wholesale-request"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span>Place Wholesale Order</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Questions About Partnership?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Our partnership team is here to help
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <FaPhone className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-purple-100">+254 700 000 000</p>
                <p className="text-sm text-purple-200 mt-2">Mon-Fri: 8AM-6PM</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <FaEnvelope className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-purple-100">partnerships@rekker.co.ke</p>
                <p className="text-sm text-purple-200 mt-2">24-hour response</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <FaUsers className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                <p className="text-purple-100">Nairobi Office</p>
                <p className="text-sm text-purple-200 mt-2">By appointment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailPartnership;