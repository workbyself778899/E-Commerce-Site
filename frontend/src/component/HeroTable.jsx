import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HeroTable = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:3900/featured/read')
        const data = res.data.hereTable || []
        setItems(data)
      } catch (err) {
        console.error('Failed to load here table', err.message)
      }
    }
    fetch()
  }, [])

  if (!items) return null

  const two = items.slice(0,2)

  return (
    <div className=" bg-[#FAF4F4] mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
      
    
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">
        {two.map(p => (
          <div key={p._id} className="bg-[#FAF4F4] w-[605px] h-[600px] rounded   flex flex-col gap-4 justify-center items-center">
            {p.photo && <img src={p.photo} alt={p.name} className="w-[605px] h-[400px] object-contain object-right rounded" />}
            <div className="flex-1  ">
              <div className="font-medium mb-1">{p.name}</div>
           
              <div className="flex items-center gap-3">
                <Link to={`/single-product/${p._id}`} className=" py-1 border-b-2 rounded">View More</Link>
          
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroTable
