import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <header className="header">
      <a href="/" className="logo">Logo</a>
      <nav className="navbar">
        <Link to="/">Home</Link>
       
        <Link to="/Donate">Donate</Link>
        <a href="/">Membership</a>
        <a href="/">Contact</a>
        <Link to='/About'>About</Link>
       
      </nav>  
    </header>     
    </>
  
  )
}

export default Navbar