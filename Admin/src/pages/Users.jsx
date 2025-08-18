/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// Users.jsx - Diagnostic Version for 500 Error
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Trash2, Shield, User, Search, Filter, Download, UserPlus, Users as UsersIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { userRequest, testConnection } from "../requestMethods.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [diagnosticInfo, setDiagnosticInfo] = useState(null);

  // Test API connection first
  const testApiConnection = async () => {
    console.log('🔍 Testing API connection...');
    try {
      const healthCheck = await testConnection();
      console.log('Health check result:', healthCheck);
      return healthCheck.success;
    } catch (error) {
      console.log('Health check failed, trying basic ping...');
      try {
        const response = await userRequest.get('/');
        console.log('Basic ping successful');
        return true;
      } catch (pingError) {
        console.error('Basic ping also failed:', pingError);
        return false;
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        setLoading(true);
        await userRequest.delete(`/users/${id}`);
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
        alert(`Delete failed: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    { 
      field: "_id", 
      headerName: "User ID", 
      width: 120,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <span className="font-mono text-xs text-gray-600">
          {params.value?.substring(0, 8) || 'N/A'}...
        </span>
      )
    },
    { 
      field: "name", 
      headerName: "Full Name", 
      width: 200,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {params.value?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="font-medium text-gray-800">{params.value || 'N/A'}</span>
        </div>
      )
    },
    { 
      field: "email", 
      headerName: "Email Address", 
      width: 250,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <span className="text-gray-700">{params.value || 'N/A'}</span>
      )
    },
    { 
      field: "phone", 
      headerName: "Phone Number", 
      width: 150,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <span className="text-gray-700 font-mono">
          {params.row.contact?.phone || params.row.phone || 'N/A'}
        </span>
      ),
      valueGetter: (params) => {
        return params.row.contact?.phone || params.row.phone || '';
      }
    },
    { 
      field: "role", 
      headerName: "User Role", 
      width: 130,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => {
        const roleColors = {
          admin: 'bg-red-100 text-red-800 border-red-200',
          user: 'bg-blue-100 text-blue-800 border-blue-200',
          customer: 'bg-blue-100 text-blue-800 border-blue-200',
          manager: 'bg-purple-100 text-purple-800 border-purple-200',
          moderator: 'bg-orange-100 text-orange-800 border-orange-200',
          vip: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          default: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        
        const role = params.value?.toLowerCase() || 'user';
        const colorClass = roleColors[role] || roleColors.default;
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass} flex items-center`}>
            <User className="mr-1" size={14} />
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        );
      }
    },
    {
      field: "createdAt",
      headerName: "Join Date",
      width: 130,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => {
        const date = params.value ? new Date(params.value) : null;
        return (
          <span className="text-gray-600 text-sm">
            {date && !isNaN(date.getTime()) ? date.toLocaleDateString() : 'N/A'}
          </span>
        );
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      headerClassName: 'font-semibold text-[#8b4513]',
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDeleteUser(params.row._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
            title="Delete User"
            disabled={loading}
          >
            <Trash2 size={16} />
          </button>
          <button
            className="p-2 text-[#d4af37] hover:bg-yellow-50 rounded-lg transition-all duration-300 hover:scale-110"
            title="Edit Permissions"
          >
            <Shield size={16} />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    let isMounted = true;
    
    const getUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        setDiagnosticInfo(null);
        
        console.log('🔍 Starting diagnostic process...');
        
        // First test basic connectivity
        const isConnected = await testApiConnection();
        if (!isConnected) {
          throw new Error('Cannot connect to backend server');
        }
        
        console.log('✅ Backend connection successful, fetching users...');
        const res = await userRequest.get("/users");
        
        if (isMounted) {
          console.log('📥 Raw API Response:', res);
          
          // Handle different response structures
          let userData = [];
          
          if (Array.isArray(res.data)) {
            userData = res.data;
            console.log('✅ Response is array with', userData.length, 'items');
          } else if (res.data && Array.isArray(res.data.users)) {
            userData = res.data.users;
            console.log('✅ Response has users array with', userData.length, 'items');
          } else if (res.data && Array.isArray(res.data.data)) {
            userData = res.data.data;
            console.log('✅ Response has data array with', userData.length, 'items');
          } else {
            console.warn('⚠️ Unexpected response structure:', res.data);
            setDiagnosticInfo({
              responseType: typeof res.data,
              responseKeys: res.data ? Object.keys(res.data) : [],
              responseStructure: JSON.stringify(res.data, null, 2).substring(0, 500)
            });
          }
          
          // Validate and normalize user data
          const validUsers = userData.filter(user => {
            if (!user || typeof user !== 'object') {
              console.warn('⚠️ Invalid user object:', user);
              return false;
            }
            if (!user._id && !user.id) {
              console.warn('⚠️ User missing ID:', user);
              return false;
            }
            return true;
          }).map(user => ({
            _id: user._id || user.id,
            name: user.name || user.username || user.fullName || 'Unknown User',
            email: user.email || 'No email',
            phone: user.phone || user.contact?.phone || '',
            role: user.role || 'user',
            createdAt: user.createdAt || user.created_at || new Date().toISOString(),
            ...user
          }));
          
          setUsers(validUsers);
          console.log(`✅ Successfully loaded ${validUsers.length} valid users`);
          
          if (validUsers.length === 0 && userData.length > 0) {
            console.warn('⚠️ No valid users found in response data');
            setError('Response contains invalid user data structure');
          }
        }
      } catch (error) {
        console.error('❌ Error fetching users:', error);
        
        if (isMounted) {
          let errorMessage = 'Failed to fetch users';
          let diagnostics = {
            errorType: error.name,
            errorCode: error.code,
            statusCode: error.response?.status,
            statusText: error.response?.statusText,
            responseData: error.response?.data,
            requestURL: error.config?.url,
            baseURL: error.config?.baseURL
          };
          
          if (error.response?.status === 500) {
            errorMessage = 'Backend server error (500) - Check your backend logs';
            diagnostics.suggestion = 'This is a backend issue. Check your server logs for the specific error.';
          } else if (error.code === 'ERR_NETWORK') {
            errorMessage = 'Network error - Backend server might not be running';
          } else if (error.response?.status === 404) {
            errorMessage = 'Users endpoint not found (404)';
          } else if (error.response?.status === 401) {
            errorMessage = 'Authentication required (401)';
          } else if (error.response?.status === 403) {
            errorMessage = 'Access denied (403)';
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }
          
          setError(errorMessage);
          setDiagnosticInfo(diagnostics);
          setUsers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    getUsers();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Safe filtering with error handling
  const filteredUsers = users.filter(user => {
    try {
      const name = user?.name?.toLowerCase() || '';
      const email = user?.email?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      
      const matchesSearch = searchTerm === '' || 
                           name.includes(searchLower) || 
                           email.includes(searchLower);
      const matchesRole = filterRole === 'all' || user?.role === filterRole;
      
      return matchesSearch && matchesRole;
    } catch (error) {
      console.warn('Error filtering user:', user, error);
      return false;
    }
  });

  const exportUsers = () => {
    try {
      if (filteredUsers.length === 0) {
        alert('No users to export');
        return;
      }

      const csvContent = "data:text/csv;charset=utf-8," + 
        "ID,Name,Email,Phone,Role,Join Date\n" +
        filteredUsers.map(user => {
          const phone = user.contact?.phone || user.phone || '';
          const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';
          return `"${user._id}","${user.name || ''}","${user.email || ''}","${phone}","${user.role || 'user'}","${joinDate}"`;
        }).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "cornells_users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting users:', error);
      alert('Failed to export users. Please try again.');
    }
  };

  const getUserStats = () => {
    try {
      return {
        total: users.length,
        customers: users.filter(u => u?.role === 'customer' || u?.role === 'user').length,
        admins: users.filter(u => u?.role === 'admin').length,
        activeToday: Math.floor(users.length * 0.3)
      };
    } catch (error) {
      console.warn('Error calculating user stats:', error);
      return { total: 0, customers: 0, admins: 0, activeToday: 0 };
    }
  };

  const stats = getUserStats();

  // Error state with detailed diagnostics
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8 flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200 max-w-2xl">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Backend Server Error</h2>
          <p className="text-red-500 mb-6">{error}</p>
          
          {diagnosticInfo && (
            <div className="bg-white p-4 rounded-lg mb-6 text-left">
              <h3 className="font-bold text-gray-700 mb-2">Diagnostic Information:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Error Type:</strong> {diagnosticInfo.errorType}</p>
                <p><strong>Status Code:</strong> {diagnosticInfo.statusCode}</p>
                <p><strong>Request URL:</strong> {diagnosticInfo.baseURL}{diagnosticInfo.requestURL}</p>
                {diagnosticInfo.suggestion && (
                  <p><strong>Suggestion:</strong> {diagnosticInfo.suggestion}</p>
                )}
                {diagnosticInfo.responseData && (
                  <div>
                    <strong>Backend Response:</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-auto max-h-32">
                      {JSON.stringify(diagnosticInfo.responseData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-left border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-2">🛠️ How to Fix This:</h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <p><strong>1.</strong> Check your backend server logs for the specific error</p>
              <p><strong>2.</strong> Ensure your database is running and connected</p>
              <p><strong>3.</strong> Verify your User model/schema is correct</p>
              <p><strong>4.</strong> Check the /users endpoint handler in your backend</p>
              <p><strong>5.</strong> Look for missing environment variables</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mr-4 flex items-center mx-auto"
            >
              <RefreshCw className="mr-2" size={16} />
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-[#f8f6f3] to-[#f5f2ee] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent flex items-center">
                <UsersIcon className="mr-4 text-[#d4af37]" />
                User Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage your Cornell's luxury beauty community</p>
            </div>
            <button className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
              <UserPlus className="mr-2" />
              Add New User
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <UsersIcon className="text-white text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Customers</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.customers}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <User className="text-white text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Admins</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.admins}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                  <Shield className="text-white text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Today</p>
                  <p className="text-2xl font-bold text-[#8b4513]">{stats.activeToday}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center">
                  <UsersIcon className="text-white text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">Users</option>
                    <option value="customer">Customers</option>
                    <option value="admin">Admins</option>
                    <option value="manager">Managers</option>
                    <option value="moderator">Moderators</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>
              <button
                onClick={exportUsers}
                className="bg-white border border-[#d4af37] text-[#d4af37] px-6 py-3 rounded-xl font-semibold hover:bg-[#d4af37] hover:text-white transition-all duration-300 flex items-center"
                disabled={filteredUsers.length === 0}
              >
                <Download className="mr-2" />
                Export Users ({filteredUsers.length})
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-[#8b4513]">
              User Directory ({filteredUsers.length} users)
            </h3>
            {users.length === 0 && !loading && (
              <p className="text-gray-500 mt-2">No users loaded. Check the error above.</p>
            )}
          </div>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
              rows={filteredUsers} 
              columns={columns}
              getRowId={(row) => row._id}
              checkboxSelection
              loading={loading}
              onRowSelectionModelChange={(newSelection) => {
                setSelectedUsers(newSelection);
              }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f1f5f9',
                  fontSize: '14px',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#fafafa',
                  borderBottom: '2px solid #e2e8f0',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#fef7e0',
                },
                '& .MuiCheckbox-root.Mui-checked': {
                  color: '#d4af37',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '& .MuiDataGrid-overlay': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 z-50">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Delete Selected
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

export default Users;