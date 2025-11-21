import React from 'react'
import { FiUpload } from "react-icons/fi";
const Product = () => {
   return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Price</label>
            <input
              type="number"
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product price"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Category</label>
            <select className="px-3 py-2 border rounded-lg">
              <option>Select category</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Electronics</option>
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Stock</label>
            <input
              type="number"
              className="px-3 py-2 border rounded-lg"
              placeholder="Available stock"
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1">Description</label>
            <textarea
              rows="4"
              className="px-3 py-2 border rounded-lg"
              placeholder="Write product description..."
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="font-medium mb-1">Upload Image</label>
            <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
              <FiUpload size={30} />
              <p className="mt-2">Click to upload product image</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Product