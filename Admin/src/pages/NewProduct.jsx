/* eslint-disable no-unused-vars */
// NewProduct.jsx - Enhanced Rekker Product Creation
import { useState } from "react";
import { Plus, Trash2, Upload, Save, ArrowLeft, Image, Tag, Box, Package, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userRequest } from "../requestMethods";

const NewProduct = () => {
  const [selectedImage, setSelectImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    brand: "",
    category: "",
    subcategory: [],
    targetMarket: [],
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "brand" || name === "category") {
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: value,
        // Reset subcategories when category changes
        ...(name === "category" && { subcategory: [] })
      }));
    } else {
      if (!selectedOptions[name].includes(value)) {
        setSelectedOptions((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      }
    }
  };

  const handleRemoveOption = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((option) => option !== value),
    }));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    if (!inputs.title || !inputs.desc || !inputs.wholesalePrice || !inputs.moq) {
      alert('Please fill in all required fields including wholesale price and MOQ.');
      return;
    }

    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");
    
    setUploading(true);
    setUploadProgress("Uploading image...");
    
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkjenslgr/image/upload",
        data
      );
      const { url } = uploadRes.data;
      setImage(url);
      setUploadProgress("Image uploaded successfully!");
      
      // Create product with the uploaded image
      const productData = {
        img: url,
        ...inputs,
        ...selectedOptions,
        // Convert string numbers to actual numbers
        wholesalePrice: parseFloat(inputs.wholesalePrice),
        retailPrice: parseFloat(inputs.retailPrice),
        moq: parseInt(inputs.moq),
        stock: parseInt(inputs.stock || 0),
        // Add additional fields for admin tracking
        createdAt: new Date().toISOString(),
        quotesRequested: 0,
        totalSales: 0,
        rating: 0,
        reviews: 0,
        inStock: inputs.stock > 0,
        // Add featured flag for homepage display
        featured: inputs.featured || false
      };
      
      // Uncomment when backend is ready
      // await userRequest.post("/products", productData);
      
      setUploadProgress("Product created successfully!");
      setShowSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setSelectImage(null);
        setInputs({});
        setImage("");
        setSelectedOptions({ brand: "", category: "", subcategory: [], targetMarket: [] });
        setUploadProgress("");
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.log(error);
      setUploadProgress("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setSelectImage(null);
    setInputs({});
    setImage("");
    setSelectedOptions({ brand: "", category: "", subcategory: [], targetMarket: [] });
    setUploadProgress("");
    setShowSuccess(false);
  };

  // Enhanced Brand Options with descriptions
  const brandOptions = [
    { value: "Rekker", label: "Rekker", desc: "Main Rekker products (stationery, bags, toys, etc.)" },
    { value: "Saffron (by Rekker)", label: "Saffron (by Rekker)", desc: "Cleaning products manufactured by Rekker" },
    { value: "Cornells (Distributed by Rekker)", label: "Cornells (Distributed by Rekker)", desc: "Beauty products distributed by Rekker" }
  ];

  // Enhanced Category Options
  const categoryOptions = [
    "Stationery", 
    "School Bags & Suitcases", 
    "Toys", 
    "Kitchenware", 
    "Padlocks", 
    "Teddy Bears & Stuffed Toys", 
    "Party Items", 
    "Educational Items",
    "Cleaning Products", // For Saffron
    "Beauty & Personal Care" // For Cornells
  ];

  // Enhanced subcategory options based on selected category
  const getSubcategoryOptions = () => {
    switch (selectedOptions.category) {
      case "Stationery":
        return ["Pens", "Pencils", "Rulers", "Rubbers", "Math Sets", "Photocopy Papers", "Notebooks", "Markers", "Staplers", "Paper Clips"];
      case "School Bags & Suitcases":
        return ["School Bags", "Backpacks", "Travel Suitcases", "Laptop Bags", "Sports Bags"];
      case "Party Items":
        return ["Paper Cups", "Paper Plates", "Cutlery", "Birthday Hats", "Cake Candles", "Number Candles", "Foil Balloons", "Normal Balloons", "Baby Shower Items", "Party Decorations"];
      case "Educational Items":
        return ["Paintbrushes", "Canvas", "Modeling Clay", "Art Supplies", "Drawing Books", "Colored Pencils", "Watercolors"];
      case "Cleaning Products":
        return ["Handwash", "Dishwashing Soap", "Detergents", "All-Purpose Cleaners", "Shower Gels", "Floor Cleaners"];
      case "Beauty & Personal Care":
        return ["Lotions", "Sunscreens", "Toners", "Moisturizers", "Serums", "After-shave", "Face Creams", "Body Oils"];
      case "Toys":
        return ["Educational Toys", "Action Figures", "Dolls", "Building Blocks", "Puzzles", "Board Games"];
      case "Kitchenware":
        return ["Utensils", "Storage Containers", "Cookware", "Dinnerware", "Kitchen Tools"];
      case "Teddy Bears & Stuffed Toys":
        return ["Teddy Bears", "Stuffed Animals", "Plush Toys", "Character Toys"];
      case "Padlocks":
        return ["Security Padlocks", "Combination Locks", "Key Locks", "Heavy Duty Locks"];
      default:
        return [];
    }
  };

  const targetMarketOptions = [
    "Supermarkets", 
    "Retail Chains", 
    "Schools", 
    "Offices", 
    "Wholesalers", 
    "Event Planners", 
    "Beauty Salons",
    "Hotels & Restaurants",
    "Online Retailers",
    "Individual Consumers"
  ];

  const isFormValid = selectedImage && inputs.title && inputs.desc && inputs.wholesalePrice && inputs.moq && selectedOptions.brand && selectedOptions.category;

  const calculateMargin = () => {
    if (inputs.wholesalePrice && inputs.retailPrice) {
      return (((inputs.retailPrice - inputs.wholesalePrice) / inputs.retailPrice) * 100).toFixed(1);
    }
    return 0;
  };

  const getMinOrderValue = () => {
    if (inputs.wholesalePrice && inputs.moq) {
      return (parseFloat(inputs.wholesalePrice) * parseInt(inputs.moq)).toLocaleString();
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Product created successfully!
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/products"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all duration-300 text-blue-600"
            >
              <ArrowLeft />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center">
                <Box className="mr-4 text-blue-600" />
                Create New Product
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Add a new product to your Rekker catalog</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <form className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Basic Information */}
            <div className="xl:col-span-2 space-y-8">
              {/* Product Image */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                  <Image className="mr-2 text-blue-600" />
                  Product Image
                </h3>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {!selectedImage ? (
                      <div className="border-2 border-dashed h-32 w-32 border-blue-400 rounded-2xl flex items-center justify-center bg-white hover:bg-blue-50 transition-colors cursor-pointer">
                        <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                          <Plus className="text-2xl text-blue-600 mb-2" />
                          <span className="text-sm text-slate-700 font-medium">Add Image</span>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Product Preview"
                          className="h-32 w-32 object-cover rounded-2xl border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file"
                      onChange={imageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Upload a high-quality product image</p>
                    <p className="text-xs text-gray-500">Recommended: 1000x1000px, JPG or PNG, max 5MB</p>
                    {uploadProgress && (
                      <div className="mt-3">
                        <div className={`text-sm font-medium ${
                          uploadProgress.includes('successfully') ? 'text-green-600' : 
                          uploadProgress.includes('failed') ? 'text-red-600' : 
                          'text-blue-600'
                        }`}>
                          {uploadProgress}
                        </div>
                        {uploading && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                  <Tag className="mr-2 text-blue-600" />
                  Product Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Name *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter product name"
                      value={inputs.title || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Brand *</label>
                    <select
                      name="brand"
                      value={selectedOptions.brand}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brandOptions.map((brand) => (
                        <option key={brand.value} value={brand.value}>{brand.label}</option>
                      ))}
                    </select>
                    {selectedOptions.brand && (
                      <p className="text-xs text-gray-500 mt-1">
                        {brandOptions.find(b => b.value === selectedOptions.brand)?.desc}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Product Description *</label>
                  <textarea
                    name="desc"
                    onChange={handleChange}
                    value={inputs.desc || ""}
                    rows={5}
                    placeholder="Describe your product in detail, include features and benefits..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Category *</label>
                    <select
                      name="category"
                      value={selectedOptions.category}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Size/Specifications</label>
                    <input
                      type="text"
                      name="specifications"
                      placeholder="e.g., 500ml, A4 size, etc."
                      value={inputs.specifications || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      placeholder="Available stock"
                      min="0"
                      value={inputs.stock || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">SKU/Product Code</label>
                    <input
                      type="text"
                      name="sku"
                      placeholder="Product code"
                      value={inputs.sku || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      Featured Product
                      <span className="ml-2 text-xs text-gray-500">(Homepage display)</span>
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

              {/* Wholesale Pricing */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                  <DollarSign className="mr-2 text-blue-600" />
                  Wholesale Pricing & MOQ
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Wholesale Price (KSh) *</label>
                    <input
                      type="number"
                      name="wholesalePrice"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={inputs.wholesalePrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Retail Price (KSh)</label>
                    <input
                      type="number"
                      name="retailPrice"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={inputs.retailPrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Minimum Order Qty (MOQ) *</label>
                    <input
                      type="number"
                      name="moq"
                      onChange={handleChange}
                      placeholder="100"
                      min="1"
                      value={inputs.moq || ""}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                {/* Live Pricing Analysis */}
                {inputs.wholesalePrice && inputs.retailPrice && inputs.moq && (
                  <div className="bg-white p-4 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Live Pricing Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-blue-700"><strong>Profit Margin:</strong></p>
                        <p className="text-lg font-bold text-blue-800">{calculateMargin()}%</p>
                      </div>
                      <div>
                        <p className="text-blue-700"><strong>Min Order Value:</strong></p>
                        <p className="text-lg font-bold text-blue-800">KSh {getMinOrderValue()}</p>
                      </div>
                      <div>
                        <p className="text-blue-700"><strong>Profit per Unit:</strong></p>
                        <p className="text-lg font-bold text-blue-800">KSh {(inputs.retailPrice - inputs.wholesalePrice).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-100 border border-blue-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pricing Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Wholesale price should be competitive for bulk buyers</li>
                    <li>• MOQ should align with your production/procurement capacity</li>
                    <li>• Retail price helps partners understand market positioning</li>
                    <li>• Consider shipping costs and partner margins in pricing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Categories and Options */}
            <div className="space-y-8">
              {/* Subcategories */}
              {selectedOptions.category && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Subcategories</h3>
                  {getSubcategoryOptions().length > 0 ? (
                    <>
                      <select
                        name="subcategory"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 mb-4"
                        onChange={handleSelectChange}
                        value=""
                      >
                        <option value="" disabled>Select Subcategory</option>
                        {getSubcategoryOptions().map((subcategory) => (
                          <option key={subcategory} value={subcategory}>{subcategory}</option>
                        ))}
                      </select>
                      
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedOptions.subcategory.map((option) => (
                          <div key={option} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="text-sm font-medium text-slate-700">{option}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOption("subcategory", option)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="text-sm" />
                            </button>
                          </div>
                        ))}
                        {selectedOptions.subcategory.length === 0 && (
                          <p className="text-gray-500 text-sm italic">No subcategories selected</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-gray-600 text-sm">No subcategories available for this category</p>
                    </div>
                  )}
                </div>
              )}

              {/* Target Market */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Target Market</h3>
                <select
                  name="targetMarket"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 mb-4"
                  onChange={handleSelectChange}
                  value=""
                >
                  <option value="" disabled>Select Target Market</option>
                  {targetMarketOptions.map((market) => (
                    <option key={market} value={market}>{market}</option>
                  ))}
                </select>
                
                <div className="space-y-2">
                  {selectedOptions.targetMarket.map((option) => (
                    <div key={option} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-slate-700">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption("targetMarket", option)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  ))}
                  {selectedOptions.targetMarket.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No target markets selected</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || !isFormValid}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Product...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" />
                      Create Product
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  onClick={clearForm}
                >
                  Clear Form
                </button>
              </div>

              {/* Enhanced Requirements Checklist */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Requirements Checklist
                </h4>
                <ul className="text-sm space-y-2">
                  <li className={`flex items-center ${selectedImage ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${selectedImage ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Product Image {selectedImage && '✓'}
                  </li>
                  <li className={`flex items-center ${inputs.title ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${inputs.title ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Product Name {inputs.title && '✓'}
                  </li>
                  <li className={`flex items-center ${inputs.desc ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${inputs.desc ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Description {inputs.desc && '✓'}
                  </li>
                  <li className={`flex items-center ${selectedOptions.brand ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${selectedOptions.brand ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Brand Selection {selectedOptions.brand && '✓'}
                  </li>
                  <li className={`flex items-center ${selectedOptions.category ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${selectedOptions.category ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Category {selectedOptions.category && '✓'}
                  </li>
                  <li className={`flex items-center ${inputs.wholesalePrice ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${inputs.wholesalePrice ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Wholesale Price {inputs.wholesalePrice && '✓'}
                  </li>
                  <li className={`flex items-center ${inputs.moq ? 'text-green-600' : 'text-amber-700'}`}>
                    <div className={`w-2 h-2 rounded-full mr-3 ${inputs.moq ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    Minimum Order Quantity {inputs.moq && '✓'}
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800 font-medium">Form Completion:</span>
                    <span className={`font-bold ${isFormValid ? 'text-green-600' : 'text-amber-700'}`}>
                      {Math.round(([selectedImage, inputs.title, inputs.desc, selectedOptions.brand, selectedOptions.category, inputs.wholesalePrice, inputs.moq].filter(Boolean).length / 7) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand Guidelines */}
              {selectedOptions.brand && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Brand Guidelines</h4>
                  {selectedOptions.brand.includes('Saffron') && (
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Saffron Products:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Focus on cleaning and hygiene products</li>
                        <li>Emphasize antibacterial and cleaning properties</li>
                        <li>Target commercial and residential markets</li>
                        <li>Include "Manufactured by Rekker" in descriptions</li>
                      </ul>
                    </div>
                  )}
                  {selectedOptions.brand.includes('Cornells') && (
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Cornells Products:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Focus on beauty and personal care products</li>
                        <li>Emphasize quality and skin benefits</li>
                        <li>Target beauty salons and individual consumers</li>
                        <li>Note "Distributed by Rekker" relationship</li>
                      </ul>
                    </div>
                  )}
                  {selectedOptions.brand === 'Rekker' && (
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Rekker Products:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Focus on quality and durability</li>
                        <li>Emphasize practical and educational value</li>
                        <li>Target schools, offices, and retail markets</li>
                        <li>Highlight bulk ordering advantages</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Enhanced Form Summary */}
          {(Object.keys(inputs).length > 0 || selectedOptions.brand || selectedOptions.category) && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                Product Summary Preview
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Name:</span>
                    <span className="text-gray-900">{inputs.title || 'Not specified'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Brand:</span>
                    <span className="text-gray-900">{selectedOptions.brand || 'Not selected'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Category:</span>
                    <span className="text-gray-900">{selectedOptions.category || 'Not selected'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Stock:</span>
                    <span className="text-gray-900">{inputs.stock || 'Not specified'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">SKU:</span>
                    <span className="text-gray-900">{inputs.sku || 'Auto-generated'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Wholesale:</span>
                    <span className="text-gray-900 font-semibold">KSh {inputs.wholesalePrice || '0.00'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Retail:</span>
                    <span className="text-gray-900">KSh {inputs.retailPrice || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">MOQ:</span>
                    <span className="text-gray-900 font-semibold">{inputs.moq || 'Not specified'} units</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Featured:</span>
                    <span className="text-gray-900">{inputs.featured ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Specs:</span>
                    <span className="text-gray-900">{inputs.specifications || 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              {inputs.desc && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="text-gray-900 mt-1 text-sm">{inputs.desc}</p>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Subcategories:</span>
                    <p className="text-gray-900 text-sm mt-1">
                      {selectedOptions.subcategory.length ? selectedOptions.subcategory.join(', ') : 'None selected'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Target Markets:</span>
                    <p className="text-gray-900 text-sm mt-1">
                      {selectedOptions.targetMarket.length ? selectedOptions.targetMarket.join(', ') : 'None selected'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Pricing Analysis */}
              {inputs.wholesalePrice && inputs.retailPrice && inputs.moq && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-blue-600 font-medium">PROFIT MARGIN</p>
                      <p className="text-lg font-bold text-blue-800">{calculateMargin()}%</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-green-600 font-medium">MIN ORDER VALUE</p>
                      <p className="text-lg font-bold text-green-800">KSh {getMinOrderValue()}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-purple-600 font-medium">PROFIT PER UNIT</p>
                      <p className="text-lg font-bold text-purple-800">KSh {(inputs.retailPrice - inputs.wholesalePrice).toFixed(2)}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-orange-600 font-medium">BULK DISCOUNT</p>
                      <p className="text-lg font-bold text-orange-800">{(((inputs.retailPrice - inputs.wholesalePrice) / inputs.retailPrice) * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;