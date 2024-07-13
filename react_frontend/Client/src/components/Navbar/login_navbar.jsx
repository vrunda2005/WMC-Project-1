import React,{useContext, useEffect} from 'react'
import './Navbar.css'
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../../creatContext'
import { FaRegUser } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";

const Login_navbar = () => {
  const { isLoggedIn, logout, setIsLoggedIn ,isAdminLoggedIN ,setIsAdminLoggedIn} = useContext(AuthContext); 
  const navigate = useNavigate();

  const username=localStorage.getItem('username'); 
  const points=localStorage.getItem('points'); 



  const handleLogout = () => {
    alert("You've been logged out");
    localStorage.removeItem('token');
    console.log("clicked logout");
   logout();
   setIsLoggedIn(false); 
   setIsAdminLoggedIn(false);
    navigate('/', { replace: true }); // Redirect to login page
  };

  return (
    <>
    <header className="sticky z-50 top-0 p-5 flex content-between place-content-between bg-white ">
      <a href="/" className="logo">Logo</a>
      <div className='flex gap-5 '><FaRegUser size="1.5em" />{username}</div>
      <div className='flex gap-5 '><MdCurrencyBitcoin size="1.5em" />{points}</div>
      {/* <h1>points:{points}</h1> */}

      {
        isAdminLoggedIN ? ( 
           <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="#">Blog</Link>
          {/* <Link to="/Donate">Donate</Link> */}
          <Link to='/About'>About</Link>
          <Link to='/Quiz'>Quiz</Link>
        </nav>  )  :
        (  <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/membership">Membership</Link>
          <Link to="#">Blog</Link>
          <Link to="/Donate">Donate</Link>
          <Link to='/About'>About</Link>
          <Link to='/Quiz'>Quiz</Link>
        </nav>  )
      }
    
      
      <div className="flex items-center lg:order-2">
        <button onClick={handleLogout} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Logout</button>
      </div>
 
    </header>     
    </>
  )
}

export default Login_navbar