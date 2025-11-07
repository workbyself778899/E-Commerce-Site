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
import { Route, Routes } from 'react-router'
import Shop from './pages/Shop'
import Details from './pages/Details'
import Cart from './pages/Cart'
import Checkout from './pages/Chekout'
import NotFound from './pages/NotFound'
import Favorites from './pages/Favorites'
import MainLayout from './pages/MainLayout'
import About from './pages/About'


const App = () => {   
  return (
    <div>
    
    <Routes>

      {/* In this route will only take those pages which will need Footer and Header  */}
      <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}> </Route>
          <Route path='/shop' element={<Shop/>}> </Route>      
          <Route path="/blog"  element={<Blog/>}> </Route>
          <Route path="/details" element={<Details/>}> </Route>
          <Route path="/myaccount" element={<MyAccount/>}> </Route>
          <Route path="/checkout" element={<Checkout/>}> </Route>
          <Route path="/contact" element={<Contact/>}> </Route>
          <Route path="/cart" element={<Cart />}> </Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path='/favorites' element={<Favorites/>}></Route>
      </Route>
      
      <Route path='*' element={<NotFound/>}></Route>
   
    </Routes>
     
    </div>
  )
}

export default App