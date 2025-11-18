import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import Method from '../component/Footers/Method';
import Footer from '../component/Footers/Footer';
import logo from "../assets/logo.png"
import SecondHeader from '../component/Header/SecondHeader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Register from '../component/Form/Register';

const MyAccount = () => {  


  return (
   <>
   <ToastContainer/>
    <div className=' flex flex-col justify-center'>
        <SecondHeader text='My Account'></SecondHeader>
        <div className="flex justify-around py-18 b">

            {/* login  */}
            <div className="">
                <h1 className='text-[38px] font-semibold mb-4'>Log In</h1>
                <form className='flex flex-col'>
                    <label htmlFor="username" className='text-[16px] font-medium ' > Email address</label>
                      <input type="text" className='px-3 py-2 my-4 mb-7 w-[423px] rounded-lg border' />
                    <label htmlFor="password" className='text-[16px] font-medium '>Password</label>
                    <input type="password" className='px-3 py-2 my-4  w-[423px] rounded-lg border' />

                   <div className='my-4'>
                     <input className='my-4' type='checkbox' placeholder='Remember me'/> Remember me
                   </div>
                      
                   

                  <div className="flex items-center gap-9">
                      <input type="submit" className='border px-8 py-3 rounded-xl' placeholder='Log In' />
                      <div>Lost your password?</div>
                  </div>

                </form>
            </div>


            {/* Register  */}
            <div className="" >
              <h1 className='text-[38px] font-semibold mb-4'>Register</h1>
                <Register></Register>
            </div>
        </div>
    </div>
    

   </>
  )
}

export default MyAccount