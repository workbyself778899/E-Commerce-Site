import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import Method from '../component/Footers/Method';
import Footer from '../component/Footers/Footer';
import logo from "../assets/logo.png"
import SecondHeader from '../component/Header/SecondHeader';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Register from '../component/Form/Register';
import Login from '../component/Form/Login';
import Logout from '../component/Header/Logout';
import UpdateUserForm from '../component/Form/UpdateUserForm';
import EditUser from '../component/Form/EditUser';
import { Link } from 'react-router-dom';
import AdminPanel from '../component/Admin/AdminPanel';
import AdminButton from '../component/Admin/AdminButton';
 
const MyAccount = () => {     
const id = localStorage.getItem('uid'); // user id
console.log(id)
const [data, setData] = useState(null);
const [orders, setOrders] = useState([])

useEffect(()=>{
  const getUser = async()=>{  
    try {
    const res = await axios.get(`http://localhost:3900/user/details/${id}`)
  console.log("user", res.data.user)
  setData(res.data.user)
    } catch (error) {
   console.error(error);
      } 
          }
  if(id) getUser();
},[id]);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('u-token')
      const res = await axios.get('http://localhost:3900/order/user', { headers: { 'auth-token': token } })
      const data = res.data.orders || res.data.getOrder || []
      if (Array.isArray(data)) setOrders(data)
    } catch (err) {
      console.error('Failed to fetch user orders', err.message)
    }
  }
  if (id) fetchOrders()
}, [id])

  return (
   <>
   <ToastContainer/>
    <div className=' flex flex-col justify-center'>
        <SecondHeader text='My Account'></SecondHeader>
        <div className="flex justify-around py-18 ">

         {id ? (
            <div>
              

                
               
                  {/* Profile  */}
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <h3 className="text-3xl font-bold text-center">Profile  </h3>  
                 <div className="flex flex-col items-center">
                   <img src={data?.image}className="w-40 h-40 rounded-full object-cover shadow"alt="user"  />
                 </div>
                  <p> Username: {data?.username} </p>
                  <div className='flex flex-col justify-between items-center gap-3'>
                  
                    <Link to="/user/update">  <EditUser></EditUser> </Link>
                    <Logout></Logout>
                  </div>
                  <div className="">
                    {/* Show Admin Panel if admin  */}
                    {
                      data?.role == "admin"? <div> 
                        <AdminButton></AdminButton>
                      </div> : (" ")
                    }
                  </div>
                  {/* If user role, show their orders */}
                  {data?.role === 'user' && (
                    <div className="mt-8 w-full">
                      <h3 className="text-2xl font-semibold mb-4">Your Orders</h3>
                      {orders.length === 0 ? (
                        <div className="text-gray-600">You have no orders yet.</div>
                      ) : (
                        <div className="space-y-3">
                          {orders.map(o => (
                            <div key={o._id} className="bg-white p-4 rounded shadow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">Order #{o._id}</div>
                                  <div className="text-sm text-gray-600">Total: Rs. {o.total_cost}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-2 py-1 rounded text-sm font-medium ${o.order_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : o.order_status === 'Processing' ? 'bg-blue-100 text-blue-800' : o.order_status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' : o.order_status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{o.order_status}</span>
                                  <span className={`px-2 py-1 rounded text-sm font-medium ${o.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{o.payment_status}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

               

              
            </div>
            
         ):(
          <div className="flex w-full items-start justify-around py-18 gap">
               {/* login  */}
            <div className="">
                <Login></Login>
            </div>


            {/* Register  */}
            <div className="" >
              <h1 className='text-[38px] font-semibold mb-4'>Register</h1>
                <Register></Register>
            </div>
          </div>
         )}


        </div>
    </div>
    

   </>
  )
}

export default MyAccount