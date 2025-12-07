import React from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
const Register = () => {

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

const onSubmit = async(data)=>{
  try {
 
    const res = await axios.post('https://e-commerce-site-three-kappa.vercel.app/user/register',data)
    toast.success(res.data.message);
    reset(); // Reset the input values 
 

  } catch (error) {
    // if backend sends errror message 
   const msg = error.response?.data?.message || "Provide Unique, Email and Username";
    toast.error(msg); // Show toast for 409 / 400
    console.log(error)
 // ✅ finish the function so isSubmitting becomes false
  } finally{

  }
} 
  return (
    <div> 
      <ToastContainer/>
       <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className='text-[16px] font-medium ' >Email address</label> <br />
                <input type="text" {...register('email',{required:"Email is required"})} className='px-3 py-2 my-3 w-[423px] rounded-lg border'/>
                {errors.email && <p className='text-red-500'>
                  {errors.email.message}
                  </p>}
                 <div className="mt-5 ">
                   <label htmlFor="username" className='text-[16px] font-medium ' >Username</label> <br />
                   <input type="text" className='px-3 py-2 my-3 w-[423px] rounded-lg border'  {...register('username',{required:"Username is required"})} />
                  {
                    errors.username && <p className='text-red-500'>
                      {errors.username.message}
                    </p>
                  }
                 </div>


                      <p className='text-[16px]  w-[453px] font-light text-justify'></p>
                      <div className='text-[16px] w-[453px] text-justify font-light mb-8'>
                        <p className='mb-5'>A link to set a new password will be sent to your email address. </p>
                        
                        Your personal data will be used to support your  experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold">privacy policy.</span>
                      </div>
                     
                      <button type='submit' disabled={isSubmitting} className='border px-8 py-3 rounded-xl'>
                         {isSubmitting? <span className='text-green-700'> Registering ... </span> : "Register" }
                        </button>
              </form>
    </div>
  )
}

export default Register