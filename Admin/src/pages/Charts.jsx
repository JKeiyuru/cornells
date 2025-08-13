/* eslint-disable no-unused-vars */
import { useState } from "react";
import { LineChart, BarChart, PieChart, Line } from "recharts";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Calendar,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Filter,
  Download,
  Crown,
  Gem
} from "lucide-react";

const Charts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedChart, setSelectedChart] = useState("revenue");

  // Sample data for charts - converted to Recharts format
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 13500 },
    { month: 'Apr', revenue: 18000 },
    { month: 'May', revenue: 16500 },
    { month: 'Jun', revenue: 21000 },
    { month: 'Jul', revenue: 19500 },
    { month: 'Aug', revenue: 23000 }
  ];

  const ordersData = [
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 62 },
    { day: 'Wed', orders: 38 },
    { day: 'Thu', orders: 71 },
    { day: 'Fri', orders: 56 },
    { day: 'Sat', orders: 89 },
    { day: 'Sun', orders: 73 }
  ];

  const productsData = [
    { name: 'Serums', value: 35, fill: '#d4af37' },
    { name: 'Foundations', value: 25, fill: '#b8941f' },
    { name: 'Lotions', value: 20, fill: '#f4e4bc' },
    { name: 'Toners', value: 20, fill: '#e8d5a3' }
  ];

  const trafficData = [
    { week: 'Week 1', unique: 2400, returning: 1800 },
    { week: 'Week 2', unique: 2800, returning: 2200 },
    { week: 'Week 3', unique: 3200, returning: 2600 },
    { week: 'Week 4', unique: 3600, returning: 2900 }
  ];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "$127,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users",
      value: "8,549",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Page Views",
      value: "42,891",
      change: "-2.1%",
      trend: "down",
      icon: Eye,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const chartTypes = [
    { id: "revenue", label: "Revenue Trends", icon: TrendingUp },
    { id: "orders", label: "Order Volume", icon: BarChart3 },
    { id: "products", label: "Product Distribution", icon: PieChartIcon },
    { id: "traffic", label: "Website Traffic", icon: TrendingUp }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case "revenue":
        return (
          <div className="w-full h-96">
            <LineChart width={800} height={400} data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#d4af37" 
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={{ fill: '#d4af37', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </div>
        );
      case "orders":
        return (
          <div className="w-full h-96">
            <BarChart width={800} height={400} data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b8941f" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#b8941f" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </div>
        );
      case "products":
        return (
          <div className="w-full h-96 flex justify-center items-center">
            <PieChart width={800} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            </PieChart>
          </div>
        );
      case "traffic":
        return (
          <div className="w-full h-96">
            <LineChart width={800} height={400} data={trafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <Line type="monotone" dataKey="unique" stroke="#d4af37" strokeWidth={2} name="Unique Visitors" />
              <Line type="monotone" dataKey="returning" stroke="#b8941f" strokeWidth={2} name="Returning Visitors" />
            </LineChart>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent flex items-center">
              <BarChart3 className="mr-4 text-yellow-600" size={40} />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into your Cornells business performance</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Download className="mr-2" size={16} />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-full flex items-center justify-center`}>
                  <kpi.icon className="text-white" size={20} />
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {kpi.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Chart Selection */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Filter className="mr-3 text-yellow-600" size={20} />
                Chart Types
              </h3>
              
              <div className="space-y-3">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setSelectedChart(chart.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      selectedChart === chart.id
                        ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:text-gray-800"
                    }`}
                  >
                    <chart.icon className={`mr-3 ${
                      selectedChart === chart.id ? "text-white" : "text-yellow-600"
                    }`} size={18} />
                    <span className="font-medium">{chart.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Crown className="mr-2 text-yellow-600" size={16} />
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-yellow-600">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Order Value</span>
                    <span className="font-bold text-yellow-600">$99.30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer LTV</span>
                    <span className="font-bold text-yellow-600">$287.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Return Rate</span>
                    <span className="font-bold text-green-600">68%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Gem className="mr-3 text-yellow-600" size={24} />
                  {chartTypes.find(c => c.id === selectedChart)?.label}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Primary Data</span>
                  {selectedChart === "traffic" && (
                    <>
                      <div className="w-3 h-3 bg-yellow-700 rounded-full ml-4"></div>
                      <span className="text-sm text-gray-600">Secondary Data</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                {renderChart()}
              </div>
              
              {/* Chart Insights */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="text-green-600" size={24} />
                    </div>
                    <h4 className="font-bold text-gray-800">Peak Performance</h4>
                    <p className="text-sm text-gray-600">August shows highest growth</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <h4 className="font-bold text-gray-800">Customer Growth</h4>
                    <p className="text-sm text-gray-600">15% increase this month</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-bold text-gray-800">Revenue Target</h4>
                    <p className="text-sm text-gray-600">92% of monthly goal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Crown className="mr-3 text-yellow-600" size={20} />
              Top Performing Products
            </h3>
            
            <div className="space-y-4">
              {[
                { name: "Luxury Anti-Aging Serum", sales: 234, revenue: "$23,400", growth: "+18%" },
                { name: "Hydrating Foundation", sales: 198, revenue: "$19,800", growth: "+12%" },
                { name: "Moisturizing Face Cream", sales: 156, revenue: "$15,600", growth: "+8%" },
                { name: "Vitamin C Toner", sales: 142, revenue: "$14,200", growth: "+15%" }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">{product.revenue}</p>
                    <p className="text-sm text-green-600 font-semibold">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Gem className="mr-3 text-yellow-600" size={20} />
              Regional Performance
            </h3>
            
            <div className="space-y-4">
              {[
                { region: "North America", percentage: 45, revenue: "$57,375", color: "bg-yellow-600" },
                { region: "Europe", percentage: 30, revenue: "$38,250", color: "bg-yellow-700" },
                { region: "Asia Pacific", percentage: 20, revenue: "$25,500", color: "bg-yellow-300" },
                { region: "Other", percentage: 5, revenue: "$6,375", color: "bg-gray-300" }
              ].map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{region.region}</span>
                    <span className="text-sm font-bold text-yellow-600">{region.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${region.color} transition-all duration-1000`}
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;