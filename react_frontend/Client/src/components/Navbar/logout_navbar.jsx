import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Logout_navbar = () => {
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
      <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
    </header>     
    </>
  
  )
}

export default Logout_navbar