/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// Home.jsx
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Eye, Heart, Star } from "lucide-react";

const Home = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [dashboardData, setDashboardData] = useState({
    stats: {
      products: 699,
      orders: 1247,
      users: 3856,
      revenue: 284750
    },
    recentOrders: [],
    salesData: []
  });

  const orders = [
    {
      id: 1,
      name: "Sophia Martinez",
      email: "sophia@example.com",
      total: 289.99,
      status: "Delivered",
      items: ["Luxury Serum Set", "Hydrating Cleanser"],
      date: "2024-01-15",
      avatar: "SM"
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james@example.com", 
      total: 156.50,
      status: "Processing",
      items: ["Anti-Aging Cream", "Face Toner"],
      date: "2024-01-14",
      avatar: "JW"
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma@example.com",
      total: 425.00,
      status: "Delivered",
      items: ["Complete Skincare Bundle"],
      date: "2024-01-13",
      avatar: "ET"
    },
    {
      id: 4,
      name: "Michael Chen",
      email: "michael@example.com",
      total: 198.75,
      status: "Pending",
      items: ["Vitamin C Serum", "Moisturizer"],
      date: "2024-01-12",
      avatar: "MC"
    },
    {
      id: 5,
      name: "Isabella Rodriguez",
      email: "isabella@example.com",
      total: 347.20,
      status: "Delivered",
      items: ["Premium Foundation", "Setting Powder", "Primer"],
      date: "2024-01-11",
      avatar: "IR"
    },
  ];

  // Mock sales data
  const salesData = {
    '7d': [
      { day: 'Mon', sales: 4200, revenue: 18500 },
      { day: 'Tue', sales: 6800, revenue: 29200 },
      { day: 'Wed', sales: 5200, revenue: 23800 },
      { day: 'Thu', sales: 8900, revenue: 38900 },
      { day: 'Fri', sales: 7500, revenue: 34500 },
      { day: 'Sat', sales: 12500, revenue: 52000 },
      { day: 'Sun', sales: 9800, revenue: 41200 }
    ],
    '30d': [
      { day: 'Week 1', sales: 35000, revenue: 150000 },
      { day: 'Week 2', sales: 42000, revenue: 180000 },
      { day: 'Week 3', sales: 38000, revenue: 165000 },
      { day: 'Week 4', sales: 47000, revenue: 210000 }
    ],
    '90d': [
      { day: 'Month 1', sales: 120000, revenue: 520000 },
      { day: 'Month 2', sales: 135000, revenue: 580000 },
      { day: 'Month 3', sales: 145000, revenue: 625000 }
    ]
  };

  const currentSalesData = salesData[timeRange];
  const totalRevenue = dashboardData.stats.revenue.toLocaleString();

  // Calculate percentage changes (mock data)
  const percentageChanges = {
    products: +12.5,
    orders: +8.3,
    users: +15.7,
    revenue: +22.4
  };

  const topProducts = [
    { name: "Hydrating Facial Cleanser", sales: 342, revenue: 5470, image: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Luxury Anti-Aging Serum", sales: 287, revenue: 8610, image: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=100" },
    { name: "Premium Foundation", sales: 198, revenue: 7920, image: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">
                Cornell's Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening with your luxury store.</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
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
                      <p className="text-3xl font-bold text-[#8b4513]">{dashboardData.stats.products.toLocaleString()}</p>
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
                    <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#8b4513]">{dashboardData.stats.orders.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.orders}%</span>
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
                    <p className="text-gray-600 text-sm font-medium">Total Users</p>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Users className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#8b4513]">{dashboardData.stats.users.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
                        <span className="text-green-600 text-sm font-medium">+{percentageChanges.users}%</span>
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
                    <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center">
                      <DollarSign className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#8b4513]">${totalRevenue}</p>
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
                <h3 className="text-xl font-semibold text-[#8b4513] flex items-center">
                  <TrendingUp className="mr-3 text-[#d4af37]" size={20} />
                  Sales Performance
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full mr-2"></div>
                    <span className="text-gray-600">Revenue</span>
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
                      color: '#d4af37',
                      curve: 'smooth'
                    }
                  ]}
                  height={320}
                  margin={{ left: 50, right: 50, top: 30, bottom: 50 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#8b4513] flex items-center">
                  <ShoppingCart className="mr-3 text-[#d4af37]" size={20} />
                  Latest Transactions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#fef7e0] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-semibold">{order.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{order.name}</p>
                              <p className="text-sm text-gray-500">{order.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-[#8b4513]">${order.total}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : order.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-[#d4af37] hover:text-[#b8941f] transition-colors">
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
            {/* Revenue Summary */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-[#8b4513] mb-4 flex items-center">
                <DollarSign className="mr-2 text-[#d4af37]" size={18} />
                Revenue Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <p className="text-sm font-medium text-green-800">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-900">${totalRevenue}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Average Order</p>
                    <p className="text-2xl font-bold text-blue-900">$228.50</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-[#8b4513] mb-4 flex items-center">
                <Star className="mr-2 text-[#d4af37]" size={18} />
                Top Products
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
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#8b4513]">${product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-[#8b4513] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                  <Package className="mr-2" size={18} />
                  Add New Product
                </button>
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <ShoppingCart className="mr-2" size={18} />
                  View All Orders
                </button>
                <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center">
                  <Users className="mr-2" size={18} />
                  Manage Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;