import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Order from './Order';

const Dashboard = () => {
  const [product, setProduct] = useState();
  const [countUser, setCountUser] = useState();
  const [countOrder, setCountOrder] = useState();
  // count total Product 
  const countProduct = async()=>{
     const res =await axios.get("https://e-commerce-site-three-kappa.vercel.app/product/get-all")
    // console.log(res.data.getProduct.length)
    setProduct(res.data.getProduct.length)
  }

  //Count total user
    const User = async()=>{
      const res =await axios.get("https://e-commerce-site-three-kappa.vercel.app/user/all-user")
      setCountUser(res.data.data)
    }

    // count total Order 
    const Order = async()=>{
        const res = await axios.get("https://e-commerce-site-three-kappa.vercel.app/order/all",{
          headers:{ 'auth-token': localStorage.getItem('u-token')}
        })
        console.log("order",res)
      setCountOrder(res.data.getOrder.length)
    }
    



  try {
   countProduct();
   User();
   Order();

  } catch (error) {
    toast.error(error.message)
  }

  return (
     <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-gray-500 text-sm">Welcome, Admin!</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-3xl font-semibold mt-2">{countOrder}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="text-gray-500">Total Products</h3>
            <p className="text-3xl font-semibold mt-2">{product}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-3xl font-semibold mt-2">{countUser}</p>
          </div>
        </div>
</div>
  )
}

export default Dashboard