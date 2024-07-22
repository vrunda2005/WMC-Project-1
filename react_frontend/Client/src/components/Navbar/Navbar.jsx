import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";
import { useAuth } from '../../creatContext';
import MembershipTier from '../Membership/epsilon_program_membership'



const Navbar = () => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();
  const [userData, setUserData]=useAuth();

  // console.log("user data",userData );
  // console.log("auth data",auth );


  const handleLogout = () => {
    alert("You have logged out")
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '', isLoggedIn: false });
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="sticky z-50 top-0 p-5 flex justify-between bg-white md:flex-row flex-col">
        <a href="/" className="logo">Logo</a>
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
<<<<<<< HEAD
                <li><Link to="/membership">Membership</Link></li>
                <li><Link to="/Blog">Blog</Link></li>
=======
                <li>
                  <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'}>
                    Membership
                  </Link>
                </li>
                {/* <li><Link to="/membership">Membership</Link></li> */}

                {auth.isAdmin ? (   <li><Link to="#">create event</Link></li>) : (   <li><Link to="#">events</Link></li>)}

                <li><Link to="/storyPage">Stories</Link></li>

             
>>>>>>> 62676a2baba6396a450c520ba0e0475926f09ad1
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
            <button onClick={handleLogout} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Logout</button>
          </div>
        ) : (
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
        )}
        
      </header>
    </>
  )
}

export default Navbar;