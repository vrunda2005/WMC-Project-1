import React,{useState} from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './creatContext';
import  './index.css'
import { Outlet } from 'react-router-dom'

const App = () => {

  

  return (
    <AuthProvider>
       {/* <div className='bg-hero-pattern bg-cover bg-center text-text-light' > */}
        {/* <div className="absolute inset-1 bg-overlay"></div> Optional overlay for better readability */}

            <Navbar/>
            <Outlet />
            <Footer />
      {/* </div> */}
    </AuthProvider>
  )
}

export default App