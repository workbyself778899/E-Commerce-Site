import React from 'react'
import Footer from './component/Footers/Footer'
import './index.css'
import Insta from './component/Footers/Insta'
import Method from './component/Footers/Method'
import Header from './component/Header/Header'


const App = () => { 
  return (
    <div>App
      <Header></Header>
      <Method></Method>
        <Insta></Insta>
      <Footer></Footer>
    
    </div>
  )
}

export default App