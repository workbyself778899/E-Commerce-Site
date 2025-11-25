import React, { useEffect, useState } from 'react'
import { CgCloseR } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
const Favourites = ({setShowFav, showFav}) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = () => {
      try {
        const favs = JSON.parse(localStorage.getItem('favourites') || '[]')
        setItems(favs)
      } catch (e) { setItems([]) }
    }
    load()
    const onStorage = (e) => { if (e.key === 'favourites') load() }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const remove = (idx) => {
    const copy = [...items]
    copy.splice(idx, 1)
    setItems(copy)
    localStorage.setItem('favourites', JSON.stringify(copy))
  }

  return (
      <div className=' max-h-[746px] w-[417px]  py-10'>
        {/* title  */}

        <div className='flex items-center justify-between mb-4 px-3'>
            <div className="font-semibold text-[24px]">  Favourites  </div>
            <div className="" onClick={()=>setShowFav(!showFav)}> <CgCloseR size={28} /> </div>
        </div>
        {/* line */}
       <div className="px-3">
         <hr className='pb-4 w-[287px] text-[#D9D9D9] ' />
       </div>

        {/* favourites list  */}
        <div className="space-y-4 px-3">
          {items.length === 0 && <div className="text-sm text-gray-500">No favourites yet.</div>}
          {items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <img src={it.photo} alt={it.name} className='max-h-[105px] w-[108px] object-contain' />
              <div className="flex-1 px-3">
                <h6 className="">{it.name}</h6>
                <div className="text-[#B88E2F] font-medium">Rs. {it.price}</div>
              </div>
              <div className="flex items-center justify-center">
                <IoMdCloseCircle color='#9F9F9F' size={25} onClick={() => remove(idx)} />
              </div>
            </div>
          ))}
        </div>
    
    </div>
  )
}

export default Favourites