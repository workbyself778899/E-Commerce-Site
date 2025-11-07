import React from 'react'
import Header from '../component/Header/Header'
import Footer from '../component/Footers/Footer'
import Insta from '../component/Footers/Insta'
import Method from '../component/Footers/Method'
import { Outlet } from 'react-router'

const MainLayout = () => { 
  return (
    <div>
        <Header></Header>
        {/* Here we will show the pages that is navigated by Route  */}
        <Outlet></Outlet>   
        <Method></Method>
        <Footer></Footer>

    </div>
  )
}

export default MainLayout