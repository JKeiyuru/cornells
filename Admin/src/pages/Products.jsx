/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { userRequest } from '../requestMethods';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Mock data - replace with API call
  const mockProducts = [
    {
      _id: '1',
      title: 'Saffron Handwash 500ml',
      brand: 'Saffron',
      category: 'Cleaning Products',
      wholesalePrice: 450,
      retailPrice: 650,
      moq: 500,
      stock: 2500,
      img: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      quoteRequests: 42,
      totalSales: 15620,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      title: 'Rekker A4 Photocopy Paper',
      brand: 'Rekker',
      category: 'Stationery',
      wholesalePrice: 320,
      retailPrice: 450,
      moq: 1000,
      stock: 5000,
      img: 'https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      quoteRequests: 38,
      totalSales: 22450,
      createdAt: '2024-01-12'
    },
    {
      _id: '3',
      title: 'Cornells Premium Lotion 250ml',
      brand: 'Cornells',
      category: 'Beauty & Personal Care',
      wholesalePrice: 680,
      retailPrice: 950,
      moq: 300,
      stock: 1200,
      img: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      quoteRequests: 29,
      totalSales: 18750,
      createdAt: '2024-01-10'
    },
    {
      _id: '4',
      title: 'Rekker School Backpack',
      brand: 'Rekker',
      category: 'School Bags',
      wholesalePrice: 1250,
      retailPrice: 1800,
      moq: 100,
      stock: 450,
      img: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      quoteRequests: 18,
      totalSales: 12400,
      createdAt: '2024-01-08'
    },
    {
      _id: '5',
      title: 'Saffron Dishwashing Liquid 1L',
      brand: 'Saffron',
      category: 'Cleaning Products',
      wholesalePrice: 380,
      retailPrice: 520,
      moq: 250,
      stock: 0,
      img: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'out_of_stock',
      quoteRequests: 15,
      totalSales: 8950,
      createdAt: '2024-01-05'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const res = await userRequest.get('/products/admin/all');
      // setProducts(res.data);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await userRequest.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const getBrandColor = (brand) => {
    switch (brand) {
      case 'Rekker':
        return 'bg-gradient-to-r from-blue-600 to-green-600 text-white';
      case 'Saffron':
        return 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white';
      case 'Cornells':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'out_of_stock':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price_high':
        return b.wholesalePrice - a.wholesalePrice;
      case 'price_low':
        return a.wholesalePrice - b.wholesalePrice;
      case 'sales_high':
        return b.totalSales - a.totalSales;
      case 'name_az':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalStats = {
    totalProducts: products.length,
    totalQuotes: products.reduce((sum, p) => sum + p.quoteRequests, 0),
    totalSales: products.reduce((sum, p) => sum + p.totalSales, 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.totalSales * p.wholesalePrice), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center">
              <Package className="w-8 h-8 mr-4 text-blue-600" />
              Products Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage your wholesale product catalog</p>
          </div>
          <Link to="/newproduct">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-slate-700">{totalStats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Package className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Quote Requests</p>
                <p className="text-3xl font-bold text-slate-700">{totalStats.totalQuotes}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <ShoppingCart className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-slate-700">{totalStats.totalSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-700">KSh {totalStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <DollarSign className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
              >
                <option value="all">All Brands</option>
                <option value="Rekker">Rekker</option>
                <option value="Saffron">Saffron</option>
                <option value="Cornells">Cornells</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-40"
              >
                <option value="all">All Categories</option>
                <option value="Stationery">Stationery</option>
                <option value="Cleaning Products">Cleaning Products</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="School Bags">School Bags</option>
                <option value="Toys">Toys</option>
                <option value="Kitchenware">Kitchenware</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-36"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
                <option value="sales_high">Sales: High to Low</option>
                <option value="name_az">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div key={product._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBrandColor(product.brand)}`}>
                      {product.brand}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {getStatusIcon(product.status)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{product.category}</p>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Wholesale</p>
                      <p className="text-lg font-bold text-blue-600">KSh {product.wholesalePrice}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Retail</p>
                      <p className="text-lg font-bold text-green-600">KSh {product.retailPrice}</p>
                    </div>
                  </div>

                  {/* MOQ and Stock */}
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">MOQ: </span>
                      <span className="font-semibold text-slate-700">{product.moq} units</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Stock: </span>
                      <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock} units
                      </span>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Quotes</p>
                      <p className="font-bold text-slate-700">{product.quoteRequests}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Sales</p>
                      <p className="font-bold text-slate-700">{product.totalSales}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Revenue</p>
                      <p className="font-bold text-slate-700">KSh {(product.totalSales * product.wholesalePrice).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center text-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center text-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && !loading && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or add a new product</p>
            <Link to="/newproduct">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center mx-auto">
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </button>
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && productToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Delete Product</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "<strong>{productToDelete.title}</strong>"? 
                  This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setProductToDelete(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(productToDelete._id)}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;