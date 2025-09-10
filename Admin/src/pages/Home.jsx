/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// Enhanced Home.jsx - Rekker Business Admin Dashboard
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Eye, FileText, Star, Building, Quote, UserCheck, AlertCircle, RefreshCw, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      products: 342,
      quoteRequests: 87,
      businessPartners: 156,
      revenue: 1248750,
      pendingQuotes: 23,
      approvedQuotes: 41,
      totalOrders: 128,
      avgOrderValue: 47500
    },
    recentQuotes: [],
    salesData: [],
    topProducts: [],
    recentActivity: []
  });

  // Enhanced recent quotes with more realistic wholesale data
  const recentQuotes = [
    {
      id: 1,
      businessName: "Nakumatt Supermarkets",
      contactPerson: "Sarah Kamau",
      email: "sarah@nakumatt.co.ke",
      total: 245890.50,
      status: "Under Review",
      products: ["Saffron Handwash (500ml) - 5000 units", "Cornells Lotion (250ml) - 3000 units"],
      date: "2024-01-15",
      avatar: "NS",
      moq: "5000 units",
      urgency: "high"
    },
    {
      id: 2,
      businessName: "Carrefour Kenya",
      contactPerson: "James Ochieng",
      email: "james@carrefour.ke", 
      total: 567230.75,
      status: "Quote Sent",
      products: ["Rekker Stationery Bundle - 10000 units", "School Bags - 2500 units"],
      date: "2024-01-14",
      avatar: "CK",
      moq: "10000 units",
      urgency: "medium"
    },
    {
      id: 3,
      businessName: "Quickmart Limited",
      contactPerson: "Grace Njeri",
      email: "grace@quickmart.co.ke",
      total: 128450.00,
      status: "Approved",
      products: ["Saffron Cleaning Products - 2500 units"],
      date: "2024-01-13",
      avatar: "QL",
      moq: "2500 units",
      urgency: "low"
    },
    {
      id: 4,
      businessName: "Tuskys Retail Chain",
      contactPerson: "David Mwangi",
      email: "david@tuskys.com",
      total: 398750.25,
      status: "Negotiation",
      products: ["Party Items Bulk Pack - 15000 units", "Teddy Bears - 1000 units"],
      date: "2024-01-12",
      avatar: "TR",
      moq: "15000 units",
      urgency: "high"
    },
    {
      id: 5,
      businessName: "Naivas Supermarket",
      contactPerson: "Mary Wanjiku",
      email: "mary@naivas.co.ke",
      total: 189340.80,
      status: "Pending Review",
      products: ["Educational Supplies - 8000 units", "Kitchenware - 2000 units"],
      date: "2024-01-11",
      avatar: "NV",
      moq: "8000 units",
      urgency: "medium"
    },
  ];

  // Enhanced sales data for wholesale business
  const salesData = {
    '7d': [
      { day: 'Mon', sales: 142000, revenue: 285000, orders: 12 },
      { day: 'Tue', sales: 268000, revenue: 492000, orders: 18 },
      { day: 'Wed', sales: 152000, revenue: 338000, orders: 15 },
      { day: 'Thu', sales: 389000, revenue: 689000, orders: 24 },
      { day: 'Fri', sales: 275000, revenue: 545000, orders: 21 },
      { day: 'Sat', sales: 425000, revenue: 820000, orders: 32 },
      { day: 'Sun', sales: 298000, revenue: 612000, orders: 28 }
    ],
    '30d': [
      { day: 'Week 1', sales: 1850000, revenue: 3500000, orders: 89 },
      { day: 'Week 2', sales: 2120000, revenue: 4100000, orders: 102 },
      { day: 'Week 3', sales: 1980000, revenue: 3850000, orders: 95 },
      { day: 'Week 4', sales: 2470000, revenue: 4700000, orders: 118 }
    ],
    '90d': [
      { day: 'Month 1', sales: 7200000, revenue: 14200000, orders: 342 },
      { day: 'Month 2', sales: 8350000, revenue: 16800000, orders: 398 },
      { day: 'Month 3', sales: 9450000, revenue: 18950000, orders: 445 }
    ]
  };

  const currentSalesData = salesData[timeRange];
  const totalRevenue = dashboardData.stats.revenue.toLocaleString();

  // Calculate percentage changes with more realistic data
  const percentageChanges = {
    products: +8.5,
    quoteRequests: +24.3,
    businessPartners: +15.7,
    revenue: +32.4,
    pendingQuotes: -5.2,
    approvedQuotes: +18.9
  };

  // Enhanced top products with wholesale focus
  const topProducts = [
    { 
      name: "Saffron Handwash 500ml", 
      quotes: 42, 
      revenue: 425400, 
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=100", 
      moq: "500 units",
      growth: "+18%",
      category: "Cleaning Products"
    },
    { 
      name: "Rekker Stationery Bundle", 
      quotes: 38, 
      revenue: 289600, 
      image: "https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?auto=compress&cs=tinysrgb&w=100", 
      moq: "1000 units",
      growth: "+24%",
      category: "Stationery"
    },
    { 
      name: "Cornells Premium Lotion", 
      quotes: 29, 
      revenue: 187300, 
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=100", 
      moq: "300 units",
      growth: "+12%",
      category: "Beauty & Personal Care"
    }
  ];

  // Recent activity feed
  const recentActivity = [
    { type: "quote", message: "New quote request from Nakumatt Supermarkets", time: "5 minutes ago", status: "new" },
    { type: "order", message: "Order #1234 approved for Carrefour Kenya", time: "1 hour ago", status: "success" },
    { type: "product", message: "New product added: Saffron Dish Soap", time: "2 hours ago", status: "info" },
    { type: "partner", message: "New business partner registered: Metro Wholesale", time: "4 hours ago", status: "info" },
    { type: "quote", message: "Quote #5678 requires your attention", time: "6 hours ago", status: "warning" }
  ];

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update dashboard data here
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-l-4 border-red-500 bg-red-50';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-4 border-green-500 bg-green-50';
      default: return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quote': return <Quote className="w-4 h-4 text-blue-500" />;
      case 'order': return <Package className="w-4 h-4 text-green-500" />;
      case 'product': return <Box className="w-4 h-4 text-purple-500" />;
      case 'partner': return <Building className="w-4 h-4 text-orange-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Rekker Business Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1 text-lg">Wholesale Management & Business Analytics</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button 
                onClick={refreshData}
                disabled={loading}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all duration-300 text-blue-600"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm font-medium">Total Products</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <Package className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-700">{dashboardData.stats.products.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.products}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm font-medium">Active Quote Requests</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <FileText className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-700">{dashboardData.stats.quoteRequests.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.quoteRequests}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm font-medium">Business Partners</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-700">{dashboardData.stats.businessPartners.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.businessPartners}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-700">KSh {totalRevenue}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.revenue}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional KPIs Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-700 text-sm font-medium">Pending Quotes</p>
                  <p className="text-2xl font-bold text-orange-800">{dashboardData.stats.pendingQuotes}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">Approved Quotes</p>
                  <p className="text-2xl font-bold text-green-800">{dashboardData.stats.approvedQuotes}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-800">{dashboardData.stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-700 text-sm font-medium">Avg Order Value</p>
                  <p className="text-2xl font-bold text-purple-800">KSh {dashboardData.stats.avgOrderValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Charts and Tables */}
          <div className="xl:col-span-2 space-y-8">
            {/* Enhanced Sales Chart */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-700 flex items-center">
                  <TrendingUp className="mr-3 text-blue-600" size={20} />
                  Wholesale Revenue Performance
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-gray-600">Revenue (KSh)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                    <span className="text-gray-600">Orders</span>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <LineChart
                  xAxis={[{ 
                    data: currentSalesData.map((_, index) => index + 1),
                    scaleType: 'point'
                  }]}
                  series={[
                    {
                      data: currentSalesData.map(item => item.revenue),
                      color: '#2563eb',
                      curve: 'smooth',
                      label: 'Revenue'
                    },
                    {
                      data: currentSalesData.map(item => item.orders * 10000), // Scale for visibility
                      color: '#16a34a',
                      curve: 'smooth',
                      label: 'Orders (x10K)'
                    }
                  ]}
                  height={320}
                  margin={{ left: 80, right: 50, top: 30, bottom: 50 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>

            {/* Enhanced Quote Requests Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-700 flex items-center">
                  <Quote className="mr-3 text-blue-600" size={20} />
                  Latest Quote Requests
                </h3>
                <Link to="/quotes">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentQuotes.map((quote) => (
                      <tr key={quote.id} className={`hover:bg-blue-50 transition-colors ${getUrgencyColor(quote.urgency)}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-semibold">{quote.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{quote.businessName}</p>
                              <p className="text-sm text-gray-500">{quote.contactPerson}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="text-lg font-bold text-slate-700">KSh {quote.total.toLocaleString()}</span>
                            <p className="text-xs text-gray-500">{quote.moq}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            quote.status === 'Approved' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : quote.status === 'Quote Sent'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : quote.status === 'Negotiation'
                              ? 'bg-orange-100 text-orange-800 border border-orange-200'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            quote.urgency === 'high' ? 'bg-red-100 text-red-800' :
                            quote.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {quote.urgency.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {quote.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-800 transition-colors">
                              <UserCheck size={16} />
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

          {/* Right Column - Summary Cards */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/newproduct">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <Package className="mr-2" size={18} />
                    Add New Product
                  </button>
                </Link>
                <Link to="/quotes">
                  <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <FileText className="mr-2" size={18} />
                    Review Quotes ({dashboardData.stats.pendingQuotes})
                  </button>
                </Link>
                <Link to="/partners">
                  <button className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
                    <UserCheck className="mr-2" size={18} />
                    Manage Partners
                  </button>
                </Link>
              </div>
            </div>

            {/* Business Overview */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <DollarSign className="mr-2 text-blue-600" size={18} />
                Business Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <p className="text-sm font-medium text-green-800">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-900">KSh {(dashboardData.stats.revenue * 1.2).toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Avg Quote Value</p>
                    <p className="text-2xl font-bold text-blue-900">KSh 154,850</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <FileText className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Conversion Rate</p>
                    <p className="text-2xl font-bold text-purple-900">68.4%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Star className="mr-2 text-blue-600" size={18} />
                Top Performing Products
              </h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{product.quotes} quotes</p>
                          <span className="text-xs text-green-600 font-semibold">{product.growth}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-700">KSh {product.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <AlertCircle className="mr-2 text-blue-600" size={18} />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${getActivityStatusColor(activity.status)}`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Performance */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Brand Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Saffron</p>
                      <p className="text-xs text-gray-500">Cleaning Products</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">42%</p>
                    <p className="text-xs text-gray-500">Market Share</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Cornells</p>
                      <p className="text-xs text-gray-500">Beauty Products</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">31%</p>
                    <p className="text-xs text-gray-500">Market Share</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Rekker Products</p>
                      <p className="text-xs text-gray-500">General Merchandise</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">27%</p>
                    <p className="text-xs text-gray-500">Market Share</p>
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

export default Home; => {
    switch (urgency) {
      case