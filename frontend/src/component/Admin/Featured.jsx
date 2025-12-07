import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const FeaturedAdmin = () => {
  const token = localStorage.getItem('u-token')
  const [featured, setFeatured] = useState({ topPicks: [], hereTable: [] })

  const fetch = async () => {
    try {
      const res = await axios.get('https://e-commerce-site-three-kappa.vercel.app//featured/read')
      setFeatured({ topPicks: res.data.topPicks || [], hereTable: res.data.hereTable || [] })
    } catch (err) {
      console.error('Failed to fetch featured', err.message)
      toast.error('Failed to load featured')
    }
  }

  useEffect(() => { fetch() }, [])

  const handleRemove = async (section, productId) => {
    if (!window.confirm('Remove from featured?')) return
    try {
      const res = await axios.delete(`https://e-commerce-site-three-kappa.vercel.app//featured/remove/${section}/${productId}`, { headers: { 'auth-token': token } })
      toast.success(res.data.message || 'Removed')
      fetch()
    } catch (err) {
      console.error(err)
      toast.error('Failed to remove')
    }
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Featured Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-medium mb-3">Top Picks</h2>
          {featured.topPicks.length === 0 ? <div className="text-gray-600">No items</div> : (
            <div className="space-y-3">
              {featured.topPicks.map(p => (
                <div key={p._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.photo && <img src={p.photo} alt={p.name} className="w-16 h-16 object-cover rounded" />}
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-600">Rs. {p.price}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/single-product/${p._id}`} className="px-3 py-1 border rounded">View</Link>
                    <button onClick={() => handleRemove('topPicks', p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="font-medium mb-3">Here Table</h2>
          {featured.hereTable.length === 0 ? <div className="text-gray-600">No items</div> : (
            <div className="space-y-3">
              {featured.hereTable.map(p => (
                <div key={p._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.photo && <img src={p.photo} alt={p.name} className="w-16 h-16 object-contain rounded" />}
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-600">Rs. {p.price}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/single-product/${p._id}`} className="px-3 py-1 border rounded">View</Link>
                    <button onClick={() => handleRemove('hereTable', p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedAdmin
