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

const MyAccount = () => {   
const id = localStorage.getItem('uid'); // user id
console.log(id)
const [data, setData] = useState(null);

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
                 <div className="my-5 rounded-full object-cover  w-[200px] bg-amber-100 h[200px">
                   <img src={data?.image} className='rounded-full p-2' alt="user"  />
                 </div>
                  <p> Username: {data?.username} </p>
                  <div className='flex flex-col justify-between items-center gap-3'>
                  
                    <Link to="/user/update">  <EditUser></EditUser> </Link>
                    <Logout></Logout>
                  </div>
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