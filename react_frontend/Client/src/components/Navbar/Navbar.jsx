import React, { useContext, useEffect } from 'react';
import Login_navbar from './login_navbar';
import Logout_navbar from './logout_navbar';
import { Link, useNavigate } from 'react-router-dom';
import {  AuthContext, useAuth } from '../../creatContext';

const Navbar = () => {
  const  [auth, setAuth ] = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    // Check if the auth object is initialized correctly
    console.log("Here is desturctured auth",auth);
    localStorage.getItem('auth');
    console.log("Here is desturctured auth",auth);


    // if (!auth) {
    //   setAuth({ user: null, token: '', isLoggedIn: false });
    // }
  }, [auth]);

  const handleLogout = () => {
    setAuth({ user: null, token: '', isLoggedIn: false });
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  return (
    <nav>
    {auth && auth.isLoggedIn? (
        <Login_navbar onLogout={handleLogout} />
      ) : (
        <Logout_navbar />
      )}
    </nav>
  );
};

export default Navbar;