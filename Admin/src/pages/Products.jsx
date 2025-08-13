import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { userRequest } from "../requestMethods.js";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full object-cover mr-2"
              src={params.row.img}
              alt=""
              height="100px"
              width="100px"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "originalPrice", headerName: "Price ($)", width: 100 },
    { field: "inStock", headerName: "In Stock", width: 100 },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <button className="bg-gray-400 text-white cursor-pointer w-[70px]">
                Edit
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2" />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Products</h1>
        <Link to="/newproduct">
          <button className="bg-[#1e1e1e] p-[10px] font-semibold text-white cursor-pointer">
            Create
          </button>
        </Link>
      </div>
      <div className="m-[30px]">
        <DataGrid
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Products;
