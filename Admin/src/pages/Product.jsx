import { Link } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { FaUpload } from "react-icons/fa";
import React from "react";

const  Product = () => {
  const product = {
    _id: "123456",
    title: "Hydrating Facial Cleanser",
    img: "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "A gentle cleanser that helps hydrate and remove makeup.",
    originalPrice: 15.99,
    discountedPrice: 12.99,
    inStock: true,
  };

  const [inputs, setInputs] = React.useState(product);

  const handleUpdate = () => {
    console.log("Updated product:", inputs);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-3xl font-semibold">Product</h3>
        <Link to="/newproduct">
          <button className="bg-slate-500 text-white py-2 px-4 rounded">
            Create
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={250}
            width={500}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
        <div className="flex-1 bg-white p-5 shadow-lg rounded-lg">
          <div className="flex items-center mb-5">
            <img src={product.img} alt="" className="h-20 w-20 rounded-full mr-5" />
            <span className="text-2xl font-semibold">{product.title}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{product._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Sales:</span>
              <span>5123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">In Stock:</span>
              <span>{product.inStock ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white p-5 shadow-lg rounded-lg">
        <form className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Product Name</label>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Product Description</label>
              <input
                type="text"
                name="desc"
                value={inputs.desc}
                onChange={handleChange}
                placeholder="Product Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Product Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={inputs.originalPrice}
                onChange={handleChange}
                placeholder="Original Price"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Product Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                value={inputs.discountedPrice}
                onChange={handleChange}
                placeholder="Discounted Price"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">In Stock</label>
              <select
                name="inStock"
                value={inputs.inStock}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center">
              <img
                src={product.img}
                alt=""
                className="h-40 w-40 object-cover mb-5 rounded-full"
              />
              <label htmlFor="file" className="cursor-pointer">
                <FaUpload className="text-2xl text-gray-700" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button
              type="button"
              className="bg-slate-500 text-white py-2 px-4 rounded"
              onClick={() => handleUpdate(product._id)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Product;
