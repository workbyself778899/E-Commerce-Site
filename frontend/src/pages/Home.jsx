import React, { useEffect, useState } from 'react'
import ProductCard from '../component/Product/ProductCart'
import AdminButton from '../component/Admin/AdminButton'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {   
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:3900/blog/read')
        const data = res.data.getBlog || res.data
        if (Array.isArray(data)) setBlogs(data)
      } catch (err) {
        console.error('Failed to load blogs', err.message)
      }
    }
    fetch()
  }, [])

  return (
    <>
      <div className='bg-[#FBEBB5] flex justify-between items-center pt-8 pr-20 pl-70 '>
        <div className="">
          <h1 className="py-2 font-medium text-[64px]">
            <div className="">Rocket single</div>
            <div className="pb-3">seater</div>
          </h1>
          <Link to='/shop'>
            <button className='border-b-2 pb-2 cursor-pointer font-medium text-[24px] '>Shop Now</button>
          </Link>
        </div>

        <div className="">
          <img src="/chair 1.png" className='h-[700px]  ' alt="No image" />
        </div>
      </div>

      {/* Blogs preview section: show first 3 blogs and a View More button */}
      <div className="max-w-6xl mx-auto my-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Latest Blogs</h2>
          <Link to="/blog" className="text-sm text-blue-600">View all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0,3).map(b => (
            <div key={b._id} className="bg-white p-4 rounded shadow">
              {b.image && <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded mb-3" />}
              <div className="font-semibold text-lg">{b.title}</div>
              <div className="text-sm text-gray-600 my-2">{b.categories}</div>
              <div className="text-sm text-gray-700">{b.contain?.slice(0,120)}{b.contain && b.contain.length>120 ? '...' : ''}</div>
              <div className="mt-3">
                <Link to={`/blog`} className="text-blue-600 text-sm">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home