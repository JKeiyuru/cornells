/* eslint-disable react/no-unescaped-entities */
// pages/Account.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaSignOutAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    setIsLoaded(true);
    if (user.currentUser) {
      setFormData({
        name: user.currentUser.name || "",
        email: user.currentUser.email || "",
        phone: user.currentUser.phone || "",
        address: user.currentUser.address || ""
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
      toast.success("Profile updated successfully!", {
        style: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#f8f8f8',
          border: '1px solid #d4af37',
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
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: '#f8f8f8',
          border: '1px solid #d4af37',
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
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#f8f8f8',
        border: '1px solid #d4af37',
      }
    });
  };

  if (!user.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Please log in to access your account</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
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
      <div className={`bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            Welcome, {user.currentUser.name}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-light">
            Manage your exclusive Cornells account
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Navigation Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide">Account Menu</h3>
                <nav className="space-y-3">
                  <a href="#profile" className="flex items-center space-x-3 px-4 py-3 text-purple-600 bg-purple-50 rounded-xl font-light">
                    <FaUser className="w-4 h-4" />
                    <span>Profile Information</span>
                  </a>
                  <a href="#orders" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors font-light">
                    <FaEnvelope className="w-4 h-4" />
                    <span>Order History</span>
                  </a>
                  <a href="#preferences" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors font-light">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>Preferences</span>
                  </a>
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
            <div className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              {/* Profile Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-light"
                    >
                      {isEditing ? <FaTimes className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
                      <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

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
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                            isEditing 
                              ? 'focus:outline-none focus:ring-2 focus:ring-purple-400' 
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
                              ? 'focus:outline-none focus:ring-2 focus:ring-purple-400' 
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
                          placeholder="+1 (555) 123-4567"
                          className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                            isEditing 
                              ? 'focus:outline-none focus:ring-2 focus:ring-purple-400' 
                              : 'bg-gray-50 cursor-not-allowed'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-light mb-2 tracking-wide uppercase text-sm">
                        Address
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Your address"
                          className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-light ${
                            isEditing 
                              ? 'focus:outline-none focus:ring-2 focus:ring-purple-400' 
                              : 'bg-gray-50 cursor-not-allowed'
                          }`}
                        />
                      </div>
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
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                      >
                        <FaSave className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Change Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-light text-gray-900 tracking-wide">Security Settings</h2>
                    <button
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-light"
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
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
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
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
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
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-light"
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
                          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaLock className="w-8 h-8 text-purple-600" />
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
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-3xl font-light text-purple-600 mb-2">12</div>
                      <div className="text-gray-600 font-light">Orders Placed</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-3xl font-light text-blue-600 mb-2">$1,247</div>
                      <div className="text-gray-600 font-light">Total Spent</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                      <div className="text-3xl font-light text-pink-600 mb-2">VIP</div>
                      <div className="text-gray-600 font-light">Member Status</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-gray-600 font-light text-sm">Receive updates about new products and offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-gray-600 font-light text-sm">Get notified about order updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                        <p className="text-gray-600 font-light text-sm">Receive exclusive offers and beauty tips</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
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

export default Account;