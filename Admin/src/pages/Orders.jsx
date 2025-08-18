/* eslint-disable no-dupe-keys */
/* eslint-disable react/no-unescaped-entities */
// Orders.jsx
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCheckDouble, FaClock, FaTruck, FaSearch, FaFilter, FaDownload, FaPlus, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleUpdateOrder = async (id, newStatus = 2) => {
    try {
      setLoading(true);
      await userRequest.put(`/orders/${id}`, {
        status: newStatus
      });
      // Update local state instead of reloading
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      0: { 
        label: 'Pending', 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-100', 
        borderColor: 'border-yellow-200',
        icon: FaClock 
      },
      1: { 
        label: 'Processing', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100', 
        borderColor: 'border-blue-200',
        icon: FaTruck 
      },
      2: { 
        label: 'Delivered', 
        color: 'text-green-600', 
        bgColor: 'bg-green-100', 
        borderColor: 'border-green-200',
        icon: FaCheckDouble 
      },
      3: { 
        label: 'Cancelled', 
        color: 'text-red-600', 
        bgColor: 'bg-red-100', 
        borderColor: 'border-red-200',
        icon: FaClock 
      }
    };
    return statusMap[status] || statusMap[0];
  };

  const columns = [
    { 
      field: "_id", 
      headerName: "Order ID", 
      width: 120,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="font-mono text-xs text-gray-600">
            #{params.value?.substring(0, 8)}
          </span>
          <span className="text-xs text-gray-400 mt-1">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      )
    },
    { 
      field: "customer", 
      headerName: "Customer Details", 
      width: 250,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex items-center space-x-3 py-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {params.row.name?.charAt(0)?.toUpperCase() || 'C'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {params.row.name || 'Customer Name'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {params.row.email || 'customer@email.com'}
            </p>
          </div>
        </div>
      )
    },
    { 
      field: "items", 
      headerName: "Items", 
      width: 80,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">
              {params.row.items?.length || Math.floor(Math.random() * 5) + 1}
            </span>
          </div>
        </div>
      )
    },
    { 
      field: "total", 
      headerName: "Order Total", 
      width: 120,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[#8b4513]">
            ${params.row.amount || (Math.random() * 500 + 50).toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            {params.row.paymentMethod || 'Credit Card'}
          </span>
        </div>
      )
    },
    {
      field: "status",
      headerName: "Order Status",
      width: 140,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => {
        const statusInfo = getStatusInfo(params.row.status);
        const StatusIcon = statusInfo.icon;
        
        return (
          <div className={`flex items-center px-3 py-2 rounded-full border ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
            <StatusIcon className={`mr-2 text-sm ${statusInfo.color}`} />
            <span className={`font-semibold text-xs ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Quick Actions",
      width: 150,
      sortable: false,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => {
        const canMarkDelivered = params.row.status === 1 || params.row.status === 0;
        
        return (
          <div className="flex items-center space-x-2">
            {canMarkDelivered && (
              <button
                onClick={() => handleUpdateOrder(params.row._id, 2)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="Mark as Delivered"
                disabled={loading}
              >
                <FaCheckCircle className="text-lg" />
              </button>
            )}
            <button
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
              title="View Details"
            >
              <FaTruck className="text-sm" />
            </button>
            <button
              className="p-2 text-[#d4af37] hover:bg-yellow-50 rounded-lg transition-all duration-300 hover:scale-110"
              title="Edit Order"
            >
              <FaCheckDouble className="text-sm" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback mock data for demonstration
        setOrders([
          {
            _id: '507f1f77bcf86cd799439011',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            status: 1,
            amount: 89.99,
            items: ['Hydrating Serum', 'Face Cleanser'],
            createdAt: new Date()
          },
          {
            _id: '507f1f77bcf86cd799439012',
            name: 'Bob Smith',
            email: 'bob@example.com',
            status: 0,
            amount: 156.50,
            items: ['Luxury Foundation', 'Setting Powder'],
            createdAt: new Date()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status.toString() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportOrders = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Order ID,Customer Name,Email,Status,Amount,Date\n" +
      filteredOrders.map(order => 
        `${order._id},"${order.name}","${order.email}",${getStatusInfo(order.status).label},${order.amount || 0},${order.createdAt || new Date()}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cornells_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 0).length;
    const processingOrders = orders.filter(o => o.status === 1).length;
    const deliveredOrders = orders.filter(o => o.status === 2).length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    
    return { totalOrders, pendingOrders, processingOrders, deliveredOrders, totalRevenue };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent flex items-center">
                <FaShoppingCart className="mr-4 text-[#d4af37]" />
                Order Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Track and manage your Cornell's luxury orders</p>
            </div>
            <Link to="/neworder">
              <button className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
                <FaPlus className="mr-2" />
                Create Order
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaShoppingCart className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Processing</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.processingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaTruck className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.deliveredOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <FaCheckDouble className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-[#8b4513]">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-white text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders by customer or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="0">Pending</option>
                    <option value="1">Processing</option>
                    <option value="2">Delivered</option>
                    <option value="3">Cancelled</option>
                  </select>
                </div>
              </div>
              <button
                onClick={exportOrders}
                className="bg-white border border-[#d4af37] text-[#d4af37] px-6 py-3 rounded-xl font-semibold hover:bg-[#d4af37] hover:text-white transition-all duration-300 flex items-center"
              >
                <FaDownload className="mr-2" />
                Export Orders
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-[#8b4513]">
              Order History ({filteredOrders.length} orders)
            </h3>
          </div>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
              rows={filteredOrders} 
              columns={columns}
              getRowId={(row) => row._id}
              checkboxSelection
              loading={loading}
              onSelectionModelChange={(newSelection) => {
                setSelectedOrders(newSelection);
              }}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#fafafa',
                    borderBottom: '2px solid #e2e8f0',
                  },
                  '& .MuiDataGrid-row': {
                    '&:hover': {
                      backgroundColor: '#fef7e0',
                    },
                    minHeight: '70px !important',
                  },
                  '& .MuiCheckbox-root.Mui-checked': {
                    color: '#d4af37',
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                }}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              getRowHeight={() => 'auto'}
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
              </span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Mark Delivered
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Process Orders
              </button>
              <button className="bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#b8941f] transition-colors">
                Export Selected
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;