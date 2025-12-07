import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TopPicks = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://e-commerce-site-three-kappa.vercel.app//featured/read')
        const data = res.data.topPicks || []
        setItems(data)
      } catch (err) {
        console.error('Failed to load top picks', err.message)
      }
    }
    fetch()
  }, [])

  if (!items || items.length === 0) return null

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="flex flex-col items-center justify-center mb-4">
        <h2 className="text-2xl md:text-[36px] font-medium">Top Picks For You</h2>
        <p className='font-medium text-[#9F9F9F] text-sm md:text-base'>Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
      </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
  {items.map(p => (
    <Link
      key={p._id}
      to={`/single-product/${p._id}`}
      className="w-full max-w-xs md:max-w-[260px] bg-white rounded p-4 flex flex-col"
    >
      {/* CONSTANT IMAGE BOX (SAME SIZE ALWAYS) */}
      <div className="w-full h-48 md:h-[250px] flex items-center justify-center">
        <img
          src={p.photo}
          alt={p.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* TEXT ALWAYS STRAIGHT & ALIGNED FROM LEFT */}
      <div className="flex flex-col mt-3">
        <div className="font-medium truncate">{p.name}</div>
        <div className="text-sm text-gray-600">Rs. {p.price}</div>
      </div>
    </Link>
  ))}
</div>


<div className="flex justify-center">
    <Link to="/shop" className="text-[16px] md:text-[20px] font-medium border-b-2 text-center mt-4">
  View more
</Link>
</div>

    </div>
  )
}

export default TopPicks
