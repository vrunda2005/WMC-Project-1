import React,{useContext} from 'react'
import './Navbar.css'
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../../creatContext'

const Login_navbar = () => {
  const { isLoggedIn, logout, setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You've been logged out");
    localStorage.removeItem('token');
    console.log("clicked logout");
   logout();
   setIsLoggedIn(false); 
    navigate('/', { replace: true }); // Redirect to login page
  };

  return (
    <>
    <header className="sticky z-50 top-0 p-5 flex content-between place-content-between bg-white ">
      <a href="/" className="logo">Logo</a>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/membership">Membership</Link>
        <Link to="#">Blog</Link>

        <Link to="/Donate">Donate</Link>
        <Link to='/About'>About</Link>
      </nav>  
      <div className="flex items-center lg:order-2">
        <button onClick={handleLogout} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Logout</button>
      </div>
 
    </header>     
    </>
  )
}

export default Login_navbar