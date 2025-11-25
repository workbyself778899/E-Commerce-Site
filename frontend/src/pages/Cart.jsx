import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { IoMdCloseCircle } from 'react-icons/io'
import api from '../utils/api.js'

const Cart = () => {
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    country: '',
    city: '',
    province: '',
    address: '',
    phone: '',
    email: '',
    company_name: '',
    details: '',
    zip_code: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setItems(cart)
      } catch (e) {
        setItems([])
      }
    }
    load()
  }, [])

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(f => ({ ...f, [name]: value }))
  }

  const removeItem = (idx) => {
    const copy = [...items]
    copy.splice(idx, 1)
    setItems(copy)
    localStorage.setItem('cart', JSON.stringify(copy))
  }

  const updateQuantity = (idx, qty) => {
    const copy = [...items]
    copy[idx].quantity = Math.max(1, qty)
    setItems(copy)
    localStorage.setItem('cart', JSON.stringify(copy))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert('Cart is empty')
      return
    }
    
    setLoading(true)
    try {
      const payload = {
        ...formData,
        product: items,
        total_cost: total
      }
      const res = await api.post('/order/create', payload)
      alert('Order placed successfully!')
      // clear cart and form
      localStorage.setItem('cart', JSON.stringify([]))
      setItems([])
      setFormData({
        fname: '', lname: '', country: '', city: '', province: '',
        address: '', phone: '', email: '', company_name: '', details: '', zip_code: ''
      })
    } catch (err) {
      console.error(err)
      alert('Failed to place order: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 mb-9">
        <Link to='/' className="text-[#9F9F9F]">Home</Link>
        <IoIosArrowForward />
        <div className='text-center px-4 border-l-2 border-[#9F9F9F]'>Cart</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty. <Link to='/shop' className="text-blue-600">Continue shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-4 border p-4 rounded">
                  <img src={it.photo} alt={it.name} className='w-24 h-24 object-contain' />
                  <div className="flex-1">
                    <h5 className="font-semibold text-lg">{it.name}</h5>
                    <div className="text-sm text-gray-600">{it.size} • {it.color}</div>
                    <div className="text-[#B88E2F] font-medium mt-1">Rs. {it.price}</div>
                  </div>
                  
                  {/* quantity controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(idx, it.quantity - 1)} className="px-2 py-1 border">-</button>
                    <span className="px-3">{it.quantity}</span>
                    <button onClick={() => updateQuantity(idx, it.quantity + 1)} className="px-2 py-1 border">+</button>
                  </div>

                  {/* subtotal and remove */}
                  <div className="text-right">
                    <div className="font-semibold">Rs. {it.price * it.quantity}</div>
                    <IoMdCloseCircle color='#9F9F9F' size={25} className="cursor-pointer mt-2" onClick={() => removeItem(idx)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Form and Summary */}
        <div>
          {/* Order Summary */}
          <div className="bg-[#FFF9E5] p-6 rounded mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>Rs. 0</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>Rs. {total}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
            <form onSubmit={placeOrder} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border p-2 rounded w-full"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="border p-2 rounded w-full"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                value={formData.zip_code}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="company_name"
                placeholder="Company Name (Optional)"
                value={formData.company_name}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />

              <textarea
                name="details"
                placeholder="Additional Details (Optional)"
                value={formData.details}
                onChange={handleInputChange}
                className="border p-2 rounded w-full h-20"
              />

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full bg-yellow-400 text-black py-2 rounded font-semibold disabled:bg-gray-300 hover:bg-yellow-500"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart