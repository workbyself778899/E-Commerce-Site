import React from 'react'
import ProductCard from '../component/Product/ProductCart'
import AdminButton from '../component/Admin/AdminButton'

const Home = () => {  
  return (
    <div className='bg-[#FBEBB5] flex justify-between items-center pt-8 pr-20 pl-70 '>
      
      <div className="">
          <h1 className="py-2 font-medium text-[64px]">
          <div className="">Rocket single</div>   
          <div className="pb-3">seater</div>
        </h1>
        <button className='border-b-2 pb-2 cursor-pointer font-medium text-[24px] '>Shop Now</button>
      </div>
    
      <div className="">
        <img src="/chair 1.png" className='h-[700px]  ' alt="No image" />
      </div>
    </div>
  )
}

export default Home