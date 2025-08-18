/* eslint-disable no-unused-vars */
// Banner.jsx
import { useState, useEffect } from "react";
import { Plus, Trash2, Upload, Image as ImageIcon, Edit, Eye, Save, X, Play, Pause, Calendar, TrendingUp } from "lucide-react";
import { userRequest } from "../requestMethods";
import axios from "axios";

const Banner = () => {
  const [selectedImage, setSelectImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [previewBanner, setPreviewBanner] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const getBanners = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/banners");
        setBanners(res.data);
      } catch (error) {
        console.log(error);
        // Mock data for demonstration
        setBanners([
          {
            _id: "1",
            img: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Luxury Skincare Collection",
            subtitle: "Discover our premium range of Cornell's beauty products",
            isActive: true,
            createdAt: new Date().toISOString(),
            views: 15420,
            clicks: 324
          },
          {
            _id: "2",
            img: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "New Arrivals",
            subtitle: "Experience the latest in luxury beauty innovation",
            isActive: false,
            createdAt: new Date().toISOString(),
            views: 8932,
            clicks: 156
          },
          {
            _id: "3",
            img: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Summer Sale",
            subtitle: "Up to 50% off on selected premium beauty products",
            isActive: true,
            createdAt: new Date().toISOString(),
            views: 22105,
            clicks: 892
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }
    
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");
    
    setUploading(true);
    setUploadProgress("Uploading banner image...");
    
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkjenslgr/image/upload",
        data
      );
      const { url } = uploadRes.data;
      setImage(url);
      setUploadProgress("Creating banner...");
      
      const newBanner = { 
        img: url, 
        title: title.trim(), 
        subtitle: subtitle.trim(),
        isActive: true
      };
      
      const createRes = await userRequest.post("/banners", newBanner);
      setUploadProgress("Banner created successfully!");
      
      // Add new banner to state
      setBanners(prev => [createRes.data, ...prev]);
      
      // Reset form
      clearForm();
      
      setTimeout(() => {
        setUploadProgress("");
      }, 2000);
      
    } catch (error) {
      console.log(error);
      setUploadProgress("Upload failed. Please try again.");
      setTimeout(() => setUploadProgress(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setSelectImage(null);
    setTitle("");
    setSubtitle("");
    setImage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner? This action cannot be undone.')) {
      try {
        await userRequest.delete(`/banners/${id}`);
        setBanners(banners.filter(banner => banner._id !== id));
      } catch (error) {
        console.log(error);
        alert('Failed to delete banner. Please try again.');
      }
    }
  };

  const toggleBannerStatus = async (id) => {
    try {
      const banner = banners.find(b => b._id === id);
      const updatedBanner = { ...banner, isActive: !banner.isActive };
      
      await userRequest.put(`/banners/${id}`, updatedBanner);
      setBanners(banners.map(b => b._id === id ? updatedBanner : b));
    } catch (error) {
      console.log(error);
      alert('Failed to update banner status.');
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
  };

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    setUploading(true);
    setUploadProgress("Updating banner...");
    
    try {
      let imageUrl = editingBanner.img;
      
      // Upload new image if selected
      if (selectedImage) {
        const data = new FormData();
        data.append("file", selectedImage);
        data.append("upload_preset", "uploads");
        
        setUploadProgress("Uploading new image...");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dkjenslgr/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      }
      
      const updatedBanner = {
        ...editingBanner,
        img: imageUrl,
        title: title.trim(),
        subtitle: subtitle.trim()
      };
      
      await userRequest.put(`/banners/${editingBanner._id}`, updatedBanner);
      setBanners(banners.map(b => b._id === editingBanner._id ? updatedBanner : b));
      
      setUploadProgress("Banner updated successfully!");
      setEditingBanner(null);
      clearForm();
      
      setTimeout(() => {
        setUploadProgress("");
      }, 2000);
      
    } catch (error) {
      console.log(error);
      setUploadProgress("Update failed. Please try again.");
      setTimeout(() => setUploadProgress(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  const cancelEdit = () => {
    setEditingBanner(null);
    clearForm();
    setUploadProgress("");
  };

  const activeBanners = banners.filter(b => b.isActive);
  const totalViews = banners.reduce((sum, banner) => sum + (banner.views || 0), 0);
  const totalClicks = banners.reduce((sum, banner) => sum + (banner.clicks || 0), 0);
  const avgClickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b4513] font-medium">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent flex items-center">
            <ImageIcon className="mr-4 text-[#d4af37]" />
            Banner Management
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Create and manage promotional banners for your Cornells store</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Banners</p>
                <p className="text-3xl font-bold text-[#d4af37]">{banners.length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <ImageIcon className="text-xl text-[#d4af37]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Banners</p>
                <p className="text-3xl font-bold text-green-600">{activeBanners.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Play className="text-xl text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="text-xl text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-3xl font-bold text-purple-600">{avgClickRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="text-xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Active Banners - Left Side */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#8b4513] flex items-center">
                  <Eye className="mr-3 text-[#d4af37]" />
                  All Banners ({banners.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Click on banners to preview
                </div>
              </div>
              
              {banners.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ImageIcon className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No banners yet</h3>
                  <p className="text-gray-600">Create your first banner to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {banners.map((banner) => (
                    <div key={banner._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3 relative">
                          <img
                            src={banner.img}
                            alt={banner.title}
                            className="w-full h-48 md:h-full object-cover cursor-pointer"
                            onClick={() => setPreviewBanner(banner)}
                          />
                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {banner.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-[#8b4513] mb-2">
                              {banner.title}
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {banner.subtitle}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="text-sm">
                                <span className="text-gray-500">Views:</span>
                                <span className="font-semibold text-blue-600 ml-1">
                                  {(banner.views || 0).toLocaleString()}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Clicks:</span>
                                <span className="font-semibold text-green-600 ml-1">
                                  {(banner.clicks || 0).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              Created: {new Date(banner.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex space-x-2">
                              <button 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" 
                                title="Edit Banner"
                                onClick={() => handleEdit(banner)}
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-300" 
                                title="Preview"
                                onClick={() => setPreviewBanner(banner)}
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className={`p-2 rounded-lg transition-all duration-300 ${
                                  banner.isActive 
                                    ? 'text-red-600 hover:bg-red-50' 
                                    : 'text-green-600 hover:bg-green-50'
                                }`}
                                title={banner.isActive ? 'Deactivate' : 'Activate'}
                                onClick={() => toggleBannerStatus(banner._id)}
                              >
                                {banner.isActive ? <Pause size={18} /> : <Play size={18} />}
                              </button>
                            </div>
                            <button 
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                              onClick={() => handleDelete(banner._id)}
                            >
                              <Trash2 className="mr-2" size={18} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create/Edit Banner Form - Right Side */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#8b4513] flex items-center">
                  {editingBanner ? <Edit className="mr-3 text-[#d4af37]" /> : <Plus className="mr-3 text-[#d4af37]" />}
                  {editingBanner ? 'Edit Banner' : 'Create New Banner'}
                </h2>
                {editingBanner && (
                  <button
                    onClick={cancelEdit}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Cancel Edit"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <form onSubmit={editingBanner ? handleUpdateBanner : handleUpload} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Banner Image *
                  </label>
                  <div className="relative">
                    {!selectedImage && !editingBanner ? (
                      <div className="border-2 border-dashed border-[#d4af37] rounded-2xl p-8 text-center hover:bg-yellow-50 transition-colors cursor-pointer">
                        <label htmlFor="file" className="cursor-pointer">
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full mx-auto flex items-center justify-center">
                              <Upload className="text-2xl text-[#d4af37]" />
                            </div>
                            <div>
                              <p className="text-[#8b4513] font-medium">Click to upload banner</p>
                              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                              <p className="text-xs text-gray-400 mt-1">Recommended: 1920x600px</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={selectedImage ? URL.createObjectURL(selectedImage) : editingBanner?.img}
                          alt="Banner Preview"
                          className="w-full h-48 object-cover rounded-2xl border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                        {editingBanner && !selectedImage && (
                          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                            Current Image
                          </div>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      id="file"
                      onChange={imageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {editingBanner && !selectedImage && (
                      <div className="mt-2 text-center">
                        <label 
                          htmlFor="file" 
                          className="text-sm text-[#d4af37] hover:text-[#b8941f] cursor-pointer font-medium"
                        >
                          Change Image
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Progress */}
                  {uploadProgress && (
                    <div className="text-center">
                      <div className={`text-sm font-medium ${
                        uploadProgress.includes('successfully') ? 'text-green-600' : 
                        uploadProgress.includes('failed') ? 'text-red-600' : 'text-[#d4af37]'
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

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Banner Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter banner title"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Subtitle Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Banner Subtitle
                  </label>
                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter banner subtitle or description"
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading || (!selectedImage && !editingBanner) || !title.trim()}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {editingBanner ? 'Updating Banner...' : 'Creating Banner...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" />
                      {editingBanner ? 'Update Banner' : 'Create Banner'}
                    </>
                  )}
                </button>
                
                {editingBanner && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            {/* Banner Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <ImageIcon className="mr-2" size={18} />
                Banner Guidelines
              </h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Recommended size: 1920x600px</li>
                <li>• Format: JPG, PNG, WebP</li>
                <li>• Max file size: 5MB</li>
                <li>• High resolution for crisp display</li>
                <li>• Consider mobile responsiveness</li>
                <li>• Use contrasting colors for text</li>
              </ul>
            </div>

            {/* Banner Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-800 mb-3">💡 Pro Tips</h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Use high-contrast text for readability</li>
                <li>• Keep titles concise and impactful</li>
                <li>• Include clear call-to-action messages</li>
                <li>• Test banners on different screen sizes</li>
                <li>• Update banners regularly for freshness</li>
                <li>• A/B test different designs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {banners.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-[#8b4513] mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
                <Eye className="mr-2" size={18} />
                Preview All Banners
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center">
                <TrendingUp className="mr-2" size={18} />
                View Analytics
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center">
                <Calendar className="mr-2" size={18} />
                Schedule Banners
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#8b4513]">Banner Preview</h3>
              <button
                onClick={() => setPreviewBanner(null)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative">
                <img
                  src={previewBanner.img}
                  alt={previewBanner.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-xl flex items-center">
                  <div className="p-6 md:p-12 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{previewBanner.title}</h2>
                    {previewBanner.subtitle && (
                      <p className="text-lg md:text-xl opacity-90 max-w-lg">{previewBanner.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Banner Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-700 mb-2">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium text-blue-600">{(previewBanner.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-medium text-green-600">{(previewBanner.clicks || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CTR:</span>
                      <span className="font-medium text-purple-600">
                        {previewBanner.views > 0 ? ((previewBanner.clicks / previewBanner.views) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${previewBanner.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {previewBanner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-700">
                        {new Date(previewBanner.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-700 mb-2">Actions</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        setPreviewBanner(null);
                        handleEdit(previewBanner);
                      }}
                      className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Edit className="mr-2" size={16} />
                      Edit Banner
                    </button>
                    <button 
                      onClick={() => toggleBannerStatus(previewBanner._id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        previewBanner.isActive 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {previewBanner.isActive ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
                      {previewBanner.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;