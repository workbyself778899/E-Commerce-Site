import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const remember = watch("rememberMe");

  // 👁️ Show/Hide Password State
  const [showPassword, setShowPassword] = useState(false);

  // Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    // console.log("Login Data:", data);

    if (data.rememberMe) {
      localStorage.setItem("rememberEmail", data.email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    try {
      const res = await axios.post("http://localhost:3900/user/login", data);

      if (res.status === 200) {
        toast.success(res.data.message);

        localStorage.setItem("u-token", res.data.token);
        localStorage.setItem("uid", res.data.findEmail._id);

        reset();
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1 className="text-[38px] font-semibold mb-4">Log In</h1>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <label className="text-[16px] font-medium">Email address</label>
        <input
          type="text"
          className="px-3 py-2 my-4 mb-2 w-[423px] rounded-lg border"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="text-[16px] font-medium">Password</label>

        <div className="relative w-[423px] my-4">
          <input
            type={showPassword ? "text" : "password"}
            className="px-3 py-2 w-full rounded-lg border"
            {...register("password", { required: "Password is required" })}
          />

          {/* 👁️ Eye Icon Button */}
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Remember Me */}
        <div className="my-4 flex items-center gap-2">
          <input type="checkbox" {...register("rememberMe")} />
          <span>Remember me</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-9">
          <button type="submit" className="border px-8 py-3 rounded-xl">
            Log In
          </button>

          <div className="text-blue-600 cursor-pointer">
            <Link to="/user/forget-email">Lost your password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;