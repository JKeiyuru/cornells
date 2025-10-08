/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// Admin/src/pages/NewProduct.jsx - Streamlined for Essential Fields Only
import { useState } from "react";
import { Plus, Trash2, Upload, Save, ArrowLeft, Image, Tag, Box, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    brand: "",
    categories: [], // Changed to array as per your model
    subcategory: "",
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "brand") {
      setSelectedOptions((prev) => ({
        ...prev,
        brand: value
      }));
    } else if (name === "category") {
      // Single category selection that goes into categories array
      setSelectedOptions((prev) => ({
        ...prev,
        categories: [value], // Wrap in array for model compatibility
        subcategory: "" // Reset subcategory when category changes
      }));
    } else if (name === "subcategory") {
      setSelectedOptions((prev) => ({
        ...prev,
        subcategory: value
      }));
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    if (!inputs.title || !inputs.desc || !inputs.wholesalePrice || !inputs.moq) {
      alert("Please fill in all required fields: Product Name, Description, Wholesale Price, and MOQ.");
      return;
    }

    if (!selectedOptions.brand || selectedOptions.categories.length === 0) {
      alert("Please select both Brand and Category.");
      return;
    }

    setUploading(true);
    setUploadProgress("Uploading image...");

    try {
      // Step 1: Upload image to backend
      const formData = new FormData();
      formData.append("file", selectedImage);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "token": `Bearer ${JSON.parse(localStorage.getItem("persist:root"))?.user ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken : ""}`
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(`Uploading: ${percent}%`);
          },
        }
      );

      const { url } = uploadRes.data;
      setUploadProgress("Image uploaded! Creating product...");

      // Step 2: Create product with uploaded image
      const productData = {
        img: url,
        images: [url], // Also add to images array
        title: inputs.title,
        description: inputs.desc, // Backend expects 'description', not 'desc'
        desc: inputs.desc, // Keep for backward compatibility
        brand: selectedOptions.brand,
        categories: selectedOptions.categories,
        subcategories: selectedOptions.subcategory ? [selectedOptions.subcategory] : [],
        wholesalePrice: parseFloat(inputs.wholesalePrice),
        moq: parseInt(inputs.moq),
        stock: parseInt(inputs.stock || 0),
        specifications: inputs.specifications || "",
        sku: inputs.sku || "",
        inStock: parseInt(inputs.stock || 0) > 0,
      };

      // Get token from localStorage
      const persistRoot = JSON.parse(localStorage.getItem("persist:root") || "{}");
      const user = persistRoot.user ? JSON.parse(persistRoot.user) : null;
      const token = user?.currentUser?.accessToken;

      const response = await axios.post(
        "http://localhost:5000/api/v1/products",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            "token": `Bearer ${token}`
          }
        }
      );

      setUploadProgress("Product created successfully! 🎉");
      setShowSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedImage(null);
        setInputs({});
        setSelectedOptions({ brand: "", categories: [], subcategory: "" });
        setUploadProgress("");
        setShowSuccess(false);
        // Optionally navigate to products list
        // navigate("/products");
      }, 2000);

    } catch (error) {
      console.error("Error creating product:", error);
      const errorMessage = error.response?.data?.message || error.message || "Upload failed";
      setUploadProgress(`❌ ${errorMessage}`);
      alert(`Failed to create product: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setSelectedImage(null);
    setInputs({});
    setSelectedOptions({ brand: "", categories: [], subcategory: "" });
    setUploadProgress("");
    setShowSuccess(false);
  };

  // Simplified Brand Options
  const brandOptions = [
    { value: "Rekker", label: "Rekker" },
    { value: "Saffron (by Rekker)", label: "Saffron (by Rekker)" },
    { value: "Cornells (Distributed by Rekker)", label: "Cornells (Distributed by Rekker)" }
  ];

  // Simplified Category Options
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

  // Subcategory options based on selected category
  const getSubcategoryOptions = () => {
    const category = selectedOptions.categories[0];
    switch (category) {
      case "Stationery":
        return ["Pens", "Pencils", "Rulers", "Rubbers", "Math Sets", "Photocopy Papers", "Notebooks", "Markers"];
      case "School Bags & Suitcases":
        return ["School Bags", "Backpacks", "Travel Suitcases", "Laptop Bags"];
      case "Party Items":
        return ["Paper Cups", "Paper Plates", "Cutlery", "Birthday Hats", "Cake Candles", "Balloons"];
      case "Educational Items":
        return ["Paintbrushes", "Canvas", "Modeling Clay", "Art Supplies"];
      case "Cleaning Products":
        return ["Handwash", "Dishwashing Soap", "Detergents", "All-Purpose Cleaners"];
      case "Beauty & Personal Care":
        return ["Lotions", "Sunscreens", "Toners", "Moisturizers", "After-shave"];
      case "Toys":
        return ["Educational Toys", "Action Figures", "Dolls", "Building Blocks"];
      case "Kitchenware":
        return ["Utensils", "Storage Containers", "Cookware", "Dinnerware"];
      case "Teddy Bears & Stuffed Toys":
        return ["Teddy Bears", "Stuffed Animals", "Plush Toys"];
      case "Padlocks":
        return ["Security Padlocks", "Combination Locks", "Key Locks"];
      default:
        return [];
    }
  };

  const isFormValid = selectedImage && inputs.title && inputs.desc && inputs.wholesalePrice && inputs.moq && selectedOptions.brand && selectedOptions.categories.length > 0;

  const getMinOrderValue = () => {
    if (inputs.wholesalePrice && inputs.moq) {
      return (parseFloat(inputs.wholesalePrice) * parseInt(inputs.moq)).toLocaleString();
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center animate-bounce">
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
                Add New Product
              </h1>
              <p className="text-gray-600 mt-2">Fill in the essential product details</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <form className="space-y-6">
            {/* Product Image */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Image className="mr-2 text-blue-600" />
                Product Image *
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
                        onClick={() => setSelectedImage(null)}
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
                  <p className="text-sm text-gray-600 mb-2">Upload a clear product image</p>
                  <p className="text-xs text-gray-500">Recommended: 1000x1000px, JPG or PNG, max 5MB</p>
                  {uploadProgress && (
                    <div className="mt-3">
                      <div className={`text-sm font-medium ${
                        uploadProgress.includes('successfully') ? 'text-green-600' : 
                        uploadProgress.includes('failed') || uploadProgress.includes('❌') ? 'text-red-600' : 
                        'text-blue-600'
                      }`}>
                        {uploadProgress}
                      </div>
                      {uploading && !uploadProgress.includes('failed') && !uploadProgress.includes('❌') && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Essential Product Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                <Tag className="mr-2 text-blue-600" />
                Essential Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Saffron Premium Hand Wash 500ml"
                    value={inputs.title || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Brand *
                  </label>
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
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Product Description *
                </label>
                <textarea
                  name="desc"
                  onChange={handleChange}
                  value={inputs.desc || ""}
                  rows={4}
                  placeholder="Describe your product features, benefits, and specifications..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={selectedOptions.categories[0] || ""}
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Subcategory (Optional)
                  </label>
                  <select
                    name="subcategory"
                    value={selectedOptions.subcategory}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    disabled={!selectedOptions.categories[0]}
                  >
                    <option value="">Select Subcategory</option>
                    {getSubcategoryOptions().map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Size/Specifications
                  </label>
                  <input
                    type="text"
                    name="specifications"
                    placeholder="e.g., 500ml, A4, 30cm"
                    value={inputs.specifications || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Available units"
                    min="0"
                    value={inputs.stock || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Auto-generated if empty"
                    value={inputs.sku || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Wholesale Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                Wholesale Pricing *
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Wholesale Price (KSh) *
                  </label>
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Minimum Order Qty (MOQ) *
                  </label>
                  <input
                    type="number"
                    name="moq"
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    min="1"
                    value={inputs.moq || ""}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Live Calculation */}
              {inputs.wholesalePrice && inputs.moq && (
                <div className="bg-white p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Minimum Order Value:</span>
                    <span className="text-2xl font-bold text-blue-800">KSh {getMinOrderValue()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || !isFormValid}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
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
                className="bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                onClick={clearForm}
              >
                Clear Form
              </button>
            </div>

            {/* Requirements Checklist */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Required Fields
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className={`flex items-center ${selectedImage ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedImage ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Product Image {selectedImage && '✓'}
                </div>
                <div className={`flex items-center ${inputs.title ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${inputs.title ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Product Name {inputs.title && '✓'}
                </div>
                <div className={`flex items-center ${inputs.desc ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${inputs.desc ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Description {inputs.desc && '✓'}
                </div>
                <div className={`flex items-center ${selectedOptions.brand ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedOptions.brand ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Brand {selectedOptions.brand && '✓'}
                </div>
                <div className={`flex items-center ${selectedOptions.categories.length > 0 ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedOptions.categories.length > 0 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Category {selectedOptions.categories.length > 0 && '✓'}
                </div>
                <div className={`flex items-center ${inputs.wholesalePrice ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${inputs.wholesalePrice ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  Wholesale Price {inputs.wholesalePrice && '✓'}
                </div>
                <div className={`flex items-center ${inputs.moq ? 'text-green-600' : 'text-amber-700'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${inputs.moq ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  MOQ {inputs.moq && '✓'}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800 font-medium">Completion:</span>
                  <span className={`font-bold ${isFormValid ? 'text-green-600' : 'text-amber-700'}`}>
                    {Math.round(([selectedImage, inputs.title, inputs.desc, selectedOptions.brand, selectedOptions.categories.length > 0, inputs.wholesalePrice, inputs.moq].filter(Boolean).length / 7) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;