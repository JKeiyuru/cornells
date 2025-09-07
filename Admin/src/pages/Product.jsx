/* eslint-disable no-unused-vars */
// Product.jsx - Rekker Product Edit
import { Link, useParams } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { Upload, Save, ArrowLeft, Edit, Eye, Box, Star, Building, TrendingUp, DollarSign, Package } from "lucide-react";
import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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
    quotesRequested: 42
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
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await userRequest.put(`/products/${inputs._id}`, inputs);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
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

  // Mock quote requests data for chart
  const quoteRequestsData = [
    { month: 'Jan', requests: 12 },
    { month: 'Feb', requests: 18 },
    { month: 'Mar', requests: 15 },
    { month: 'Apr', requests: 24 },
    { month: 'May', requests: 19 },
    { month: 'Jun', requests: 32 }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
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
              <p className="text-gray-600 mt-2 text-lg">Modify your Rekker product details</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Quote Requests Chart */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-700 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Quote Requests Performance
              </h3>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">Total Requests</p>
                  <p className="font-bold text-blue-600">{product.quotesRequested || 42}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Avg. Quote Value</p>
                  <p className="font-bold text-green-600">KSh {((product.quotesRequested || 42) * (product.wholesalePrice || 85.99) * (product.moq || 500) / (product.quotesRequested || 42)).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <LineChart
              xAxis={[{ 
                data: [1, 2, 3, 4, 5, 6],
                scaleType: 'point',
                label: 'Months'
              }]}
              series={[
                {
                  data: [12, 18, 15, 24, 19, 32],
                  color: '#2563eb',
                  curve: 'smooth'
                },
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
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-2">
                  <Star className="w-4 h-4 text-white" />
                </div>
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
                <span className="font-medium text-gray-700 flex items-center">
                  <Building className="w-4 h-4 mr-2 text-blue-600" />
                  Quote Requests:
                </span>
                <span className="font-bold text-blue-600">{product.quotesRequested || 42}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Rating:
                </span>
                <div className="flex items-center">
                  <span className="font-bold text-slate-700">{product.rating || 4.7}</span>
                  <span className="text-gray-500 text-sm ml-1">({product.reviews || 89})</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <Package className="w-4 h-4 mr-2 text-green-400" />
                  Stock Status:
                </span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`font-semibold ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
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
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
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
                    Product Name
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
                    Brand
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
                  Product Description
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
                    Category
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

              {/* Wholesale Pricing Section */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Wholesale Pricing & MOQ
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wholesale Price (KSh)
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
                      MOQ (Units)
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    name="inStock"
                    value={inputs.inStock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value={true}>In Stock</option>
                    <option value={false}>Out of Stock</option>
                  </select>
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
              </div>
            </div>

            {/* Image Upload */}
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
              </div>

              {/* Pricing Analysis */}
              {inputs.wholesalePrice && inputs.retailPrice && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">💰 Pricing Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Wholesale:</span>
                      <span className="font-bold text-green-800">KSh {inputs.wholesalePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Retail:</span>
                      <span className="font-bold text-green-800">KSh {inputs.retailPrice}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-green-700">Profit Margin:</span>
                      <span className="font-bold text-green-800">
                        {((inputs.retailPrice - inputs.wholesalePrice) / inputs.retailPrice * 100).toFixed(1)}%
                      </span>
                    </div>
                    {inputs.moq && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Min Order Value:</span>
                        <span className="font-bold text-green-800">
                          KSh {(inputs.wholesalePrice * inputs.moq).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
                
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel Changes
                </button>
              </div>

              {/* Business Insights */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">📊 Business Insights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Quote Requests:</span>
                    <span className="font-medium text-blue-800">{product.quotesRequested || 42}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Conversion Rate:</span>
                    <span className="font-medium text-blue-800">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Avg Quote Size:</span>
                    <span className="font-medium text-blue-800">{inputs.moq ? Math.floor(inputs.moq * 1.8) : 900} units</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-blue-700">Revenue Generated:</span>
                    <span className="font-bold text-blue-800">KSh {((product.quotesRequested || 42) * (inputs.wholesalePrice || 85.99) * (inputs.moq || 500) * 0.68).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Recent Quote Requests */}
          <div className="mt-8 border-t pt-8">
            <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" />
              Recent Quote Requests for this Product
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { business: "Nakumatt Supermarkets", quantity: 2500, status: "Quote Sent", date: "2 days ago" },
                { business: "Quickmart Limited", quantity: 1500, status: "Under Review", date: "5 days ago" },
                { business: "Carrefour Kenya", quantity: 5000, status: "Approved", date: "1 week ago" }
              ].map((quote, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900 text-sm">{quote.business}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      quote.status === 'Approved' ? 'bg-green-100 text-green-600' :
                      quote.status === 'Quote Sent' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Quantity: <span className="font-medium">{quote.quantity.toLocaleString()} units</span></p>
                  <p className="text-gray-600 text-sm mb-2">Value: <span className="font-medium">KSh {(quote.quantity * (inputs.wholesalePrice || 85.99)).toLocaleString()}</span></p>
                  <p className="text-gray-500 text-xs">{quote.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;