import React from 'react'
import logo from "../assets/logo.png"
import { MdKeyboardArrowRight } from 'react-icons/md'
const Blog = () => {
  return (
    <div>
         
          <div className="flex flex-col justify-center items-center h-[316px] bg-account "> 
                        <img src={logo} className='h-[77px]' alt="M" />
                          <h1 className='text-[48px] font-medium'>Blog</h1>
                          <p className="flex items-center gap-2"> 
                            <span className='text-[16px] font-medium'>Home  </span> 
                            <MdKeyboardArrowRight />
                            <span>Blog</span>
                            </p>
                  </div>
    </div>
  )
}

export default Blog