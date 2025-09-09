/* eslint-disable react/no-unescaped-entities */
// pages/WholesaleRequest.jsx - Professional Wholesale Request Form with Red Theme
import { useState, useEffect } from "react";
import { 
  FaTruck, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaIndustry, FaShoppingCart, FaCheckCircle, FaClipboardList,
  FaCalculator, FaHandshake, FaAward, FaClock
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WholesaleRequest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessLicense: '',
    yearsInBusiness: '',
    
    // Contact Information
    contactPerson: '',
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
    deliveryRequirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Form validation
  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.businessName && formData.businessType && formData.contactPerson;
      case 2:
        return formData.email && formData.phone && formData.county;
      case 3:
        return formData.targetMarket && formData.estimatedMonthlyVolume && formData.interestedBrands.length > 0;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  // Handle form input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Wholesale request submitted successfully! Our team will contact you within 24 hours.", {
        position: "top-right",
        autoClose: 5000,
        className: "bg-red-50 text-red-800",
        progressClassName: "bg-red-600",
      });
      
      // Reset form
      setFormData({
        businessName: '',
        businessType: '',
        businessLicense: '',
        yearsInBusiness: '',
        contactPerson: '',
        email: '',
        phone: '',
        alternativePhone: '',
        physicalAddress: '',
        county: '',
        town: '',
        currentSuppliers: '',
        targetMarket: '',
        estimatedMonthlyVolume: '',
        interestedBrands: [],
        specificProducts: '',
        additionalRequirements: '',
        preferredPaymentTerms: '',
        deliveryRequirements: ''
      });
      setCurrentStep(1);
      
    } catch (error) {
      toast.error("Failed to submit request. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        className: "bg-red-50 text-red-800",
        progressClassName: "bg-red-600",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Business types
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

  // Counties in Kenya
  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi",
    "Kitale", "Garissa", "Moyale", "Wajir", "Marsabit", "Isiolo", "Meru",
    "Embu", "Machakos", "Makueni", "Kitui", "Murang'a", "Nyeri", "Kirinyaga",
    "Nyandarua", "Laikipia", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet",
    "Nandi", "Baringo", "Turkana", "West Pokot", "Kajiado", "Narok", "Bomet",
    "Kericho", "Nyamira", "Kisii", "Migori", "Homa Bay", "Siaya", "Busia",
    "Vihiga", "Kakamega", "Bungoma", "Tharaka Nithi", "Taita Taveta", "Kwale", "Kilifi"
  ];

  // Step navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.warning("Please fill in all required fields before proceeding.", {
        className: "bg-rose-50 text-rose-800",
        progressClassName: "bg-rose-500",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Benefits of partnering with Rekker
  const benefits = [
    {
      icon: FaAward,
      title: "Quality Guaranteed",
      description: "All products meet international quality standards with full warranty support"
    },
    {
      icon: FaTruck,
      title: "Reliable Delivery", 
      description: "Nationwide distribution network ensuring timely delivery to all counties"
    },
    {
      icon: FaHandshake,
      title: "Flexible Terms",
      description: "Competitive wholesale pricing with flexible payment and delivery terms"
    },
    {
      icon: FaClock,
      title: "Quick Response",
      description: "24-hour response time for all wholesale inquiries and support requests"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-rose-50/10">
      <ToastContainer />
      
      {/* Hero Section */}
      <div className={`relative py-20 bg-gradient-to-r from-red-900 via-red-800 to-red-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FaTruck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-wide">Wholesale Partnership</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-rose-400 mx-auto mb-8"></div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Join our network of successful wholesale partners and access premium products at competitive prices 
            with professional support and reliable service.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <section className={`py-16 bg-white transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with Rekker?</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center group hover:shadow-lg rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={`py-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header with Progress */}
              <div className="bg-gradient-to-r from-red-600 to-rose-600 p-8">
                <div className="text-center text-white mb-8">
                  <h2 className="text-3xl font-bold mb-2">Wholesale Request Form</h2>
                  <p className="text-red-100">Complete the form below to get wholesale pricing</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step <= currentStep ? 'bg-white text-red-600' : 'bg-red-400 text-white'
                      }`}>
                        {step < currentStep ? <FaCheckCircle /> : step}
                      </div>
                      {step < totalSteps && (
                        <div className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-white' : 'bg-red-400'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-red-100">
                  <span>Business Info</span>
                  <span>Contact Details</span>
                  <span>Requirements</span>
                  <span>Additional Info</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Business Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaBuilding className="w-12 h-12 text-red-600 mx-auto mb-4" />
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Enter your business name"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select business type</option>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Enter license number"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Years in Business
                        </label>
                        <select
                          name="yearsInBusiness"
                          value={formData.yearsInBusiness}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select years</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="More than 10 years">More than 10 years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter contact person's name"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaUser className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact & Location Details</h3>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="your.email@example.com"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
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
                          Town/City
                        </label>
                        <input
                          type="text"
                          name="town"
                          value={formData.town}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Enter town or city"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Physical Address
                      </label>
                      <textarea
                        name="physicalAddress"
                        value={formData.physicalAddress}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder="Enter your business physical address"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Business Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaShoppingCart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Requirements</h3>
                      <p className="text-gray-600">What are you looking for?</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-4">
                        Interested Brands *
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="interestedBrands"
                            value="Saffron"
                            checked={formData.interestedBrands.includes('Saffron')}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-900">Saffron Products</span>
                            <p className="text-sm text-gray-600">Cleaning & Personal Care</p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="interestedBrands"
                            value="Cornells"
                            checked={formData.interestedBrands.includes('Cornells')}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-900">Cornells Products</span>
                            <p className="text-sm text-gray-600">Beauty & Skincare</p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="interestedBrands"
                            value="Rekker General"
                            checked={formData.interestedBrands.includes('Rekker General')}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-900">Rekker General Products</span>
                            <p className="text-sm text-gray-600">Stationery, Toys, Kitchenware</p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="interestedBrands"
                            value="All Products"
                            checked={formData.interestedBrands.includes('All Products')}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-900">All Products</span>
                            <p className="text-sm text-gray-600">Complete product range</p>
                          </div>
                        </label>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select target market</option>
                          <option value="Direct Consumers">Direct Consumers</option>
                          <option value="Retail Stores">Retail Stores</option>
                          <option value="Institutions">Institutions</option>
                          <option value="Hotels/Hospitality">Hotels/Hospitality</option>
                          <option value="Online Sales">Online Sales</option>
                          <option value="Export">Export</option>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select volume range</option>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder="List specific products you're interested in..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Current Suppliers
                      </label>
                      <input
                        type="text"
                        name="currentSuppliers"
                        value={formData.currentSuppliers}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Who do you currently buy from?"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Information */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FaClipboardList className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h3>
                      <p className="text-gray-600">Help us serve you better</p>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select payment terms</option>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select delivery preference</option>
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
                        Additional Requirements or Comments
                      </label>
                      <textarea
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder="Any special requirements, questions, or comments..."
                      />
                    </div>

                    <div className="bg-red-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3">What happens next?</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaCheckCircle className="w-4 h-4 text-red-500 mr-2" />
                          <span>Our team reviews your application within 24 hours</span>
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="w-4 h-4 text-red-500 mr-2" />
                          <span>We contact you to discuss pricing and terms</span>
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="w-4 h-4 text-red-500 mr-2" />
                          <span>Partnership agreement and first order setup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
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
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="w-5 h-5" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className={`py-16 bg-gradient-to-r from-red-900 via-red-800 to-red-900 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need Help with Your Application?</h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Our wholesale team is ready to assist you with any questions about products, pricing, or partnership opportunities.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-red-100">+254 700 000 000</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-red-100">wholesale@rekker.co.ke</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Business Hours</h3>
                <p className="text-red-100">Mon-Fri: 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WholesaleRequest;