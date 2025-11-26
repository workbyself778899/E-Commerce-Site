import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import api from '../utils/api.js';

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const onSubmit = async (data) => {
    if (items.length === 0) {
      alert('Your cart is empty');
      navigate('/cart');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...data,
        product: items,
        total_cost: total
      };
      const res = await api.post('/add', payload);
      alert(res.data.message || 'Order placed successfully!');
      localStorage.setItem('cart', JSON.stringify([]));
      setItems([]);
      reset();
      navigate('/shop');
    } catch (err) {
      console.error(err);
      alert('Failed to place order: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  {...register('fname', { required: 'First Name is required' })}
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  {...register('lname', { required: 'Last Name is required' })}
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                {...register('company_name')}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country / Region *</label>
              <input
                type="text"
                {...register('country', { required: 'Country is required' })}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Street Address *</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Town / City *</label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Province *</label>
                <input
                  type="text"
                  {...register('province', { required: 'Province is required' })}
                  className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <input
                type="text"
                {...register('zip_code')}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Information</label>
              <textarea
                {...register('details')}
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
                      <div className="text-xs text-gray-600">Qty: {it.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rs. {formatPrice(it.price * it.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#FFF9E5] p-6 rounded">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-medium">Rs. {formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="font-medium">Rs. 0</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold text-[#B88E2F]">
                <span>Total:</span>
                <span>Rs. {formatPrice(total)}</span>
              </div>
            </div>
            <Link to='/cart' className="block text-center text-sm text-blue-600 hover:underline">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;