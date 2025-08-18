/* eslint-disable no-unused-vars */
// Product.jsx
import { Link, useParams } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { Upload, Save, ArrowLeft, Edit, Eye, Package, Star, Heart, ShoppingCart, TrendingUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    _id: "123456",
    title: "Hydrating Facial Cleanser",
    img: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "A gentle cleanser that helps hydrate and remove makeup while maintaining skin's natural moisture barrier.",
    originalPrice: 15.99,
    discountedPrice: 12.99,
    inStock: true,
    brand: "Cornell's",
    categories: ["Skincare", "Cleansers"],
    rating: 4.8,
    reviews: 342,
    sales: 1250
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

  // Mock sales data for chart
  const salesData = [
    { month: 'Jan', sales: 420 },
    { month: 'Feb', sales: 680 },
    { month: 'Mar', sales: 520 },
    { month: 'Apr', sales: 890 },
    { month: 'May', sales: 750 },
    { month: 'Jun', sales: 1250 }
  ];

  if (loading && !product._id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#d4af37] font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/products"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all duration-300 text-[#d4af37]"
            >
              <ArrowLeft />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent flex items-center">
                <Edit className="mr-4 text-[#d4af37]" />
                Edit Product
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Modify your luxury product details</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link to="/newproduct">
              <button className="bg-white border border-[#d4af37] text-[#d4af37] px-6 py-3 rounded-xl font-semibold hover:bg-[#d4af37] hover:text-white transition-all duration-300 flex items-center">
                <Package className="mr-2" />
                Create New
              </button>
            </Link>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center">
              <Eye className="mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#8b4513] flex items-center">
                <TrendingUp className="mr-2 text-[#d4af37]" />
                Sales Performance
              </h3>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">Total Sales</p>
                  <p className="font-bold text-[#d4af37]">{product.sales || 1250}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-bold text-green-600">${((product.sales || 1250) * (product.discountedPrice || product.originalPrice)).toLocaleString()}</p>
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
                  data: [420, 680, 520, 890, 750, 1250],
                  color: '#d4af37',
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
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full p-2">
                  <Star className="text-white text-sm" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#8b4513] mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Product ID:</span>
                <span className="font-mono text-xs text-gray-600">{product._id?.substring(0, 8)}...</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <ShoppingCart className="mr-2 text-[#d4af37]" />
                  Total Sales:
                </span>
                <span className="font-bold text-[#d4af37]">{product.sales || 1250}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <Star className="mr-2 text-yellow-400" />
                  Rating:
                </span>
                <div className="flex items-center">
                  <span className="font-bold text-[#8b4513]">{product.rating || 4.8}</span>
                  <span className="text-gray-500 text-sm ml-1">({product.reviews || 342})</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 flex items-center">
                  <Heart className="mr-2 text-red-400" />
                  Stock Status:
                </span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`font-semibold ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold text-[#8b4513] mb-6 flex items-center">
            <Edit className="mr-3 text-[#d4af37]" />
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
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={inputs.brand || ''}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={inputs.originalPrice || ''}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discounted Price ($)
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={inputs.discountedPrice || ''}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    name="inStock"
                    value={inputs.inStock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  >
                    <option value={true}>In Stock</option>
                    <option value={false}>Out of Stock</option>
                  </select>
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
                      <Upload className="text-2xl text-white" />
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

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="mr-2" />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;