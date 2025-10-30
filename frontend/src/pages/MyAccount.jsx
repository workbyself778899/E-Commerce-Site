import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import Method from '../component/Footers/Method';
import Footer from '../component/Footers/Footer';
const MyAccount = () => { 
  return (
   <>
    <div className=' flex flex-col justify-center'>
        <div className="flex flex-col justify-center items-center h-[316px] bg-account "> 
          <h1 className='text-[48px] font-medium'>My Account</h1>
          <p className="flex items-center gap-2"> 
            <span className='text-[16px] font-medium'>Home  </span> 
            <MdKeyboardArrowRight />
            <span>My account</span>
            </p>
           </div>
        <div className="flex justify-around py-18 b">
            {/* login  */}
            <div className="">
                <h1 className='text-[38px] font-semibold mb-4'>Log In</h1>
                <form className='flex flex-col'>
                    <label htmlFor="username" className='text-[16px] font-medium ' >Username or email address</label>
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
              
              <label htmlFor="username" className='text-[16px] font-medium ' >Email address</label>
              <form action="">
                <input type="text" className='px-3 py-2 my-3 w-[423px] rounded-lg border' />
                      <p className='text-[16px]  w-[453px] font-light text-justify'></p>
                      <p className='text-[16px] w-[453px] text-justify font-light mb-8'>
                        <div className='mb-5'>A link to set a new password will be sent to your email address. </div>
                        
                        Your personal data will be used to support your  experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold">privacy policy.</span>
                      </p>
                      <button type='submit' className='border px-8 py-3 rounded-xl'>Register</button>
              </form>
                      

                      
            </div>
        </div>
    </div>
    <Method></Method>
    <Footer></Footer>

   </>
  )
}

export default MyAccount