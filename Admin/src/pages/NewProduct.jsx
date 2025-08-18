/* eslint-disable no-unused-vars */
// NewProduct.jsx
import { useState } from "react";
import { Plus, Trash2, Upload, Save, ArrowLeft, Image, Tag, Box } from "lucide-react";
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
    concern: [],
    skintype: [],
    categories: [],
  });

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (!selectedOptions[name].includes(value)) {
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));
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

    if (!inputs.title || !inputs.desc || !inputs.originalPrice) {
      alert('Please fill in all required fields.');
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
        ...selectedOptions
      };
      
      await userRequest.post("/products", productData);
      setUploadProgress("Product created successfully!");
      
      // Reset form
      setTimeout(() => {
        setSelectImage(null);
        setInputs({});
        setImage("");
        setSelectedOptions({ concern: [], skintype: [], categories: [] });
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
    setSelectedOptions({ concern: [], skintype: [], categories: [] });
    setUploadProgress("");
  };

  const concernOptions = [
    "Dry Skin", "Pigmentation", "Oil Control", "Anti Acne", "Sunburn",
    "Skin Brightening", "Tan Removal", "Night Routine", "UV Protection",
    "Damaged Hair", "Frizzy Hair", "Stretch Marks", "Color Protection",
    "Dry Hair", "Soothing", "Dandruff", "Greying", "Hairfall",
    "Hair Color", "Well Being", "Acne", "Hair Growth"
  ];

  const skintypeOptions = ["All", "Oily", "Dry", "Sensitive", "Normal"];
  const categoryOptions = ["Serums", "Toners", "Lotions", "Foundations", "Moisturizers", "Cleansers", "Masks", "Treatments"];

  const isFormValid = selectedImage && inputs.title && inputs.desc && inputs.originalPrice;

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
                <Box className="mr-4 text-[#d4af37]" />
                Create New Product
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Add a new luxury item to your Cornells collection</p>
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
                <h3 className="text-lg font-semibold text-[#8b4513] mb-4 flex items-center">
                  <Image className="mr-2 text-[#d4af37]" />
                  Product Image
                </h3>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {!selectedImage ? (
                      <div className="border-2 border-dashed h-32 w-32 border-[#d4af37] rounded-2xl flex items-center justify-center bg-white hover:bg-yellow-50 transition-colors cursor-pointer">
                        <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                          <Plus className="text-2xl text-[#d4af37] mb-2" />
                          <span className="text-sm text-[#8b4513] font-medium">Add Image</span>
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
                          'text-[#d4af37]'
                        }`}>
                          {uploadProgress}
                        </div>
                        {uploading && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-[#d4af37] h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#8b4513] flex items-center">
                  <Tag className="mr-2 text-[#d4af37]" />
                  Product Details
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="Cornell's"
                      value={inputs.brand || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Product Description *</label>
                  <textarea
                    name="desc"
                    onChange={handleChange}
                    value={inputs.desc || ""}
                    rows={5}
                    placeholder="Describe your luxury product in detail..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Original Price ($) *</label>
                    <input
                      type="number"
                      name="originalPrice"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={inputs.originalPrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Discounted Price ($)</label>
                    <input
                      type="number"
                      name="discountedPrice"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={inputs.discountedPrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      name="inStock"
                      placeholder="100"
                      min="0"
                      value={inputs.inStock || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Size/Weight</label>
                    <input
                      type="text"
                      name="size"
                      placeholder="50ml, 100g, etc."
                      value={inputs.size || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Wholesale Information */}
              <div className="bg-blue-50 p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-semibold text-[#8b4513]">Wholesale Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Wholesale Price ($)</label>
                    <input
                      type="number"
                      name="wholesalePrice"
                      placeholder="50"
                      step="0.01"
                      min="0"
                      value={inputs.wholesalePrice || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Minimum Quantity</label>
                    <input
                      type="number"
                      name="wholesaleMinimunQuantity"
                      onChange={handleChange}
                      placeholder="10"
                      min="1"
                      value={inputs.wholesaleMinimunQuantity || ""}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Categories and Options */}
            <div className="space-y-8">
              {/* Skin Concerns */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-[#8b4513] mb-4">Skin Concerns</h3>
                <select
                  name="concern"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 mb-4"
                  onChange={handleSelectChange}
                  value=""
                >
                  <option value="" disabled>Select Concern</option>
                  {concernOptions.map((concern) => (
                    <option key={concern} value={concern}>{concern}</option>
                  ))}
                </select>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOptions.concern.map((option) => (
                    <div key={option} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-sm font-medium text-[#8b4513]">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption("concern", option)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  ))}
                  {selectedOptions.concern.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No concerns selected</p>
                  )}
                </div>
              </div>

              {/* Skin Type */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-[#8b4513] mb-4">Skin Type</h3>
                <select
                  name="skintype"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 mb-4"
                  onChange={handleSelectChange}
                  value=""
                >
                  <option value="" disabled>Select Skin Type</option>
                  {skintypeOptions.map((skintype) => (
                    <option key={skintype} value={skintype}>{skintype}</option>
                  ))}
                </select>
                
                <div className="space-y-2">
                  {selectedOptions.skintype.map((option) => (
                    <div key={option} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-[#8b4513]">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption("skintype", option)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  ))}
                  {selectedOptions.skintype.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No skin types selected</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-[#8b4513] mb-4">Product Categories</h3>
                <select
                  name="categories"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 mb-4"
                  onChange={handleSelectChange}
                  value=""
                >
                  <option value="" disabled>Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <div className="space-y-2">
                  {selectedOptions.categories.map((option) => (
                    <div key={option} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-[#8b4513]">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption("categories", option)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  ))}
                  {selectedOptions.categories.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No categories selected</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || !isFormValid}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
                    <span className="w-2 h-2 rounded-full mr-2 ${selectedImage ? 'bg-green-500' : 'bg-amber-500'}"></span>
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
                  <li className={`flex items-center ${inputs.originalPrice ? 'text-green-600' : ''}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inputs.originalPrice ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    Original Price
                  </li>
                </ul>
              </div>
            </div>
          </form>

          {/* Form Summary */}
          {(Object.keys(inputs).length > 0 || selectedOptions.concern.length > 0 || selectedOptions.skintype.length > 0 || selectedOptions.categories.length > 0) && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-[#8b4513] mb-4">Product Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Name:</strong> {inputs.title || 'Not specified'}</p>
                  <p><strong>Brand:</strong> {inputs.brand || 'Cornell\'s'}</p>
                  <p><strong>Description:</strong> {inputs.desc ? inputs.desc.substring(0, 100) + '...' : 'Not specified'}</p>
                  <p><strong>Original Price:</strong> ${inputs.originalPrice || '0.00'}</p>
                  <p><strong>Discounted Price:</strong> ${inputs.discountedPrice || 'N/A'}</p>
                  <p><strong>Stock:</strong> {inputs.inStock || 'Not specified'}</p>
                </div>
                <div>
                  <p><strong>Size:</strong> {inputs.size || 'Not specified'}</p>
                  <p><strong>Wholesale Price:</strong> ${inputs.wholesalePrice || 'N/A'}</p>
                  <p><strong>Min Quantity:</strong> {inputs.wholesaleMinimunQuantity || 'N/A'}</p>
                  <p><strong>Concerns:</strong> {selectedOptions.concern.length ? selectedOptions.concern.join(', ') : 'None'}</p>
                  <p><strong>Skin Types:</strong> {selectedOptions.skintype.length ? selectedOptions.skintype.join(', ') : 'None'}</p>
                  <p><strong>Categories:</strong> {selectedOptions.categories.length ? selectedOptions.categories.join(', ') : 'None'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;