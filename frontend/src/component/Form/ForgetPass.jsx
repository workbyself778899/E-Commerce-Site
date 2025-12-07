import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ForgetPass = () => {   
  const navigate = useNavigate();
  const { register,
     handleSubmit, 
     formState: { errors, isSubmitting } 
    } = useForm();

  const onSubmit = async(data) => { 
    console.log("Email submitted:", data.email);
    const res = await axios.post("https://e-commerce-site-three-kappa.vercel.app//user/enter-email",data)
    //  console.log(res)
    if(res.status == 200){

      toast.success(res.data.message)
      console.log(res.data.message)
      setTimeout(()=>{
        navigate('/')
      },4000)
    }
   
  };

   return (
  <div>
      <ToastContainer></ToastContainer>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="font-semibold">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full mt-2 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
          >
           {isSubmitting ? "Sending..." : "Send Reset Link"}  
          </button>

        </form>

      </div>
    </div>
  </div>
  );
}

export default ForgetPass