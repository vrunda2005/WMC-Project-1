import React,{useState,useEffect} from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import  './index.css'
import { Outlet } from 'react-router-dom'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  


  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}  />
      <Outlet />
      <Footer />
    </>
  )
}

export default App