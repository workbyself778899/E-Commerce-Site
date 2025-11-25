import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import api from '../utils/api.js'

const Checkout = () => {
  const navigate = useNavigate()
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

  const placeOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert('Your cart is empty')
      navigate('/cart')
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
      navigate('/shop')
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
        <Link to='/cart' className="text-[#9F9F9F]">Cart</Link>
        <IoIosArrowForward />
        <div className='px-4 border-l-2 border-[#9F9F9F]'>Checkout</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Form */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-8">Billing Details</h2>
          <form onSubmit={placeOrder} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country / Region *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Town / City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Province *</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Information</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Additional Details"
                className="w-full border border-gray-400 p-3 rounded h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-3 rounded font-bold text-lg hover:bg-yellow-500 disabled:bg-gray-300 transition"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
          
          {/* Cart Items */}
          <div className="bg-gray-50 p-4 rounded mb-6 max-h-96 overflow-y-auto">
            <h4 className="font-semibold mb-3 text-sm">Items in Cart:</h4>
            {items.length === 0 ? (
              <div className="text-sm text-gray-500">No items in cart</div>
            ) : (
              <div className="space-y-3">
                {items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm border-b pb-2">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-600">{it.size} • {it.color}</div>
                      <div className="text-xs text-gray-600">Qty: {it.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rs. {(it.price * it.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="bg-[#FFF9E5] p-6 rounded">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-medium">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="font-medium">Rs. 0</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold text-[#B88E2F]">
                <span>Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <Link to='/cart' className="block text-center text-sm text-blue-600 hover:underline">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
