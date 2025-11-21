import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';

const Product = () => { 
  const token = localStorage.getItem('u-token');
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("type", data.type);
      formData.append("body", data.body);
      formData.append("photo", data.photo[0]); // <-- Important for file

      const res = await axios.post("http://localhost:3900/product/add", formData, {
        headers: {
          'auth-token': token,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(res.data.message);
      reset();
      setPreview(null);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Preview image on file select
  const selectedFile = watch("photo");
  React.useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setPreview(URL.createObjectURL(selectedFile[0]));
    }
  }, [selectedFile]);

  return (
    <div className="p-6">
      <ToastContainer/>
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='name'>Product Name</label>
            <input
              type="text"
              {...register("name",{required:"Name of product is required"})}
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product name"
            />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='price'>Price</label>
            <input
              type="number"
              {...register("price",{required:"Price of product is required"})}
              className="px-3 py-2 border rounded-lg"
              placeholder="Enter product price"
            />
            {errors.price && <p className='text-red-600'>{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-medium mb-1" htmlFor='type'>Category</label>
            <select {...register('type')} className="px-3 py-2 border rounded-lg">
              <option value="Hybrid">Hybrid</option>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Sofa">Sofa</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1" htmlFor='body'>Description</label>
            <textarea
              {...register("body",{required:"Product details/info is required"})}
              rows="4"
              className="px-3 py-2 border rounded-lg"
              placeholder="Write product description..."
            ></textarea>
            {errors.body && <p className='text-red-600'>{errors.body.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1">Upload Product Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('photo',{required:"Product photo is required"})}
              className="border p-2 rounded-lg cursor-pointer"
            />
            {errors.photo && <p className='text-red-600'>{errors.photo.message}</p>}

            {/* Preview */}
            {preview && <img src={preview} alt="preview" className="w-40 mt-2 rounded" />}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
