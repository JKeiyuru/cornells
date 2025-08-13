/* eslint-disable react/prop-types */
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Crown,
  Eye,
  EyeOff
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Cornells Admin",
    adminEmail: "admin@cornells.com",
    timezone: "UTC+0",
    language: "English",
    currency: "USD"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5"
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#d4af37",
    darkMode: false,
    animations: true,
    compactView: false
  });

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "system", label: "System", icon: Globe }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ isOn, onToggle, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700 font-medium">{label}</span>
      <button 
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          isOn ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-gray-300'
        }`}
      >
        <div className={`absolute w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 top-0.5 ${
          isOn ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <SettingsIcon className="mr-3 text-yellow-600" size={24} />
              General Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC+1">UTC+1 (Paris)</option>
                  <option value="UTC+3">UTC+3 (Dubai)</option>
                  <option value="UTC-5">UTC-5 (New York)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <User className="mr-3 text-yellow-600" size={24} />
              Profile Settings
            </h2>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                  <Crown className="text-3xl text-white" size={32} />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-yellow-600 hover:bg-yellow-50 transition-colors">
                  <SettingsIcon className="text-yellow-600" size={12} />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Administrator</h3>
                <p className="text-gray-500">Sterling Parfums</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Administrator"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  defaultValue="System Administrator"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Change Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Bell className="mr-3 text-yellow-600" size={24} />
              Notification Settings
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border-l-4 border-yellow-600">
              <ToggleSwitch
                isOn={notifications.email}
                onToggle={() => handleNotificationChange('email')}
                label="Email Notifications"
              />
              <ToggleSwitch
                isOn={notifications.push}
                onToggle={() => handleNotificationChange('push')}
                label="Push Notifications"
              />
              <ToggleSwitch
                isOn={notifications.sms}
                onToggle={() => handleNotificationChange('sms')}
                label="SMS Notifications"
              />
              <ToggleSwitch
                isOn={notifications.marketing}
                onToggle={() => handleNotificationChange('marketing')}
                label="Marketing Communications"
              />
            </div>
          </div>
        );
        
      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Shield className="mr-3 text-yellow-600" size={24} />
              Security Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">Two-Factor Authentication</h3>
                <ToggleSwitch
                  isOn={securitySettings.twoFactor}
                  onToggle={() => setSecuritySettings({...securitySettings, twoFactor: !securitySettings.twoFactor})}
                  label="Enable 2FA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );
        
      case "appearance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Palette className="mr-3 text-yellow-600" size={24} />
              Appearance Settings
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <ToggleSwitch
                isOn={themeSettings.darkMode}
                onToggle={() => setThemeSettings({...themeSettings, darkMode: !themeSettings.darkMode})}
                label="Dark Mode"
              />
              <ToggleSwitch
                isOn={themeSettings.animations}
                onToggle={() => setThemeSettings({...themeSettings, animations: !themeSettings.animations})}
                label="Enable Animations"
              />
              <ToggleSwitch
                isOn={themeSettings.compactView}
                onToggle={() => setThemeSettings({...themeSettings, compactView: !themeSettings.compactView})}
                label="Compact View"
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-12">
            <Globe className="text-6xl text-yellow-600 mx-auto mb-4" size={96} />
            <p className="text-gray-500">System settings coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your Cornells admin panel preferences and configurations</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:text-gray-800"
                    }`}
                  >
                    <tab.icon className={`mr-3 ${
                      activeTab === tab.id ? "text-white" : "text-yellow-600"
                    }`} size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
              {renderTabContent()}
              
              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="group flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Save className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={16} />
                  Save Changes
                  <div className="ml-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;