import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";
import { useAuth } from '../../creatContext';
import MembershipTier from '../Membership/epsilon_program_membership'
import { useTheme } from '../../usetheamContext';
import { FaSun, FaMoon } from 'react-icons/fa';



const Navbar = () => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userData, setUserData]=useAuth();
  
  const handleLogout = () => {
    alert("You have logged out")
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '', isLoggedIn: false });
    navigate('/login', { replace: true });
  };

  // Apply theme classes
  const headerClass = `sticky z-50 top-0 p-5 flex justify-between ${theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'}`;
  const buttonClass = `p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;
  
  return (
    <header className={headerClass}>
      <a href="/" className="logo">Logo</a>
      <button onClick={toggleTheme} className={buttonClass}>
      {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
    </button>
      {auth.membership_id}
      {
        auth.isLoggedIn ? (
          <nav className="navbar flex flex-wrap justify-between md:flex-row flex-col">
            <div className="flex items-center mb-2 md:mb-0">
              <FaRegUser size="1.5em" />
              <span className="ml-2">{auth.username}</span>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <MdCurrencyBitcoin size="1.5em" />
              <span className="ml-2">{auth.userPoints}</span>
            </div>
            <ul className="flex flex-wrap justify-between md:flex-row flex-col">
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'}>
                  Membership
                </Link>
              </li>
              <li><Link to="/storyPage">Stories</Link></li>
              <li><Link to="/Blog">Blog</Link></li>
              <li><Link to="/Donate">Donate</Link></li>
              <li><Link to='/About'>About</Link></li>
              <li><Link to='/Quiz'>Quiz</Link></li>
              {
                auth.isAdmin ? (
                  <li><Link to='/events'>Events</Link></li>
                ) : null
              }
            </ul>
          </nav>
        ) : (
          <nav className="navbar flex flex-wrap justify-between md:flex-row flex-col">
            <ul className="flex flex-wrap justify-between md:flex-row flex-col">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to='/About'>About</Link></li>
              <li><Link to='/Quiz'>Quiz</Link></li>
            </ul>
          </nav>
        )
      }

      {auth.isLoggedIn ? (
        <div className="flex items-center lg:order-2">
          <button onClick={handleLogout} className={`text-gray-800 hover:bg-red-500
           focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${buttonClass}`}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center lg:order-2">
          <Link
              to="/login"
              className={`text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${buttonClass}`}
          >
              Log in
          </Link>
          <Link
              to="/signup"
              className={buttonClass}
          >
              Get started
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;