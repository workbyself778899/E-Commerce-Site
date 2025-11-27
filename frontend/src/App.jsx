import React from 'react'
import Footer from './component/Footers/Footer'
import './index.css'
import Insta from './component/Footers/Insta'
import Method from './component/Footers/Method'
import Header from './component/Header/Header'
import MyAccount from './pages/MyAccount'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import SingleBlog from './pages/SingleBlog'
import AdminBlog from './component/Admin/Blog'
import { Route, Routes } from 'react-router'
import Shop from './pages/Shop'
import Details from './pages/Details'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import MainLayout from './pages/MainLayout'
import About from './pages/About'
import SingleProduct from './pages/SingleProduct'
import ResetPass from './pages/ResetPass'
import ForgetPass from './component/Form/ForgetPass'
import UpdateUserForm from './component/Form/UpdateUserForm'
import AdminPanel from './component/Admin/AdminPanel'
import Dashboard from './component/Admin/Dashboard'
import Order from './component/Admin/Order'
import Product from './component/Admin/Product'
import ContactList from './component/Admin/ContactList'
import FeaturedAdmin from './component/Admin/Featured'


const App = () => {   
  return (
    <div>
    
    <Routes>

      {/* In this route will only take those pages which will need Footer and Header  */}
      <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}> </Route>
          <Route path='/shop' element={<Shop/>}> </Route>      
          <Route path="/blog"  element={<Blog/>}> </Route>
          <Route path="/blog/:id" element={<SingleBlog/>}></Route>
          <Route path="/details" element={<Details/>}> </Route>
          <Route path="/myaccount" element={<MyAccount/>}> </Route>
          <Route path="/checkout" element={<Checkout/>}> </Route>
          <Route path="/contact" element={<Contact/>}> </Route>
          <Route path="/cart" element={<Cart />}> </Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/single-product/:id" element={<SingleProduct/>}></Route>

          {/* For Admin Panle  */}
            <Route path='/admin-panel' element={<AdminPanel/>} >
            <Route index element={<Dashboard/>}></Route>
            <Route path='order' element={<Order/>}></Route>
            <Route path='product' element={<Product/>}></Route>
            <Route path='contact' element={<ContactList/>}></Route>
            <Route path='featured' element={<FeaturedAdmin/>}></Route>
            <Route path='blog' element={<AdminBlog/>}></Route>
            </Route>
          
      </Route>
      <Route path="/user/reset/:id/:token" element={<ResetPass/>}></Route>
      <Route path="/user/forget-email" element={<ForgetPass/>}></Route>
      <Route path='/user/update' element={<UpdateUserForm/>} ></Route>
    

      <Route path='*' element={<NotFound/>}></Route>


   
    </Routes>
     
    </div>
  )
}

export default App