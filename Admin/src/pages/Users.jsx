import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import {userRequest} from "../requestMethods.js"

const Users = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: () => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2" />
          </>
        );
      },
    },
  ];

  useEffect(()=>{
    const getUsers = async() =>{
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  },[])
  
  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[5px]">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
      </div>

      <div className="m-[30px]">
        <DataGrid rows={users} columns={columns} 
        getRowId={(row) => row._id}
        checkboxSelection />
      </div>
    </div>
  );
};

export default Users;
