import React,{useState} from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './creatContext';
import  './index.css'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <Navbar/>
      <Outlet />
      <Footer />
    </AuthProvider>
  )
}

export default App