import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { TiStarHalf } from "react-icons/ti";
import { FaFacebook } from "react-icons/fa";
import axios from 'axios';
import RelatedProduct from '../component/RelatedProduct';
import Small from '../component/Product/Small';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import {toast, ToastContainer} from "react-toastify";
const SingleProduct = ({name}) => {    
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [select, setSelect] = useState(0)
  const [product, setProduct] = useState(null)

  const [favourites, setFavourites] = useState(false)

  const handleSharef =()=>{ 
  const currentUrl = window.location.href; // Get current page URL
  // Copy to clipboard
  navigator.clipboard.writeText(currentUrl);
  // Open Facebook Share URL
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;  
  window.open(fbShareUrl, "_blank"); 
  }

  // quantity of product select 
  const [count, setCount] = useState(1)
  const button =["1", "2", "3"]
  const { id} =useParams();

  const activeButton =(i,color)=>{ 
    console.log(i)
    if(select) {
      {i==0 ? setSize("L"): i ==1 ? setSize("XL") : setSize("XS")  }
      setColor(color)
    }

    console.log("select",select)
    console.log(size)
  }
  
  const addToCart =async(productId)=>{
    try {
      const id = localStorage.getItem('uid')
      if (!id) {
      toast.warning("Please login first");
      return;
    }
    const res = await axios.post(`https://e-commerce-site-5h4d.vercel.app/user/add-to-cart/${id}`,{
      productId,
      quantity: count
    });
    toast.success(res?.data.message || "Added To Cart")


    } catch (error) {
      toast.error(error.message)
    }

  }
  const userId = localStorage.getItem('uid')
  const fav = async(productId)=>{
   try {
    
    const res = await axios.post(`https://e-commerce-site-5h4d.vercel.app/user/add-to-fav/${userId}`,{
      productId
    })
    toast.success(res.data.message)
   } catch (error) {
    toast.error(error.message || "Message in SingleProduct of fav function" )
   }
  }



  useEffect(()=>{
    const getProduct = async()=>{
    const res = await axios.get(`https://e-commerce-site-5h4d.vercel.app/product/get-one/${id}`)
    console.log(res.data.getProduct)
    setProduct(res.data.getProduct)
  }
  getProduct();
  },[id])
  return (
    <div>
      <ToastContainer/>
      {/* little header  */}
      <div className="flex items-center gap-2 mb-9 mt-4  ">
        <div className="text-[#9F9F9F]">
          <Link to='/'>Home</Link>
        </div>
        <IoIosArrowForward />
        <div className="text-[#9F9F9F]">
          <Link to='/shop'>Shop</Link>
        </div>
        <IoIosArrowForward />
        <div className='text-center px-4 border-l-3 border-[#9F9F9F]'>  {product?.name} </div>
       </div>

    {/* main part  */}
       <div className="flex items-start justify-center gap-19">

        <div className="flex ">
              {/* releatd Product  */}
        <div className="">
            <Small type={product?.type}  ></Small>
        </div>

        {/* produt photo  */}
        <div className="">
          <img src={product?.photo} className='h-[500px] w-[450px] object-contain object-center bg-[#FFF9E5] ' alt="" />
        </div>
        </div>

        {/* Little Details  */}
        <div className="  w-[600px] ">
          <h3 className="text-[42px]  "> {product?.name} </h3>
          <div className=" text-[#9F9F9F] text-[24px] font-medium "> 
            Rs, {Number(product?.price).toLocaleString("en", { minimumFractionDigits: 2 })}
          </div>
          {/* star  */}
          <div className="flex">
            <MdOutlineStarPurple500  size={28} color='#FFDA5B'/>
            <MdOutlineStarPurple500  size={28} color='#FFDA5B'/>
            <MdOutlineStarPurple500  size={28} color='#FFDA5B'/>
            <MdOutlineStarPurple500  size={28} color='#FFDA5B'/>
            <TiStarHalf size={28} color='#FFDA5B' />
          </div>

          {/* Describe  */}
          <div className="">
            {product?.body}
          </div>

          {/* size  */}
          <div className="my-4">
            <div className="text-[#9F9F9F] "> Size </div>
            <div className=" flex gap-4 ">
              {
                button.map((num,index)=>(
                    // console.log(num, "index",index)
                    <button key={index} onClick={()=>{activeButton(index)}} className={`rounded-lg p-3 px-5  bg-[#FAF4F4]  ${select==index && "bg-[#FBEBB5 ]"} `}> {index == 0 ? "L": index == 1 ? "XL" :  "XS" }  </button>
                   )
                )
              }
            </div>
          </div>

      {/* Add To Cart and count  */}
          <div className=" flex gap-4 my-4">
            <div className=" flex items-center px-3 gap-6 border rounded-xl border-[#9F9F9F]  "> 
              <button onClick={()=>{
                if(count>1) setCount(count-1);
              }} className='text-[20px]'> - </button>
             {count} 
             <button className='text-[20px]' onClick={()=>setCount(count+1)} > + </button> </div>
              <div className="" onClick={()=>{addToCart(product?._id)}}> 
              <button className="rounded-xl border px-9 py-4 "> Add To Cart </button> 
              </div>
          </div>

          <hr className='text-[#D9D9D9] my-19 ' />
            {/* simple text  */}
            <div className="text-[#9F9F9F] flex gap-9  ">
              <div className="">
                  <p>Category</p>
                  <p>Tags</p>
                  <p>Share</p>
              </div>
              <div className="mb-20">
                <p> : {product?.type} </p>
                     <p> : Sofa, Hybrid, Table, Chair, Shop </p>
                     <div className=" flex items-center gap-3"> : <button onClick={handleSharef}  > <FaFacebook color='blue' size={20} />  </button> </div>
              </div>
              
              <div className="items-end-safe mb-20 my-auto ">
              <button onClick={()=>{setFavourites(!favourites)}} > 
                {favourites? (<FaHeart  size={30} color='red' />) :  (<FaRegHeart size={30} color='red' onClick={()=>{fav(product?._id)}} />) } 
                </button>
              </div>
         
            </div>

        </div>


       </div>

       <div className="">
        <RelatedProduct type={product?.type} ></RelatedProduct>
       </div>
      
    </div>
  )
}

export default SingleProduct