import React, { useState } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => { 
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen lg:w-full shadow-2xl bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-[#ffe7b3] shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4  border-b">
          <h1 className={`text-xl font-bold ${!open && "hidden"}`}>Admin Panel</h1>
          <FiMenu
            size={22}
            onClick={() => setOpen(!open)}
            className="cursor-pointer ml-2"
          />
        </div>

        <ul className="mt-4 space-y-3 px-3">
          <Link to="/admin-panel">
          <li className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 cursor-pointer">
            <FiHome size={22} />
            {open && "Dashboard"}
          </li> 
          </Link>

         <Link to="/admin-panel/order">
          <li className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 cursor-pointer">
            <FiShoppingBag size={22} />
            {open && "Orders"}
          </li>
         </Link>

         <Link to="/admin-panel/product">
          <li className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 cursor-pointer">
            <FiBox size={22} />
            {open && "Products"}
          </li>
         </Link>

         <Link to="/admin-panel/contact">
          <li className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 cursor-pointer">
            <BiMessageDetail size={22} />
            {open && "Contact"}
          </li>
         </Link>

        
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
       <Outlet></Outlet>      
      </div>
    </div>
  );
};

export default AdminPanel;