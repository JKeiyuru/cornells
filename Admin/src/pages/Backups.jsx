/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { 
  HardDrive, 
  Download, 
  Upload, 
  Trash2, 
  Calendar, 
  Database,
  Cloud,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  Settings
} from "lucide-react";

const Backups = () => {
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: "Daily_Backup_2025_08_13",
      type: "Automatic",
      size: "2.4 GB",
      date: "2025-08-13 02:00:00",
      status: "Completed",
      includes: ["Database", "Media Files", "Config"]
    },
    {
      id: 2,
      name: "Manual_Backup_2025_08_12",
      type: "Manual",
      size: "2.1 GB",
      date: "2025-08-12 14:30:00",
      status: "Completed",
      includes: ["Database", "Media Files"]
    },
    {
      id: 3,
      name: "Weekly_Backup_2025_08_11",
      type: "Automatic",
      size: "2.8 GB",
      date: "2025-08-11 03:00:00",
      status: "Completed",
      includes: ["Database", "Media Files", "Config", "Logs"]
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [settings, setSettings] = useState({
    autoBackup: true,
    frequency: "daily",
    retention: "30",
    compression: true,
    cloudSync: false
  });

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: backups.length + 1,
        name: `Manual_Backup_${new Date().toISOString().split('T')[0]}`,
        type: "Manual",
        size: "0 MB",
        date: new Date().toISOString().replace('T', ' ').split('.')[0],
        status: "In Progress",
        includes: ["Database", "Media Files", "Config"]
      };
      setBackups([newBackup, ...backups]);
      setIsCreatingBackup(false);
    }, 3000);
  };

  const handleDeleteBackup = (id) => {
    setBackups(backups.filter(backup => backup.id !== id));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "In Progress":
        return <Clock className="text-yellow-500 animate-pulse" size={16} />;
      case "Failed":
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getTypeColor = (type) => {
    return type === "Automatic" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent flex items-center">
              <HardDrive className="mr-4 text-yellow-600" size={40} />
              Backup Management
            </h1>
            <p className="text-gray-600 mt-2">Secure your Cornells data with automated and manual backups</p>
          </div>
          
          <button
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingBackup ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Creating Backup...
              </>
            ) : (
              <>
                <Upload className="mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                Create Backup
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Backup Statistics */}
          <div className="xl:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Backups</p>
                    <p className="text-3xl font-bold text-yellow-600">{backups.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                    <Database className="text-white" size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                    <p className="text-3xl font-bold text-yellow-600">7.3 GB</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Cloud className="text-white" size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Backup</p>
                    <p className="text-lg font-bold text-yellow-600">2 hours ago</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Backup List */}
            <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Calendar className="mr-3 text-yellow-600" size={24} />
                  Recent Backups
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Size</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {backups.map((backup) => (
                      <tr key={backup.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{backup.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {backup.includes.map((item, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(backup.type)}`}>
                            {backup.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{backup.size}</td>
                        <td className="px-6 py-4 text-gray-600">{formatDate(backup.date)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getStatusIcon(backup.status)}
                            <span className="ml-2 text-sm font-medium text-gray-700">{backup.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg transition-all duration-200">
                              <Download size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBackup(backup.id)}
                              className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Backup Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Settings className="mr-3 text-yellow-600" size={20} />
                Backup Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Auto Backup</span>
                  <button 
                    onClick={() => setSettings({...settings, autoBackup: !settings.autoBackup})}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      settings.autoBackup ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 top-0.5 ${
                      settings.autoBackup ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select 
                    value={settings.frequency}
                    onChange={(e) => setSettings({...settings, frequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retention (days)</label>
                  <input 
                    type="number"
                    value={settings.retention}
                    onChange={(e) => setSettings({...settings, retention: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Compression</span>
                  <button 
                    onClick={() => setSettings({...settings, compression: !settings.compression})}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      settings.compression ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 top-0.5 ${
                      settings.compression ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
              
              <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Save Settings
              </button>
            </div>

            {/* Security Info */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <Shield className="text-green-600 mr-3" size={20} />
                <h4 className="font-bold text-green-800">Security Status</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={14} />
                  Encrypted backups
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={14} />
                  Secure cloud storage
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={14} />
                  Regular integrity checks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backups;