import React,{useContext} from 'react'
import './Navbar.css'
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../../creatContext'

const Login_navbar = () => {
  const { isLoggedIn, logout, setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
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
        <button onClick={handleLogout}>Logout</button>
       
      
      </nav>  
 
    </header>     
    </>
  )
}

export default Login_navbar