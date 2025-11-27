import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Order = () => {
  const token = localStorage.getItem('u-token')
  const [orders, setOrders] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3900/order/all', { headers: { 'auth-token': token } })
      const data = res.data.getOrder || res.data
      if (Array.isArray(data)) setOrders(data)
    } catch (err) {
      console.error('Failed to fetch orders', err.message)
      toast.error('Failed to fetch orders')
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return
    try {
      const res = await axios.delete(`http://localhost:3900/order/delete/${id}`, { headers: { 'auth-token': token } })
      toast.success(res.data.message || 'Deleted')
      fetchOrders()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete')
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:3900/order/update/${id}`, { order_status: status }, { headers: { 'auth-token': token } })
      toast.success(res.data.message || 'Updated')
      fetchOrders()
    } catch (err) {
      console.error(err)
      toast.error('Failed to update')
    }
  }

  const filtered = orders.filter(o => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    const fname = o.customer?.fname || ''
    const lname = o.customer?.lname || ''
    const fullname = (fname + ' ' + lname).toLowerCase()
    return fullname.includes(q) || fname.toLowerCase().includes(q) || lname.toLowerCase().includes(q) || (o._id || '').toLowerCase().includes(q)
  })

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <div className="flex items-center gap-3 mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by customer name or order id" className="px-3 py-2 border rounded w-80" />
        <button onClick={() => setQuery('')} className="px-3 py-2 border rounded">Clear</button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? <div className="text-gray-600">No orders found</div> : (
          filtered.map(o => (
            <div key={o._id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <div className="font-medium">Order #{o._id}</div>
                <div className="text-sm text-gray-600">{o.customer?.fname} {o.customer?.lname} — {o.customer?.email}</div>
                <div className="text-sm text-gray-600">Total: Rs. {o.total_cost}</div>
                <div className="text-sm text-gray-600">Status: {o.order_status} / {o.payment_status}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => setSelected(o)} className="px-3 py-1 bg-blue-400 text-white rounded">View</button>
                <button onClick={() => handleUpdateStatus(o._id, 'Processing')} className="px-3 py-1 bg-yellow-300 rounded">Processing</button>
                <button onClick={() => handleUpdateStatus(o._id, 'Shipped')} className="px-3 py-1 bg-indigo-400 text-white rounded">Shipped</button>
                <button onClick={() => handleUpdateStatus(o._id, 'Completed')} className="px-3 py-1 bg-green-500 text-white rounded">Complete</button>
                <button onClick={() => handleDelete(o._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-3">Order #{selected._id}</h2>
            <div className="mb-2"><b>Customer:</b> {selected.customer?.fname} {selected.customer?.lname}</div>
            <div className="mb-2"><b>Email:</b> {selected.customer?.email}</div>
            <div className="mb-2"><b>Phone:</b> {selected.customer?.phone}</div>
            <div className="mb-2"><b>Address:</b> {selected.customer?.address}, {selected.customer?.city}, {selected.customer?.province}, {selected.customer?.country}</div>
            <div className="mb-2"><b>Notes:</b> {selected.customer?.details || '-'}</div>

            <div className="mt-4">
              <h3 className="font-medium">Products</h3>
              <div className="mt-2 space-y-2">
                {selected.products?.map(p => (
                  <div key={p.productId || p._id} className="flex items-center justify-between">
                    <div>{p.name} × {p.quantity}</div>
                    <div>Rs. {p.price * p.quantity}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order