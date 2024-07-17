import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../creatContext';
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";
import axios from 'axios';
import { useAuth } from '../../creatContext';

const Login_navbar = () => {
  // const [points, setPoints] = useState(0);
  // const { isLoggedIn, logout, setIsLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();

  const handleLogout = () => {
    alert("You've been logged out");
    setAuth({ username: null, token: '',points:0,isAdmin:false, isLoggedIn: false });
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="sticky z-50 top-0 p-5 flex content-between place-content-between bg-white">
        <a href="/" className="logo">Logo</a>
        {/* <div className='flex gap-5 '><FaRegUser size="1.5em" />{username}</div>
        <div className='flex gap-5 '><MdCurrencyBitcoin size="1.5em" />{points}</div> */}
        {
          auth.isLoggedIn ? (
            <nav className="navbar">
                 {auth.username}
                 { auth.userPoints}
                    <Link to="/">Home</Link>
                
                    <Link to="/membership">Membership</Link>
                    <Link to="#">Blog</Link>
                    <Link to="/Donate">Donate</Link>
                    <Link to='/About'>About</Link>
                    <Link to='/Quiz'>Quiz</Link>
          
            </nav>
          ) : (
            <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="#">Blog</Link>
            {/* <Link to="/Donate">Donate</Link> */}
            <Link to='/About'>About</Link>
            <Link to='/Quiz'>Quiz</Link>
            </nav>
          )
        }
        <div className="flex items-center lg:order-2">
          <button onClick={handleLogout} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Logout</button>
        </div>
      </header>
    </>
  )
}

export default Login_navbar;