import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPass = () => {
  const { id, token } = useParams();
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const res = await axios.post(
        `https://e-commerce-site-three-kappa.vercel.app//user/reset/${id}/${token}`,
        data
      );

      toast.success(res.data.message);
      setTimeout(()=>{
          window.close();
      },2000)
    } catch (error) {
      console.log(error)
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* New Password */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password"
              {...register("password", { required: "New password is required" })}
              className={`peer w-full px-3 py-4 border rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />

            <div
              className="absolute right-3 top-3 flex items-center justify-center my-2 cursor-pointer text-gray-600"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 mt-10 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Resetting...</span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;