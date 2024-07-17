import React, { useContext, useEffect } from 'react';
import Login_navbar from './login_navbar';
import Logout_navbar from './logout_navbar';
import { Link, useNavigate } from 'react-router-dom';
import {  useAuth } from '../../creatContext';

const Navbar = () => {
  const [ auth, setAuth ] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: '', isLoggedIn: false });
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  return (
    <nav>
      {auth.isLoggedIn? (
        <Login_navbar onLogout={handleLogout} />
      ) : (
        <Logout_navbar />
      )}
    </nav>
  );
};

export default Navbar;