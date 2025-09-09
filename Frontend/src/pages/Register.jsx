/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
// pages/Register.jsx - Rekker Business Registration (Red Theme)
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Business Information
    businessName: "",
    businessType: "",
    kraPin: "",
    businessAddress: "",
    city: "",
    region: "",
    yearsInBusiness: "",
    
    // Additional Info
    currentSuppliers: "",
    monthlyVolume: "",
    productInterests: [],
    hearAboutUs: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'productInterests') {
      const updatedInterests = checked 
        ? [...formData.productInterests, value]
        : formData.productInterests.filter(interest => interest !== value);
      
      setFormData({
        ...formData,
        productInterests: updatedInterests
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.businessName || !formData.businessType || !formData.businessAddress || !formData.city || !formData.region) {
      toast.error("Please fill in all required business information");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const registrationData = {
        ...formData,
        accountType: 'wholesale',
        registrationDate: new Date().toISOString()
      };
      
      await userRequest.post("/auth/register-business", registrationData);
      
      toast.success("Business registration submitted! We'll review your application and contact you within 2 business days.", {
        style: {
          background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
          color: '#f8f8f8',
          border: '1px solid #ef4444',
        }
      });
      
      setTimeout(() => navigate("/login"), 3000);
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          style: {
            background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
            color: '#f8f8f8',
            border: '1px solid #ef4444',
          }
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          style: {
            background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
            color: '#f8f8f8',
            border: '1px solid #ef4444',
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const productCategories = [
    { value: "stationery", label: "Stationery & Office Supplies" },
    { value: "bags", label: "School Bags & Luggage" },
    { value: "toys", label: "Toys & Educational Items" },
    { value: "kitchenware", label: "Kitchenware & Utensils" },
    { value: "security", label: "Padlocks & Security" },
    { value: "party", label: "Party Supplies" },
    { value: "saffron", label: "Saffron Personal Care" },
    { value: "cornells", label: "Cornells Beauty Products" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-300/20 to-transparent"></div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />

      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="flex relative z-10">
          {/* Form Section */}
          <div className="w-full lg:w-2/3 p-12 lg:p-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-white mb-4 tracking-wider">Join Rekker</h1>
              <p className="text-gray-300 text-lg font-light">Apply for wholesale partnership</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-6"></div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-20 h-px mx-4 ${
                      currentStep > step ? 'bg-red-600' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-white mb-2">Personal Information</h2>
                    <p className="text-gray-400 font-light">Contact details for the account holder</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="business@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="+254 700 000 000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-light tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Continue to Business Information
                  </button>
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-white mb-2">Business Information</h2>
                    <p className="text-gray-400 font-light">Details about your business</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your registered business name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Business Type *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        KRA PIN (Optional)
                      </label>
                      <input
                        type="text"
                        name="kraPin"
                        value={formData.kraPin}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="P051234567X"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Years in Business
                      </label>
                      <select
                        name="yearsInBusiness"
                        value={formData.yearsInBusiness}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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

                  <div className="space-y-2">
                    <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                      Business Address *
                    </label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Street address, building name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        City/Town *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="City/Town"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 text-sm font-light tracking-wide uppercase">
                        Region/County *
                      </label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-900 focus:outline-none focus:border-red-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-4 border-2 border-white/20 text-white rounded-xl font-light tracking-wide uppercase hover:border-white/40 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="flex-1 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-light tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                      <span className="relative z-10">
                        {loading ? "Submitting Application..." : "Submit Application"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="px-6 text-gray-400 font-light text-sm">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              <p className="text-gray-300 font-light mb-4">
                Already have an account?{" "}
                <Link to="/login" className="text-red-400 hover:text-red-300 transition-colors font-normal">
                  Sign in here
                </Link>
              </p>

              {/* Contact Information */}
              <div className="mt-8 text-center">
                <div className="text-sm text-gray-400 font-light">
                  <p className="mb-2">Need assistance with your application?</p>
                  <div className="flex items-center justify-center space-x-4">
                    <span>📞 +254 700 123 456</span>
                    <span>✉️ wholesale@rekker.co.ke</span>
                  </div>
                  <p className="mt-2 text-xs">Business Hours: Mon-Fri 8AM-6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sidebar */}
          <div className="hidden lg:flex w-1/3 relative overflow-hidden bg-white/5">
            <div className="p-12 flex flex-col justify-center">
              <div className="text-center text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 tracking-wider">REKKER</h3>
                <p className="text-lg font-light opacity-80 mb-2">Quality Products Since 2009</p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-white font-medium mb-3">Wholesale Benefits</h4>
                  <div className="text-sm text-gray-300 font-light space-y-2 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span>Competitive wholesale pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                      <span>Minimum order quantities (MOQ)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Dedicated account management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      <span>Flexible payment terms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-rose-600 rounded-full"></span>
                      <span>Marketing support materials</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-medium mb-3">Our Product Range</h4>
                  <div className="text-sm text-gray-300 font-light space-y-1">
                    <p>🗂️ Stationery & Office Supplies</p>
                    <p>🎒 School Bags & Luggage</p>
                    <p>🧸 Toys & Educational Items</p>
                    <p>🍴 Kitchenware & Utensils</p>
                    <p>🔒 Security & Padlocks</p>
                    <p>🎉 Party Supplies</p>
                    <p>🧴 Saffron Personal Care</p>
                    <p>💄 Cornells Beauty Products</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-medium mb-3">Application Process</h4>
                  <div className="text-sm text-gray-300 font-light space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                      <span>Submit application</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                      <span>Business verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                      <span>Account approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
                      <span>Start ordering</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Typical approval time: 2-3 business days
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-400 font-light">
                    <p className="mb-2">Questions about wholesale partnership?</p>
                    <div className="space-y-1">
                      <div>📞 +254 700 123 456</div>
                      <div>✉️ wholesale@rekker.co.ke</div>
                    </div>
                    <p className="mt-2 text-xs">Business Hours: Mon-Fri 8AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-toast-container {
          font-family: inherit;
        }
        .custom-toast-container .Toastify__toast {
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Register;