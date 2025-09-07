/* eslint-disable react/no-unescaped-entities */
// pages/Account.jsx - Rekker Wholesale Account Dashboard
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaClipboardList, FaTruck, FaChartLine } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    kraPin: "",
    address: "",
    city: "",
    region: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Mock wholesale orders data
  const [orders] = useState([
    {
      id: "WO-2024-001",
      date: "2024-01-15",
      products: [
        { name: "Saffron Handwash 500ml", qty: 50, unitPrice: 180 },
        { name: "Cornells Body Lotion 250ml", qty: 30, unitPrice: 450 }
      ],
      totalAmount: 22500,
      status: "Delivered",
      deliveryDate: "2024-01-18"
    },
    {
      id: "WO-2024-002", 
      date: "2024-01-28",
      products: [
        { name: "A4 Photocopy Paper (500 sheets)", qty: 100, unitPrice: 650 }
      ],
      totalAmount: 65000,
      status: "Processing",
      deliveryDate: "Expected: 2024-02-02"
    }
  ]);

  useEffect(() => {
    setIsLoaded(true);
    if (user.currentUser) {
      setFormData({
        name: user.currentUser.name || "",
        email: user.currentUser.email || "",
        phone: user.currentUser.phone || "",
        businessName: user.currentUser.businessName || "",
        businessType: user.currentUser.businessType || "",
        kraPin: user.currentUser.kraPin || "",
        address: user.currentUser.address || "",
        city: user.currentUser.city || "",
        region: user.currentUser.region || ""
      });
    }
  }, [user.currentUser]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    try {
      // API call to update profile would go here
      toast.success("Business profile updated successfully!", {
        style: {
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: '#f8f8f8',
          border: '1px solid #3b82f6',
        }
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    try {
      // API call to change password would go here
      toast.success("Password changed successfully!", {
        style: {
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: '#f8f8f8',
          border: '1px solid #3b82f6',
        }
      });
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    toast.info("You have been logged out", {
      style: {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: '#f8f8f8',
        border: '1px solid #3b82f6',
      }
    });
  };

  if (!user.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Please log in to access your wholesale account</h2>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-yellow-600 bg-yellow-50';
      case 'Pending': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20">
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

      {/* Header */}
      <div className={`bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            Welcome, {user.currentUser.name}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            Manage your Rekker wholesale account
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide">Account Menu</h3>
                <nav className="space-y-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-light transition-colors ${
                      activeTab === 'profile' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <FaUser className="w-4 h-4" />
                    <span>Business Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-light transition-colors ${
                      activeTab === 'orders' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <FaClipboardList className="w-4 h-4" />
                    <span>Order History</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-light transition-colors ${
                      activeTab === 'requests' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <FaTruck className="w-4 h-4" />
                    <span>Quote Requests</span>
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-light"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className={`lg:col-span-3 space-y-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              
              {/* Business Profile Tab */}
              {activeTab === 'profile' && (
                <>
                  {/* Business Information */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-light text-gray-900 tracking-wide">Business Information</h2>
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-light"
                        >
                          {isEditing ? <FaTimes className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
                          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Business Name
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Your business name"
                              className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                                isEditing 
                                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                  : 'bg-gray-50 cursor-not-allowed'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Business Type
                          </label>
                          <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border border-gray-200 rounded-xl font-light ${
                              isEditing 
                                ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                : 'bg-gray-50 cursor-not-allowed'
                            }`}
                          >
                            <option value="">Select business type</option>
                            <option value="retail_shop">Retail Shop</option>
                            <option value="supermarket">Supermarket</option>
                            <option value="wholesaler">Wholesaler</option>
                            <option value="distributor">Distributor</option>
                            <option value="school">School/Institution</option>
                            <option value="restaurant">Restaurant/Hotel</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Contact Person
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                                isEditing 
                                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                  : 'bg-gray-50 cursor-not-allowed'
                              }`}
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
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                                isEditing 
                                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                  : 'bg-gray-50 cursor-not-allowed'
                              }`}
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
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="+254 700 000 000"
                              className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                                isEditing 
                                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                  : 'bg-gray-50 cursor-not-allowed'
                              }`}
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
                            value={formData.kraPin}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="P051234567X"
                            className={`w-full px-4 py-3 border border-gray-200 rounded-xl font-light ${
                              isEditing 
                                ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                : 'bg-gray-50 cursor-not-allowed'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Business Address
                          </label>
                          <div className="relative">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Street address, building name"
                              className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                                isEditing 
                                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                  : 'bg-gray-50 cursor-not-allowed'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            City/Town
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="City/Town"
                            className={`w-full px-4 py-3 border border-gray-200 rounded-xl font-light ${
                              isEditing 
                                ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                : 'bg-gray-50 cursor-not-allowed'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                            Region/County
                          </label>
                          <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border border-gray-200 rounded-xl font-light ${
                              isEditing 
                                ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                : 'bg-gray-50 cursor-not-allowed'
                            }`}
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

                      {isEditing && (
                        <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-light tracking-wide hover:border-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                          >
                            <FaSave className="w-4 h-4" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-light text-gray-900 tracking-wide">Security Settings</h2>
                        <button
                          onClick={() => setIsChangingPassword(!isChangingPassword)}
                          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-light"
                        >
                          {isChangingPassword ? <FaTimes className="w-4 h-4" /> : <FaLock className="w-4 h-4" />}
                          <span>{isChangingPassword ? 'Cancel' : 'Change Password'}</span>
                        </button>
                      </div>

                      {isChangingPassword ? (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                              Current Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                                placeholder="Enter current password"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                              New Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                              onClick={() => {
                                setIsChangingPassword(false);
                                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                              }}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-light tracking-wide hover:border-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleChangePassword}
                              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaLock className="w-8 h-8 text-blue-600" />
                          </div>
                          <p className="text-gray-600 font-light">
                            Your password was last updated on January 15, 2024
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Account Statistics */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                      <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Account Statistics</h2>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl">
                          <div className="text-3xl font-light text-blue-600 mb-2">8</div>
                          <div className="text-gray-600 font-light">Total Orders</div>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                          <div className="text-3xl font-light text-green-600 mb-2">KSh 184K</div>
                          <div className="text-gray-600 font-light">Total Purchases</div>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                          <div className="text-3xl font-light text-yellow-600 mb-2">Gold</div>
                          <div className="text-gray-600 font-light">Partner Status</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-light text-gray-900 tracking-wide">Order History</h2>
                      <div className="flex items-center space-x-2">
                        <FaChartLine className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-600 font-light">Total: {orders.length} orders</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-1">Order #{order.id}</h3>
                              <p className="text-gray-600 font-light text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-light ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-700">{product.name} × {product.qty}</span>
                                <span className="text-gray-900 font-medium">KSh {(product.qty * product.unitPrice).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <div>
                              <p className="text-sm text-gray-600 font-light">{order.deliveryDate}</p>
                            </div>
                            <div>
                              <p className="text-lg font-medium text-gray-900">Total: KSh {order.totalAmount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orders.length === 0 && (
                      <div className="text-center py-12">
                        <FaClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-light text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 font-light">Your wholesale orders will appear here once you start purchasing from Rekker.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quote Requests Tab */}
              {activeTab === 'requests' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Quote Requests</h2>
                    
                    <div className="text-center py-12">
                      <FaTruck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-light text-gray-900 mb-2">No Quote Requests</h3>
                      <p className="text-gray-600 font-light mb-6">
                        You haven't submitted any wholesale quote requests yet.
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105">
                        Request New Quote
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;