import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import CardSlideBar from '../CardSlideBar';
import Favourites from '../Favourites';
import Logout from './Logout';

const Header = () => {  

const userId = localStorage.getItem('uid');
  const [showCart, setshowCart] = useState(false)
  const [showFav, setShowFav] = useState(false)
  // In home page Header background color change to yellow else white
  const location = useLocation();
  const getColor = ()=>{
    if(location.pathname==="/") return "bg-[#FBEBB5]"
  }
  
  return (
    <div>
      <div className={`flex w-full justify-end items-center gap-30 mr-20 py-3 pr-20 px-4 ${getColor()}`}>
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
        <ul className='flex items-center justify-baseline gap-6 text-[16px] cursor-pointer'>
          
            <Link to="/myaccount">  <li> <FaRegUser size={18} /> </li> </Link>
           <Link to="/shop"> <li> <FiSearch size={18} /> </li></Link>
            <li onClick={()=>setShowFav(!showFav)}> <FaRegHeart size={18} /></li>
            <li onClick={()=>setshowCart(!showCart)}> <AiOutlineShoppingCart size={18}/> </li> 
           
        </ul>  
    </div>
    <div className='flex justify-end '>
    <div className="absolute bg-white top-0">
      {showCart && (<CardSlideBar userId={userId} showCart={showCart} setshowCart={setshowCart} />)}
      {showFav && (<Favourites setShowFav={setShowFav} showFav={showFav} />) }
    </div>
      
    </div>
    </div>
  )
}

export default Header