/* eslint-disable no-unused-vars */
// NewProduct.jsx - Rekker Product Creation
import { useState } from "react";
import { Plus, Trash2, Upload, Save, ArrowLeft, Image, Tag, Box, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userRequest } from "../requestMethods";

const NewProduct = () => {
  const [selectedImage, setSelectImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
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
        stock: parseInt(inputs.stock || 0)
      };
      
      await userRequest.post("/products", productData);
      setUploadProgress("Product created successfully!");
      
      // Reset form
      setTimeout(() => {
        setSelectImage(null);
        setInputs({});
        setImage("");
        setSelectedOptions({ brand: "", category: "", subcategory: [], targetMarket: [] });
        setUploadProgress("");
      }, 2000);
      
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
  };

  // Rekker Brand Options
  const brandOptions = [
    "Rekker", 
    "Saffron (by Rekker)", 
    "Cornells (Distributed by Rekker)"
  ];

  // Category Options
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

  // Subcategory options based on selected category
  const getSubcategoryOptions = () => {
    switch (selectedOptions.category) {
      case "Stationery":
        return ["Pens", "Pencils", "Rulers", "Rubbers", "Math Sets", "Photocopy Papers", "Notebooks", "Markers"];
      case "Party Items":
        return ["Paper Cups", "Paper Plates", "Cutlery", "Birthday Hats", "Cake Candles", "Number Candles", "Foil Balloons", "Normal Balloons", "Baby Shower Items"];
      case "Educational Items":
        return ["Paintbrushes", "Canvas", "Modeling Clay", "Art Supplies", "Drawing Books"];
      case "Cleaning Products":
        return ["Handwash", "Dishwashing Soap", "Detergents", "All-Purpose Cleaners"];
      case "Beauty & Personal Care":
        return ["Lotions", "Sunscreens", "Toners", "Moisturizers", "Serums", "After-shave"];
      case "Toys":
        return ["Educational Toys", "Action Figures", "Dolls", "Building Blocks", "Puzzles"];
      case "Kitchenware":
        return ["Utensils", "Storage Containers", "Cookware", "Dinnerware"];
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
    "Hotels & Restaurants"
  ];

  const isFormValid = selectedImage && inputs.title && inputs.desc && inputs.wholesalePrice && inputs.moq;

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
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <div className="bg-blue-100 border border-blue-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pricing Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Wholesale price should be competitive for bulk buyers</li>
                    <li>• MOQ should align with your production/procurement capacity</li>
                    <li>• Retail price helps partners understand market positioning</li>
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

              {/* Requirements */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">Required Fields</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li className={`flex items-center ${selectedImage ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedImage ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Product Image
                  </li>
                  <li className={`flex items-center ${inputs.title ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inputs.title ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Product Name
                  </li>
                  <li className={`flex items-center ${inputs.desc ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inputs.desc ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Product Description
                  </li>
                  <li className={`flex items-center ${inputs.wholesalePrice ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inputs.wholesalePrice ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Wholesale Price
                  </li>
                  <li className={`flex items-center ${inputs.moq ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inputs.moq ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Minimum Order Quantity
                  </li>
                  <li className={`flex items-center ${selectedOptions.brand ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedOptions.brand ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Brand Selection
                  </li>
                </ul>
              </div>
            </div>
          </form>

          {/* Form Summary */}
          {(Object.keys(inputs).length > 0 || selectedOptions.brand || selectedOptions.category) && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Product Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Name:</strong> {inputs.title || 'Not specified'}</p>
                  <p><strong>Brand:</strong> {selectedOptions.brand || 'Not selected'}</p>
                  <p><strong>Category:</strong> {selectedOptions.category || 'Not selected'}</p>
                  <p><strong>Description:</strong> {inputs.desc ? inputs.desc.substring(0, 100) + '...' : 'Not specified'}</p>
                  <p><strong>Specifications:</strong> {inputs.specifications || 'Not specified'}</p>
                  <p><strong>Stock:</strong> {inputs.stock || 'Not specified'}</p>
                </div>
                <div>
                  <p><strong>Wholesale Price:</strong> KSh {inputs.wholesalePrice || '0.00'}</p>
                  <p><strong>Retail Price:</strong> KSh {inputs.retailPrice || 'N/A'}</p>
                  <p><strong>MOQ:</strong> {inputs.moq || 'Not specified'} units</p>
                  <p><strong>SKU:</strong> {inputs.sku || 'Auto-generated'}</p>
                  <p><strong>Subcategories:</strong> {selectedOptions.subcategory.length ? selectedOptions.subcategory.join(', ') : 'None'}</p>
                  <p><strong>Target Markets:</strong> {selectedOptions.targetMarket.length ? selectedOptions.targetMarket.join(', ') : 'None'}</p>
                </div>
              </div>
              
              {/* Pricing Analysis */}
              {inputs.wholesalePrice && inputs.retailPrice && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">💰 Pricing Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700"><strong>Wholesale Price:</strong> KSh {inputs.wholesalePrice}</p>
                    </div>
                    <div>
                      <p className="text-blue-700"><strong>Retail Price:</strong> KSh {inputs.retailPrice}</p>
                    </div>
                    <div>
                      <p className="text-blue-700">
                        <strong>Margin:</strong> {inputs.retailPrice && inputs.wholesalePrice ? 
                          `${(((inputs.retailPrice - inputs.wholesalePrice) / inputs.retailPrice) * 100).toFixed(1)}%` : 
                          'N/A'}
                      </p>
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