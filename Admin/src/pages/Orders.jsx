/* eslint-disable no-dupe-keys */
/* eslint-disable react/no-unescaped-entities */
// Orders.jsx - Rekker Quote Requests Management
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCheckDouble, FaClock, FaTruck, FaSearch, FaFilter, FaDownload, FaPlus, FaFileText, FaDollarSign, FaEye, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FileText, Building, Quote, Send, MessageSquare } from "lucide-react";
import { userRequest } from "../requestMethods";

const Orders = () => {
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);

  const handleUpdateQuoteRequest = async (id, newStatus = 2) => {
    try {
      setLoading(true);
      await userRequest.put(`/quote-requests/${id}`, {
        status: newStatus
      });
      // Update local state instead of reloading
      setQuoteRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating quote request:', error);
      alert('Failed to update quote request status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      0: { 
        label: 'New Request', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100', 
        borderColor: 'border-blue-200',
        icon: FaFileText 
      },
      1: { 
        label: 'Under Review', 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-100', 
        borderColor: 'border-yellow-200',
        icon: FaClock 
      },
      2: { 
        label: 'Quote Sent', 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-100', 
        borderColor: 'border-purple-200',
        icon: FaTruck 
      },
      3: { 
        label: 'Negotiation', 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-100', 
        borderColor: 'border-orange-200',
        icon: FaEdit 
      },
      4: { 
        label: 'Approved', 
        color: 'text-green-600', 
        bgColor: 'bg-green-100', 
        borderColor: 'border-green-200',
        icon: FaCheckDouble 
      },
      5: { 
        label: 'Rejected', 
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
      headerName: "Request ID", 
      width: 120,
      headerClassName: 'font-semibold text-slate-700',
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
      field: "business", 
      headerName: "Business Details", 
      width: 280,
      headerClassName: 'font-semibold text-slate-700',
      renderCell: (params) => (
        <div className="flex items-center space-x-3 py-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {params.row.businessName?.charAt(0)?.toUpperCase() || 'B'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {params.row.businessName || 'Business Name'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {params.row.contactPerson || 'Contact Person'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {params.row.email || 'email@business.com'}
            </p>
          </div>
        </div>
      )
    },
    { 
      field: "products", 
      headerName: "Products", 
      width: 100,
      headerClassName: 'font-semibold text-slate-700',
      renderCell: (params) => (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">
              {params.row.products?.length || Math.floor(Math.random() * 8) + 1}
            </span>
          </div>
        </div>
      )
    },
    { 
      field: "totalValue", 
      headerName: "Quote Value", 
      width: 140,
      headerClassName: 'font-semibold text-slate-700',
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-700">
            KSh {params.row.totalValue?.toLocaleString() || (Math.random() * 500000 + 50000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
          <span className="text-xs text-gray-500">
            MOQ: {params.row.totalQuantity || Math.floor(Math.random() * 5000) + 500} units
          </span>
        </div>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: 'font-semibold text-slate-700',
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
      field: "urgency", 
      headerName: "Priority", 
      width: 100,
      headerClassName: 'font-semibold text-slate-700',
      renderCell: (params) => {
        const urgency = params.row.urgency || ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
        const urgencyColors = {
          'Low': 'bg-gray-100 text-gray-600 border-gray-200',
          'Medium': 'bg-yellow-100 text-yellow-600 border-yellow-200',
          'High': 'bg-red-100 text-red-600 border-red-200'
        };
        
        return (
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${urgencyColors[urgency]}`}>
            {urgency}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      headerClassName: 'font-semibold text-slate-700',
      renderCell: (params) => {
        const canSendQuote = params.row.status === 0 || params.row.status === 1;
        const canApprove = params.row.status === 2 || params.row.status === 3;
        
        return (
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
              title="View Details"
            >
              <FaEye className="text-sm" />
            </button>
            
            {canSendQuote && (
              <button
                onClick={() => handleUpdateQuoteRequest(params.row._id, 2)}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="Send Quote"
                disabled={loading}
              >
                <Send className="text-sm" />
              </button>
            )}
            
            {canApprove && (
              <button
                onClick={() => handleUpdateQuoteRequest(params.row._id, 4)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="Approve Request"
                disabled={loading}
              >
                <FaCheckCircle className="text-sm" />
              </button>
            )}
            
            <button
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300 hover:scale-110"
              title="Send Message"
            >
              <MessageSquare className="text-sm" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getQuoteRequests = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/quote-requests");
        // Ensure the response data is an array
        const requestsData = Array.isArray(res.data) ? res.data : [];
        setQuoteRequests(requestsData);
      } catch (error) {
        console.error('Error fetching quote requests:', error);
        // Fallback mock data for demonstration
        setQuoteRequests([
          {
            _id: '507f1f77bcf86cd799439011',
            businessName: 'Nakumatt Supermarkets Ltd',
            contactPerson: 'Sarah Kamau',
            email: 'sarah@nakumatt.co.ke',
            status: 1,
            totalValue: 458900,
            totalQuantity: 5000,
            products: ['Saffron Handwash', 'Cornells Lotion', 'Stationery Bundle'],
            urgency: 'High',
            createdAt: new Date()
          },
          {
            _id: '507f1f77bcf86cd799439012',
            businessName: 'Quickmart Limited',
            contactPerson: 'David Mwangi',
            email: 'david@quickmart.co.ke',
            status: 0,
            totalValue: 267500,
            totalQuantity: 2500,
            products: ['Party Items', 'Kitchenware'],
            urgency: 'Medium',
            createdAt: new Date()
          },
          {
            _id: '507f1f77bcf86cd799439013',
            businessName: 'Carrefour Kenya',
            contactPerson: 'Grace Njeri',
            email: 'grace@carrefour.ke',
            status: 2,
            totalValue: 892400,
            totalQuantity: 10000,
            products: ['Cleaning Products Range', 'Educational Items'],
            urgency: 'High',
            createdAt: new Date()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    getQuoteRequests();
  }, []);

  // Ensure quoteRequests is always an array before filtering
  const safeRequests = Array.isArray(quoteRequests) ? quoteRequests : [];
  
  const filteredRequests = safeRequests.filter(request => {
    const matchesSearch = request.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status.toString() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportRequests = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Request ID,Business Name,Contact Person,Email,Status,Total Value,Quantity,Date\n" +
      filteredRequests.map(request => 
        `${request._id},"${request.businessName}","${request.contactPerson}","${request.email}",${getStatusInfo(request.status).label},${request.totalValue || 0},${request.totalQuantity || 0},${request.createdAt || new Date()}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rekker_quote_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRequestStats = () => {
    const totalRequests = safeRequests.length;
    const newRequests = safeRequests.filter(r => r.status === 0).length;
    const underReview = safeRequests.filter(r => r.status === 1).length;
    const quotesSent = safeRequests.filter(r => r.status === 2).length;
    const approved = safeRequests.filter(r => r.status === 4).length;
    const totalValue = safeRequests.reduce((sum, request) => sum + (request.totalValue || 0), 0);
    
    return { totalRequests, newRequests, underReview, quotesSent, approved, totalValue };
  };

  const stats = getRequestStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center">
                <Quote className="mr-4 text-blue-600" />
                Quote Request Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage wholesale quote requests and business partnerships</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/quotes/new">
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
                  <FaPlus className="mr-2" />
                  Create Quote
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Requests</p>
                  <p className="text-2xl font-bold text-slate-700">{stats.totalRequests}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">New</p>
                  <p className="text-2xl font-bold text-slate-700">{stats.newRequests}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaFileText className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Under Review</p>
                  <p className="text-2xl font-bold text-slate-700">{stats.underReview}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Quotes Sent</p>
                  <p className="text-2xl font-bold text-slate-700">{stats.quotesSent}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaTruck className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Approved</p>
                  <p className="text-2xl font-bold text-slate-700">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <FaCheckDouble className="text-white text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Value</p>
                  <p className="text-lg font-bold text-slate-700">KSh {stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
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
                    placeholder="Search by business name, contact, or request ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="0">New Request</option>
                    <option value="1">Under Review</option>
                    <option value="2">Quote Sent</option>
                    <option value="3">Negotiation</option>
                    <option value="4">Approved</option>
                    <option value="5">Rejected</option>
                  </select>
                </div>
              </div>
              <button
                onClick={exportRequests}
                className="bg-white border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <FaDownload className="mr-2" />
                Export Requests
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-slate-700">
              Quote Requests ({filteredRequests.length} requests)
            </h3>
          </div>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
              rows={filteredRequests} 
              columns={columns}
              getRowId={(row) => row._id}
              checkboxSelection
              loading={loading}
              onSelectionModelChange={(newSelection) => {
                setSelectedRequests(newSelection);
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
                  backgroundColor: '#f8fafc',
                  borderBottom: '2px solid #e2e8f0',
                },
                '& .MuiDataGrid-row': {
                  '&:hover': {
                    backgroundColor: '#eff6ff',
                  },
                  minHeight: '70px !important',
                },
                '& .MuiCheckbox-root.Mui-checked': {
                  color: '#2563eb',
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
        {selectedRequests.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
              </span>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center">
                <Send className="mr-2" size={16} />
                Send Quotes
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                <FaCheckCircle className="mr-2" />
                Approve Selected
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <FaDownload className="mr-2" />
                Export Selected
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
              <Building className="mr-2 text-blue-600" />
              Top Requesting Businesses
            </h3>
            <div className="space-y-3">
              {['Nakumatt Supermarkets', 'Quickmart Limited', 'Carrefour Kenya'].map((business, index) => (
                <div key={business} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">{business.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{business}</span>
                  </div>
                  <span className="text-blue-600 font-bold">{3 - index} requests</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
              <FaDollarSign className="mr-2 text-green-600" />
              Value Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                <span className="text-green-800 font-medium">Average Quote</span>
                <span className="text-green-600 font-bold">KSh 425,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-blue-800 font-medium">Highest Quote</span>
                <span className="text-blue-600 font-bold">KSh 892,400</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="text-purple-800 font-medium">Pending Value</span>
                <span className="text-purple-600 font-bold">KSh 1.2M</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New quote request</p>
                  <p className="text-xs text-gray-500">Nakumatt - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Quote approved</p>
                  <p className="text-xs text-gray-500">Quickmart - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Quote sent</p>
                  <p className="text-xs text-gray-500">Carrefour - 3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;