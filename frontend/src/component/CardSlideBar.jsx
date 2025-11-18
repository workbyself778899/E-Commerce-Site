import React from 'react'
import { CgCloseR } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
const CardSlideBar = ({setshowCart, showCart}) => { 
   
  return (
    <div className=' max-h-[746px] w-[417px]  pt-5'>
        {/* title  */}
        {showCart}
        <div className='flex items-center justify-between mb-4 px-3'>
            <div className="font-semibold text-[24px]"> Shopping Cart </div>
            <div className="" onClick={()=>setshowCart(!showCart)}> <CgCloseR size={28} /> </div>
        </div>
       <div className="px-3">
         <hr className='pb-4 w-[287px] text-[#D9D9D9] ' />
       </div>

        {/* Shoping list  */}
        <div className="flex justify-between px-3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOA9i33iSmjX2GQUT9N2KBX6WpsDn0kjFObg&s" alt="I am " className='max-h-[105px] w-[108px]' />
        <div className="flex flex-col items-center justify-center">
            <h6 className="">Asgaard sofa</h6>
            <div className="">
                <span className="px-2 font-light">1</span>
            <span className='px-2'>X</span>
            <span className="text-[#B88E2F] font-medium">Rs. 250,230</span>
            </div>
        </div>
        {/* close icons */}
        <div className="flex items-center justify-center">
            <IoMdCloseCircle color='#9F9F9F' size={25}/>
        </div>
        </div>
         
         {/* total price  */}
         <div className="flex justify-between px-3 my-8">
            <h6 className="">Total</h6>
            <p className='text-[#B88E2F] font-semibold'>Rs. 2352334</p>
         </div>
         
         <div className=" border-t border-[#D9D9D9] flex items-center justify-center gap-5 py-8">
            <Link to={'/cart'}>  
            <button className="px-8 border rounded-4xl py-3">View Cart</button>  
            </Link>

            <Link to={'/checkout'}>
            <button className="px-8 border rounded-4xl py-3">Checkout</button>
            </Link>
         </div>
    </div>
  )
}

export default CardSlideBar