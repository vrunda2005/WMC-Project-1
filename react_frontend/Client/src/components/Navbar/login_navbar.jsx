import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Login_navbar = () => {
  return (
    <>
    <header className="sticky z-50 top-0 p-5 flex content-between place-content-between bg-white ">
      <a href="/" className="logo">Logo</a>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="#">Membership</Link>
        <Link to="#">Blog</Link>

        <Link to="/Donate">Donate</Link>
        <Link to='/About'>About</Link>
      
      </nav>  
 
    </header>     
    </>
  )
}

export default Login_navbar