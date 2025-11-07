import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router';
const Header = () => { 

  // In home page Header background color change to yellow else white
  const location = useLocation();
  const getColor = ()=>{
    if(location.pathname==="/") return "bg-[#FBEBB5]"
  }
  
  return (
    <div className={`flex w-full justify-end items-center gap-20 mr-20 py-3 px-4 ${getColor()}`}>
        <ul className='flex gap-6 font-medium text-[16px] cursor-default'>
            <Link to="/"> 
            <li>Home</li>
            </Link>
            <Link to="/shop">
            <li>Shop</li>
            </Link>
            <Link to="/about">
             <li>About</li>
            </Link>
            <Link to="/contact">
            <li>Contact</li>
            </Link>
            
        </ul>
        <ul className='flex items-center justify-baseline gap-6 text-[16px] cursor-default '>
            <Link to="/">  <li> <FaRegUser size={18} /> </li> </Link>
            <li> <FiSearch size={18} /> </li>
            <li> <FaRegHeart size={18} /></li>
            <Link to="/cart"> <li> <AiOutlineShoppingCart size={18}/> </li> </Link>
        </ul>
    </div>
  )
}

export default Header