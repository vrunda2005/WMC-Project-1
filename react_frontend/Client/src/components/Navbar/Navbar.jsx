import React from 'react';
import Login_navbar from './login_navbar';
import Logout_navbar from './logout_navbar';
import { Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../creatContext';
import { useContext,useEffect } from 'react';

const Navbar = () => {
  const { isLoggedIn ,logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true }); // Redirect to login page
    console.log("logout clicked")
  };

  if (isLoggedIn) {
    return <Login_navbar onLogout={handleLogout} />;
  } else {
    return <Logout_navbar />;
  }
};

export default Navbar;