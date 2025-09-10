/* eslint-disable no-unused-vars */
// Product.jsx - Enhanced Rekker Product Edit
import { Link, useParams } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { Upload, Save, ArrowLeft, Edit, Eye, Box, Star, Building, TrendingUp, DollarSign, Package, Users, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [product, setProduct] = useState({
    _id: "123456",
    title: "Saffron Antibacterial Handwash",
    img: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "Premium antibacterial handwash manufactured by Rekker. Gentle formula with moisturizing properties, suitable for frequent use in commercial settings.",
    wholesalePrice: 85.99,
    retailPrice: 125.99,
    moq: 500,
    inStock: true,
    brand: "Saffron (by Rekker)",
    category: "Cleaning Products",
    specifications: "500ml",
    rating: 4.7,
    reviews: 89,
    quotesRequested: 42,
    totalSales: 12500,
    stock: 2500,
    sku: "SAF-HW-500",
    featured: true,
    subcategory: ["Handwash"],
    targetMarket: ["Supermarkets", "Hotels & Restaurants"],
    createdAt: "2024-01-15"
  });

  const [inputs, setInputs] = React.useState(product);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(product.img);

  useEffect(() => {
    // Fetch product data when component mounts
    const fetchProduct = async () => {
      if (id && id !== "123456") {
        try {
          setLoading(true);
          const res = await userRequest.get(`/products/${id}`);
          setProduct(res.data);
          setInputs(res.data);
          setPreviewImage(res.data.img);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Initialize with mock data
        setInputs(product);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setSaving(true);
      
      // If there's a new image, upload it first
      let imageUrl = previewImage;
      if (selectedImage) {
        const data = new FormData();
        data.append("file", selectedImage);
        data.append("upload_preset", "uploads");
        
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dkjenslgr/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      }

      const updatedProduct = {
        ...inputs,
        img: imageUrl,
        // Ensure numeric fields are properly converted
        wholesalePrice: parseFloat(inputs.wholesalePrice),
        retailPrice: parseFloat(inputs.retailPrice),
        moq: parseInt(inputs.moq),
        stock: parseInt(inputs.stock || 0),
        inStock: parseInt(inputs.stock || 0) > 0,
        updatedAt: new Date().toISOString()
      };

      // Uncomment when backend is ready
      // await userRequest.put(`/products/${inputs._id}`, updatedProduct);
      
      setProduct(updatedProduct);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Mock quote requests data for chart - 6 months
  const quoteRequestsData = [
    { month: 'Jul', requests: 12, revenue: 6000 },
    { month: 'Aug', requests: 18, revenue: 9000 },
    { month: 'Sep', requests: 15, revenue: 7500 },
    { month: 'Oct', requests: 24, revenue: 12000 },
    { month: 'Nov', requests: 19, revenue: 9500 },
    { month: 'Dec', requests: 32, revenue: 16000 }
  ];

  // Recent quote requests for this product
  const recentQuotes = [
    { business: "Nakumatt Supermarkets", quantity: 2500, value: 212475, status: "Quote Sent", date: "2 days ago", contact: "Sarah Kamau" },
    { business: "Quickmart Limited", quantity: 1500, value: 128985, status: "Under Review", date: "5 days ago", contact: "Grace Njeri" },
    { business: "Carrefour Kenya", quantity: 5000, value: 429950, status: "Approved", date: "1 week ago", contact: "James Ochieng" },
    { business: "Tuskys Retail", quantity: 3000, value: 257970, status: "Negotiation", date: "2 weeks ago", contact: "David Mwangi" }
  ];

  if (loading && !product._id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  const brandOptions = [
    "Rekker", 
    "Saffron (by Rekker)", 
    "Cornells (Distributed by Rekker)"
  ];

  const categoryOptions = [
    "Stationery", 
    "School Bags & Suitcases", 
    "Toys", 
    "Kitchenware", 
    "Padlocks", 
    "Teddy Bears & Stuffed Toys", 
    "Party Items", 
    "Educational Items",
    "Cleaning Products", 
    "Beauty & Personal Care"
  ];

  const getBrandColor = (brand) => {
    if (brand.includes('Saffron')) return 'from-orange-500 to-yellow-500';
    if (brand.includes('Cornells')) return 'from-purple-500 to-pink-500';
    return 'from-blue-600 to-green-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Quote Sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Negotiation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateMetrics = () => {
    const margin = inputs.retailPrice && inputs.wholesalePrice ? 
      (((inputs.retailPrice - inputs.wholesalePrice) / inputs.retailPrice) * 100).toFixed(1) : 0;
    const minOrderValue = inputs.wholesalePrice && inputs.moq ? 
      (inputs.wholesalePrice * inputs.moq).toLocaleString() : 0;
    const totalQuoteValue = recentQuotes.reduce((sum, quote) => sum + quote.value, 0);
    const avgQuoteValue = totalQuoteValue / recentQuotes.length;
    
    return { margin, minOrderValue, totalQuoteValue, avgQuoteValue };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Product updated successfully!
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/products"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all duration-300 text-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center">
                <Edit className="w-6 h-6 mr-4 text-blue-600" />
                Edit Product
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Modify your Rekker product details and track performance</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link to="/newproduct">
              <button className="bg-white border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center">
                <Box className="w-5 h-5 mr-2" />
                Create New
              </button>
            </Link>
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Product Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Quote Requests</p>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-700">{product.quotesRequested}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
              <span className="text-green-600 text-sm font-medium">+18.2%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Sales</p>
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-700">{product.totalSales.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
              <span className="text-green-600 text-sm font-medium">+24.1%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Revenue Generated</p>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-slate-700">KSh {Math.round(product.totalSales * product.wholesalePrice).toLocaleString()}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="text-green-500 text-sm mr-1" size={14} />
              <span className="text-green-600 text-sm font-medium">+32.4%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Customer Rating</p>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-slate-700">{product.rating}</p>
              <span className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center mt-1">
              <Star className="text-yellow-500 text-sm mr-1" size={14} />
              <span className="text-yellow-600 text-sm font-medium">4.5+ avg rating</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Quote Requests & Revenue Chart */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-700 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Quote Requests & Revenue Performance
              </h3>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">Total Quotes (6M)</p>
                  <p className="font-bold text-blue-600">{quoteRequestsData.reduce((sum, item) => sum + item.requests, 0)}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Total Revenue (6M)</p>
                  <p className="font-bold text-green-600">KSh {quoteRequestsData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <LineChart
              xAxis={[{ 
                data: [1, 2, 3, 4, 5, 6],
                scaleType: 'point',
                label: 'Last 6 Months'
              }]}
              series={[
                {
                  data: quoteRequestsData.map(item => item.requests),
                  color: '#2563eb',
                  curve: 'smooth',
                  label: 'Quote Requests'
                },
                {
                  data: quoteRequestsData.map(item => item.revenue / 1000), // Scale down for better visualization
                  color: '#16a34a',
                  curve: 'smooth',
                  label: 'Revenue (K KSh)'
                }
              ]}
              height={300}
              margin={{ left: 50, right: 50, top: 30, bottom: 50 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>

          {/* Product Summary Card */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img 
                  src={previewImage} 
                  alt={product.title} 
                  className="h-32 w-32 rounded-2xl object-cover shadow-lg border-4 border-white mx-auto"
                />
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getBrandColor(product.brand)} rounded-full p-2`}>
                  <Star className="w-4 h-4 text-white" />
                </div>
                {product.featured && (
                  <div className="absolute -bottom-2 -left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    FEATURED
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Product ID:</span>
                <span className="font-mono text-xs text-gray-600">{product._id?.substring(0, 8)}...</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">SKU:</span>
                <span className="font-mono text-sm text-gray-700">{product.sku}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <Package className="w-4 h-4 mr-2 text-green-400" />
                  Stock Status:
                </span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`font-semibold ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="font-medium text-blue-800 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                  MOQ:
                </span>
                <span className="font-bold text-blue-700">{product.moq || 500} units</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
                <span className="font-medium text-green-800">Min Order Value:</span>
                <span className="font-bold text-green-700">KSh {metrics.minOrderValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
            <Edit className="w-6 h-6 mr-3 text-blue-600" />
            Product Information
          </h3>
          
          <form className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Fields */}
            <div className="xl:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={inputs.title || ''}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    name="brand"
                    value={inputs.brand || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  name="desc"
                  value={inputs.desc || ''}
                  onChange={handleChange}
                  placeholder="Enter detailed product description"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={inputs.category || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specifications
                  </label>
                  <input
                    type="text"
                    name="specifications"
                    value={inputs.specifications || ''}
                    onChange={handleChange}
                    placeholder="e.g., 500ml, A4 size"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Pricing Section */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Wholesale Pricing & MOQ
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wholesale Price (KSh) *
                    </label>
                    <input
                      type="number"
                      name="wholesalePrice"
                      value={inputs.wholesalePrice || ''}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Retail Price (KSh)
                    </label>
                    <input
                      type="number"
                      name="retailPrice"
                      value={inputs.retailPrice || ''}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      MOQ (Units) *
                    </label>
                    <input
                      type="number"
                      name="moq"
                      value={inputs.moq || ''}
                      onChange={handleChange}
                      placeholder="500"
                      min="1"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Live Pricing Analysis */}
                {inputs.wholesalePrice && inputs.retailPrice && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-blue-200">
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-700">Profit Margin</p>
                      <p className="text-2xl font-bold text-blue-800">{metrics.margin}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-700">Min Order Value</p>
                      <p className="text-2xl font-bold text-green-800">KSh {metrics.minOrderValue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-purple-700">Profit per Unit</p>
                      <p className="text-2xl font-bold text-purple-800">KSh {(inputs.retailPrice - inputs.wholesalePrice).toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={inputs.stock || ''}
                    onChange={handleChange}
                    placeholder="Available stock"
                    min="0"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SKU/Product Code
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={inputs.sku || ''}
                    onChange={handleChange}
                    placeholder="Product code"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Product
                  </label>
                  <select
                    name="featured"
                    value={inputs.featured || false}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload & Actions */}
            <div className="space-y-6">
              <div className="text-center">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Product Image
                </label>
                <div className="relative inline-block mb-4">
                  <img
                    src={previewImage}
                    alt="Product"
                    className="h-48 w-48 object-cover rounded-2xl border-4 border-gray-200 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <label htmlFor="file" className="cursor-pointer p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                      <Upload className="w-6 h-6 text-white" />
                    </label>
                  </div>
                </div>
                <input 
                  type="file" 
                  id="file" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden" 
                />
                <p className="text-xs text-gray-500 mt-2">
                  Click on image to upload new photo
                </p>
                {selectedImage && (
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    New image selected - will be uploaded on save
                  </p>
                )}
              </div>

              {/* Business Performance Insights */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Insights
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Conversion Rate:</span>
                    <span className="font-bold text-green-800">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Avg Quote Size:</span>
                    <span className="font-bold text-green-800">{inputs.moq ? Math.floor(inputs.moq * 1.8) : 900} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Revenue per Quote:</span>
                    <span className="font-bold text-green-800">KSh {Math.round(metrics.avgQuoteValue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-green-700">Total Quote Value:</span>
                    <span className="font-bold text-green-800">KSh {metrics.totalQuoteValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Updating Product...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Update Product
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  onClick={() => {
                    setInputs(product);
                    setPreviewImage(product.img);
                    setSelectedImage(null);
                  }}
                >
                  Reset Changes
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Danger Zone
                </h4>
                <p className="text-sm text-red-700 mb-3">
                  Permanently delete this product and all associated data.
                </p>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                      // Handle delete
                      console.log('Delete product');
                    }
                  }}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Recent Quote Requests */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <h4 className="text-xl font-semibold text-slate-700 mb-6 flex items-center">
            <Building className="w-6 h-6 mr-3 text-blue-600" />
            Recent Quote Requests for this Product
          </h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 rounded-t-xl">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-xl">Business</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentQuotes.map((quote, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-semibold">{quote.business.substring(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{quote.business}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-700">{quote.contact}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-blue-600">{quote.quantity.toLocaleString()} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">KSh {quote.value.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {quote.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              View All Quotes for this Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;