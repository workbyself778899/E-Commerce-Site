import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const removeData =()=>{
        localStorage.removeItem("uid");
        localStorage.removeItem("u-token")
        navigate("/");
    }
  return (
    <div>
    <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200" onClick={()=>removeData()} >
      <FiLogOut size={20} />
      <span className="font-medium">Logout</span>
    </button>     
    </div>
  )
}

export default Logout