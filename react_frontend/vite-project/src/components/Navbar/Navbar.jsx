import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <a href="/" className="logo">Logo</a>

      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/">Buy</a>
        <a href="/">Sell</a>
        <a href="/">Contact</a>
        <a href="/">About</a>
      </nav>
    </header>
  )
}

export default Navbar