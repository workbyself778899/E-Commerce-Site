import React, { useEffect, useState } from 'react'
import ProductCard from '../component/Product/ProductCart'
import AdminButton from '../component/Admin/AdminButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MdAccessTime } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import Insta from '../component/Footers/Insta'
import RelatedProduct from '../component/RelatedProduct'
import TopPicks from '../component/TopPicks'
import HeroTable from '../component/HeroTable'
const Home = () => {   
  const [blogs, setBlogs] = useState([])

  function getOrdinal(n) {
  const s=["th","st","nd","rd"],
        v=n%100;
  return n + (s[(v-20)%10]||s[v]||s[0]);
}

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = getOrdinal(date.getDate()); // 12 → 12th
  const month = date.toLocaleString("default", { month: "short" }); // Oct
  const year = date.getFullYear(); // 2022
  return `${day} ${month} ${year}`;
};

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://e-commerce-site-three-kappa.vercel.app/blog/read')
        console.log('blog', res)
        const data = res.data.getBlog 
        if (Array.isArray(data)) setBlogs(data)
      } catch (err) {
        console.error('Failed to load blogs', err.message)
      }
    }
    fetch()
  }, [])

  return (
    <>
      <div className='bg-[#FBEBB5]'>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="py-2 font-medium text-3xl md:text-[64px] leading-tight">
              <div>Rocket single</div>
              <div className="pb-3">seater</div>
            </h1>
            <Link to='/shop'>
              <button className='border-b-2 pb-2 cursor-pointer font-medium text-[18px] md:text-[24px]'>Shop Now</button>
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src="/chair 1.png" className='w-full max-w-md md:max-w-none h-auto object-contain' alt="No image" />
          </div>
        </div>
      </div>
       <HeroTable />
      <TopPicks />

    {/* Simple banner */}
    <div className="bg-[#FFF9E5] py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <img src="https://ik.imagekit.io/zx6p823zj/Asgaard_sofa_2__wf-W6Qf_.png" className='w-full max-w-md md:max-w-none h-auto object-contain' alt="" />
        </div>
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <p className="font-medium text-[18px] md:text-[24px]">New Arrivals</p>
          <p className="font-bold text-[28px] md:text-[48px]">Asgaard sofa</p>
          <Link to='/shop'> <button className='px-6 md:px-9 py-2 mt-6 border' > Order Now </button> </Link>
        </div>
      </div>
    </div>


     {/* Blogs preview section: show first 3 blogs and a View More button */}
      <div className=" mx-auto my-18 px-4">
        <div className="flex flex-col items-center  justify-center mx-auto text-[36px] font-medium  mb-6">
           Ours Blogs          
           <p className='text-[16px] text-[#9F9F9F] mb-6 '>Find a bright ideal to suit your taste with our great selection</p>
        </div>

        <div className="grid place-items-center grid-cols-1  md:grid-cols-3  gap-9">
          {blogs.slice(0,3).map(b => (
            <div key={b._id} className="bg-white w-full max-w-sm rounded overflow-hidden">
              {b.image && <img src={b.image} alt={b.title} className="w-full h-56 md:h-80 object-contain object-center rounded-b mb-3" />}
              <div className="p-4">
                <div className="font-semibold text-center md:text-left text-lg">{b.title}</div>

                <div className="mt-3 flex justify-center md:justify-start items-center">
                  <Link to={`/blog/${b._id}`} className="font-medium text-[18px] md:text-[20px] border-b-2">Read More</Link>
                </div>

                <div className="flex mt-4 items-center gap-6 justify-center md:justify-start">
                  <p className=" flex gap-3 items-center "><MdAccessTime /> 5 min</p>
                  <p className=" flex gap-3 items-center "> <MdOutlineDateRange />  {formattedDate(b.updatedAt)} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-9">
         <Link to="/blog">  <button className='border-b-3 text-[20px] font-medium' > View All Post </button> </Link>
        </div>
      
      </div>

      <Insta></Insta>


     
    </>
  )
}

export default Home