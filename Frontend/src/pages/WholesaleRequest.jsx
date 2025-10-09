/* eslint-disable react/no-unescaped-entities */
// pages/WholesaleRequest.jsx - Simplified Wholesale Request Form
import { useState, useEffect } from "react";
import { 
  FaTruck, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaShoppingCart, FaCheckCircle, FaBoxes, FaHandshake
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WholesaleRequest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    county: '',
    town: '',
    productDetails: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi",
    "Kitale", "Garissa", "Moyale", "Wajir", "Marsabit", "Isiolo", "Meru",
    "Embu", "Machakos", "Makueni", "Kitui", "Murang'a", "Nyeri", "Kirinyaga",
    "Nyandarua", "Laikipia", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet",
    "Nandi", "Baringo", "Turkana", "West Pokot", "Kajiado", "Narok", "Bomet",
    "Kericho", "Nyamira", "Kisii", "Migori", "Homa Bay", "Siaya", "Busia",
    "Vihiga", "Kakamega", "Bungoma", "Tharaka Nithi", "Taita Taveta", "Kwale", "Kilifi"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Request submitted successfully! We'll contact you within 24 hours.", {
        position: "top-right",
        autoClose: 5000,
      });
      
      // Reset form
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        county: '',
        town: '',
        productDetails: '',
        additionalNotes: ''
      });
      
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      <ToastContainer />
      
      {/* Hero Section */}
      <div className={`relative py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FaShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-wide">Wholesale Order Request</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-8"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Request a quote for wholesale products. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Quick Benefits */}
      <section className={`py-12 bg-white transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTruck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Nationwide shipping within 48 hours</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Premium products guaranteed</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaBoxes className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Competitive Pricing</h3>
              <p className="text-sm text-gray-600">Best wholesale rates available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={`py-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Request Wholesale Quote</h2>
                <p className="text-blue-100">Simple & Fast - We'll call you with details</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Business Information */}
                <div className="space-y-6">
                  <div className="text-center">
                    <FaBuilding className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900">Business Details</h3>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6 space-y-6">
                  <div className="text-center">
                    <FaUser className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+254 700 000 000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6 space-y-6">
                  <div className="text-center">
                    <FaMapMarkerAlt className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900">Location</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        County *
                      </label>
                      <select
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter town or city"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6 space-y-6">
                  <div className="text-center">
                    <FaBoxes className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      What products are you interested in? *
                    </label>
                    <textarea
                      name="productDetails"
                      value={formData.productDetails}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Please specify the products, quantities, and any specific requirements..."
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Example: "100 bottles of Saffron Hand Wash (Lavender), 50 bottles of Cornells Body Lotion"
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Any additional information or questions..."
                    />
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600" />
                    What happens next?
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">1.</span>
                      <span>We'll review your request within 24 hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <span>Our sales team will call you to discuss pricing and availability</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">3.</span>
                      <span>We'll arrange delivery and payment terms</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="w-6 h-6" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to be contacted by our sales team
                </p>
              </form>
            </div>

            {/* Partnership Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Want to become a regular retailer partner?
              </p>
              <Link
                to="/retail-partnership"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaHandshake className="w-5 h-5" />
                <span>Apply for Retail Partnership</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our wholesale team is ready to help you
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <FaPhone className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-blue-100">+254 700 000 000</p>
                <p className="text-sm text-blue-200 mt-2">Mon-Fri: 8AM-6PM</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <FaEnvelope className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-blue-100">wholesale@rekker.co.ke</p>
                <p className="text-sm text-blue-200 mt-2">24-hour response time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WholesaleRequest;