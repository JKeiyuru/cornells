/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// Home.jsx - Rekker Business Admin Dashboard
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Eye, FileText, Star, Building, Quote, UserCheck } from "lucide-react";

const Home = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [dashboardData, setDashboardData] = useState({
    stats: {
      products: 342,
      quoteRequests: 87,
      businessPartners: 156,
      revenue: 1248750
    },
    recentQuotes: [],
    salesData: []
  });

  const recentQuotes = [
    {
      id: 1,
      businessName: "Nakumatt Supermarkets",
      contactPerson: "Sarah Kamau",
      email: "sarah@nakumatt.co.ke",
      total: 45890.50,
      status: "Pending Review",
      products: ["Saffron Handwash (500ml)", "Cornells Lotion (250ml)", "Stationery Bundle"],
      date: "2024-01-15",
      avatar: "NS",
      moq: "2000 units"
    },
    {
      id: 2,
      businessName: "Tuskys Retail Chain",
      contactPerson: "David Mwangi",
      email: "david@tuskys.com", 
      total: 67230.75,
      status: "Quote Sent",
      products: ["Party Items Bulk Pack", "Educational Supplies"],
      date: "2024-01-14",
      avatar: "TR",
      moq: "5000 units"
    },
    {
      id: 3,
      businessName: "Quickmart Limited",
      contactPerson: "Grace Njeri",
      email: "grace@quickmart.co.ke",
      total: 28450.00,
      status: "Approved",
      products: ["Cornells Complete Range"],
      date: "2024-01-13",
      avatar: "QL",
      moq: "1500 units"
    },
    {
      id: 4,
      businessName: "Carrefour Kenya",
      contactPerson: "James Ochieng",
      email: "james@carrefour.ke",
      total: 98750.25,
      status: "Negotiation",
      products: ["Saffron Cleaning Products", "Rekker Stationery", "Kitchenware"],
      date: "2024-01-12",
      avatar: "CK",
      moq: "10000 units"
    },
    {
      id: 5,
      businessName: "Naivas Supermarket",
      contactPerson: "Mary Wanjiku",
      email: "mary@naivas.co.ke",
      total: 52340.80,
      status: "Under Review",
      products: ["Teddy Bears Collection", "Party Supplies", "School Bags"],
      date: "2024-01-11",
      avatar: "NS",
      moq: "3000 units"
    },
  ];

  // Mock sales data for wholesale business
  const salesData = {
    '7d': [
      { day: 'Mon', sales: 42000, revenue: 185000 },
      { day: 'Tue', sales: 68000, revenue: 292000 },
      { day: 'Wed', sales: 52000, revenue: 238000 },
      { day: 'Thu', sales: 89000, revenue: 389000 },
      { day: 'Fri', sales: 75000, revenue: 345000 },
      { day: 'Sat', sales: 125000, revenue: 520000 },
      { day: 'Sun', sales: 98000, revenue: 412000 }
    ],
    '30d': [
      { day: 'Week 1', sales: 350000, revenue: 1500000 },
      { day: 'Week 2', sales: 420000, revenue: 1800000 },
      { day: 'Week 3', sales: 380000, revenue: 1650000 },
      { day: 'Week 4', sales: 470000, revenue: 2100000 }
    ],
    '90d': [
      { day: 'Month 1', sales: 1200000, revenue: 5200000 },
      { day: 'Month 2', sales: 1350000, revenue: 5800000 },
      { day: 'Month 3', sales: 1450000, revenue: 6250000 }
    ]
  };

  const currentSalesData = salesData[timeRange];
  const totalRevenue = dashboardData.stats.revenue.toLocaleString();

  // Calculate percentage changes (mock data)
  const percentageChanges = {
    products: +8.5,
    quoteRequests: +24.3,
    businessPartners: +15.7,
    revenue: +32.4
  };

  const topProducts = [
    { name: "Saffron Handwash 500ml", quotes: 42, revenue: 125400, image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=100", moq: "500 units" },
    { name: "Cornells Premium Lotion", quotes: 38, revenue: 189600, image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=100", moq: "300 units" },
    { name: "Rekker School Stationery Set", quotes: 29, revenue: 87300, image: "https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?auto=compress&cs=tinysrgb&w=100", moq: "1000 units" }
  ];

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

          {/* Stats Cards */}
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
                    <p className="text-gray-600 text-sm font-medium">Quote Requests</p>
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Charts and Tables */}
          <div className="xl:col-span-2 space-y-8">
            {/* Sales Chart */}
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
                      curve: 'smooth'
                    }
                  ]}
                  height={320}
                  margin={{ left: 80, right: 50, top: 30, bottom: 50 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>

            {/* Recent Quote Requests Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-slate-700 flex items-center">
                  <Quote className="mr-3 text-blue-600" size={20} />
                  Latest Quote Requests
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MOQ</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-blue-50 transition-colors">
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
                          <span className="text-lg font-bold text-slate-700">KSh {quote.total.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-blue-600">{quote.moq}</span>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {quote.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors">
                            <Eye size={18} />
                          </button>
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
            {/* Business Summary */}
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
                    <p className="text-2xl font-bold text-blue-900">KSh 54,850</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <FileText className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Star className="mr-2 text-blue-600" size={18} />
                Most Requested Products
              </h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.quotes} quotes | MOQ: {product.moq}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-700">KSh {product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                  <Package className="mr-2" size={18} />
                  Add New Product
                </button>
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <FileText className="mr-2" size={18} />
                  View Quote Requests
                </button>
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
                  <UserCheck className="mr-2" size={18} />
                  Manage Partners
                </button>
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
                    <p className="font-bold text-purple-600">38%</p>
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
                    <p className="font-bold text-blue-600">20%</p>
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

export default Home;