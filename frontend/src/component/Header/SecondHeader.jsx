import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"

const SecondHeader = ({text}) => {
  return (
    <div className="bg-account w-full">
      <div className="max-w-6xl mx-auto text-center px-4 py-12 md:py-20 flex flex-col items-center">
        <img src={logo} className='h-12 md:h-20 object-center object-cover mb-4' alt="Logo" />
        <h1 className='text-2xl md:text-5xl font-medium mb-2'>{text}</h1>
        <p className="flex items-center gap-2 text-sm md:text-base text-gray-700">
          <span className='font-medium'><Link to="/">Home</Link></span>
          <MdKeyboardArrowRight />
          <span className='font-light'>{text}</span>
        </p>
      </div>
    </div>
  )
}

export default SecondHeader