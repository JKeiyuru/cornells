// components/Footer.jsx - Rekker Professional Company Footer
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">REKKER</h3>
              <p className="text-blue-200 font-light leading-relaxed">
                Kenya's leading manufacturer and distributor of quality consumer products. 
                From stationery to personal care, we deliver excellence across all categories.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-200">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors font-light">
                  About Rekker
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors font-light">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors font-light">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/distributors" className="text-gray-300 hover:text-white transition-colors font-light">
                  Distributors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors font-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-200">Our Brands</h4>
            <div className="space-y-4">
              <div>
                <Link to="/saffron" className="block group">
                  <h5 className="text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                    Saffron
                  </h5>
                  <p className="text-gray-400 text-sm font-light">
                    Manufactured by Rekker
                  </p>
                  <p className="text-gray-400 text-sm font-light">
                    Personal care & cleaning products
                  </p>
                </Link>
              </div>
              <div>
                <Link to="/cornells" className="block group">
                  <h5 className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    Cornells
                  </h5>
                  <p className="text-gray-400 text-sm font-light">
                    Distributed by Rekker
                  </p>
                  <p className="text-gray-400 text-sm font-light">
                    Premium beauty & skincare
                  </p>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-blue-200 font-medium mb-3">Product Categories</h5>
              <ul className="text-sm text-gray-400 space-y-1 font-light">
                <li>Stationery & Office Supplies</li>
                <li>School Bags & Luggage</li>
                <li>Toys & Educational Items</li>
                <li>Kitchenware & Utensils</li>
                <li>Security & Padlocks</li>
                <li>Party Supplies & Decorations</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-200">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Head Office</p>
                  <p className="text-gray-300 font-light text-sm">
                    Industrial Area, Nairobi<br />
                    P.O. Box 12345-00100<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-300 font-light text-sm">+254 700 123 456</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 font-light text-sm">info@rekker.co.ke</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="text-blue-200 font-medium mb-3">Business Hours</h5>
              <div className="text-sm text-gray-400 space-y-1 font-light">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Quality Badges */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 lg:mb-0">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-xs">ISO</span>
                </div>
                <p className="text-xs text-gray-400">Certified</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-xs">KEBS</span>
                </div>
                <p className="text-xs text-gray-400">Approved</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-xs">15+</span>
                </div>
                <p className="text-xs text-gray-400">Years</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-blue-200 font-medium mb-2">Wholesale Inquiries</p>
              <p className="text-lg font-bold text-white">+254 700 123 456</p>
              <p className="text-sm text-gray-400">sales@rekker.co.ke</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-900/80 border-t border-blue-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 font-light mb-4 md:mb-0">
              © 2024 Rekker Limited. All rights reserved. | Manufacturer & Distributor of Quality Products
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-light">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors font-light">
                Terms of Service
              </Link>
              <Link to="/wholesale-terms" className="text-gray-400 hover:text-white transition-colors font-light">
                Wholesale Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;