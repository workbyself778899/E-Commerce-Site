import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateUserForm( ) { 
    const navigate = useNavigate();
  const { register, 
    handleSubmit, 
    formState: { errors } 
} = useForm();

  const id = localStorage.getItem('uid') 
  const token = localStorage.getItem('u-token')
  const [preview, setPreview] = useState( );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("username", data.username);
    if (data.image[0]) formData.append("image", data.image[0]);
    console.log(formData)
    try {
      const res = await axios.put(
        `https://e-commerce-site-5h4d.vercel.app/user/edit?id=${id}`,
        formData,{
            headers:{
                'auth-token':token
            }
        }
      );
      console.log(res)
    if(res.status==200){
        toast.success(res.data.message)
        navigate(-1);
    //   console.log(res.data);
    }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <ToastContainer/>
      <h2 className="text-2xl font-bold text-center mb-6">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* IMAGE PREVIEW */}
        <div className="flex flex-col items-center">
          <img
            src={preview || "/default-avatar.png"}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover shadow"
          />
        </div>

        {/* FILE UPLOAD */}
        <div>
          <label className="font-semibold">Change Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full mt-2 border p-2 rounded"
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="font-semibold">Username</label>
          <input
            type="text"
            {...register("username")}
            className="w-full mt-2 border p-2 rounded"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">Username is required</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg mt-4"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>
    </div>
  );
}
