import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
const Header = () => {
  return (
    <div className='flex justify-end items-center gap-20 mr-20 py-3'>
        <ul className='flex gap-6 font-medium text-[16px] cursor-default'>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <ul className='flex items-center justify-baseline gap-6 text-[16px] cursor-default '>
            <li> <FaRegUser size={18} /> </li>
            <li> <FiSearch size={18} /> </li>
            <li> <FaRegHeart size={18} /></li>
            <li> <AiOutlineShoppingCart size={18}/> </li>
        </ul>
    </div>
  )
}

export default Header