import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/logo.png"
import {Link} from "react-router"
const SecondHeader = ({text}) => { 
  return (
    <div>
         <div className="flex flex-col justify-center items-center h-[316px] bg-account "> 
                   <img src={logo} className='h-[77px]' alt="M" />
                  <h1 className='text-[48px] font-medium'>{text}</h1>
                  <p className="flex items-center gap-2"> 
                    <span className='text-[16px] font-medium'> <Link to="/">Home</Link>  </span> 
                    <MdKeyboardArrowRight />
                    <span className='font-light'>{text}</span>
                    </p>
                   </div>
    </div>
  )
}

export default SecondHeader