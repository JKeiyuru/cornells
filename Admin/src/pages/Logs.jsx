/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { 
  Clipboard, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  User,
  Database,
  Shield,
  Settings,
  Calendar,
  Eye,
  Trash2
} from "lucide-react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Sample log data
  const sampleLogs = [
    {
      id: 1,
      timestamp: "2025-08-13 14:30:25",
      level: "info",
      category: "auth",
      message: "User admin@cornells.com logged in successfully",
      details: "IP: 192.168.1.100, Browser: Chrome 118.0",
      user: "admin@cornells.com"
    },
    {
      id: 2,
      timestamp: "2025-08-13 14:28:12",
      level: "warning",
      category: "system",
      message: "High memory usage detected",
      details: "Memory usage: 87% of available RAM",
      user: "system"
    },
    {
      id: 3,
      timestamp: "2025-08-13 14:25:33",
      level: "error",
      category: "database",
      message: "Failed to connect to backup database",
      details: "Connection timeout after 30 seconds",
      user: "system"
    },
    {
      id: 4,
      timestamp: "2025-08-13 14:22:18",
      level: "success",
      category: "backup",
      message: "Daily backup completed successfully",
      details: "Backup size: 2.4GB, Duration: 15 minutes",
      user: "system"
    },
    {
      id: 5,
      timestamp: "2025-08-13 14:20:45",
      level: "info",
      category: "security",
      message: "Password change request initiated",
      details: "User: john.doe@cornells.com",
      user: "john.doe@cornells.com"
    },
    {
      id: 6,
      timestamp: "2025-08-13 14:18:22",
      level: "warning",
      category: "performance",
      message: "Slow query detected",
      details: "Query execution time: 3.2 seconds",
      user: "system"
    },
    {
      id: 7,
      timestamp: "2025-08-13 14:15:11",
      level: "info",
      category: "commerce",
      message: "New order placed",
      details: "Order #ORD-2025-001234, Amount: $299.99",
      user: "customer@email.com"
    },
    {
      id: 8,
      timestamp: "2025-08-13 14:12:05",
      level: "error",
      category: "payment",
      message: "Payment processing failed",
      details: "Transaction ID: TXN-789456, Reason: Insufficient funds",
      user: "system"
    }
  ];

  useEffect(() => {
    setLogs(sampleLogs);
    setFilteredLogs(sampleLogs);
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(log => log.level === selectedLevel);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(log => log.category === selectedCategory);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, selectedLevel, selectedCategory, logs]);

  const getLevelIcon = (level) => {
    switch (level) {
      case "error":
        return <XCircle className="text-red-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case "success":
        return <CheckCircle className="text-green-500" size={16} />;
      case "info":
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };

  const getLevelBadge = (level) => {
    const styles = {
      error: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      success: "bg-green-100 text-green-800 border-green-200",
      info: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return `inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${styles[level] || styles.info}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      auth: User,
      system: Settings,
      database: Database,
      security: Shield,
      backup: Clipboard,
      performance: Settings,
      commerce: User,
      payment: Database
    };
    
    const IconComponent = icons[category] || Info;
    return <IconComponent className="text-yellow-600" size={16} />;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cornells-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const logLevels = [
    { value: "all", label: "All Levels" },
    { value: "error", label: "Errors" },
    { value: "warning", label: "Warnings" },
    { value: "success", label: "Success" },
    { value: "info", label: "Info" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "auth", label: "Authentication" },
    { value: "system", label: "System" },
    { value: "database", label: "Database" },
    { value: "security", label: "Security" },
    { value: "backup", label: "Backup" },
    { value: "performance", label: "Performance" },
    { value: "commerce", label: "Commerce" },
    { value: "payment", label: "Payment" }
  ];

  const logStats = {
    total: logs.length,
    errors: logs.filter(log => log.level === "error").length,
    warnings: logs.filter(log => log.level === "warning").length,
    success: logs.filter(log => log.level === "success").length,
    info: logs.filter(log => log.level === "info").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent flex items-center">
              <Clipboard className="mr-4 text-yellow-600" size={40} />
              System Logs
            </h1>
            <p className="text-gray-600 mt-2">Monitor and analyze Cornells system activities and events</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
              Refresh
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2" size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-3xl font-bold text-yellow-600">{logStats.total}</p>
              </div>
              <Clipboard className="text-3xl text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-3xl font-bold text-red-500">{logStats.errors}</p>
              </div>
              <XCircle className="text-3xl text-red-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-3xl font-bold text-yellow-500">{logStats.warnings}</p>
              </div>
              <AlertTriangle className="text-3xl text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success</p>
                <p className="text-3xl font-bold text-green-500">{logStats.success}</p>
              </div>
              <CheckCircle className="text-3xl text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Info</p>
                <p className="text-3xl font-bold text-blue-500">{logStats.info}</p>
              </div>
              <Info className="text-3xl text-blue-500" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {logLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                Showing {filteredLogs.length} of {logs.length} logs
              </span>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Eye className="mr-3 text-yellow-600" size={24} />
              Recent Activity
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getLevelIcon(log.level)}
                        <span className={`ml-2 ${getLevelBadge(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getCategoryIcon(log.category)}
                        <span className="ml-2 text-sm font-medium text-gray-700 capitalize">
                          {log.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{log.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.user}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg transition-all duration-200">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <Clipboard className="text-6xl text-gray-300 mx-auto mb-4" size={96} />
                <p className="text-gray-500 text-lg">No logs found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;