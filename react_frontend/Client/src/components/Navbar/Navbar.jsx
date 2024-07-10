import React from 'react';
import Login_navbar from './login_navbar';
import Logout_navbar from './logout_navbar';
import { AuthContext } from '../../creatContext';
import { useContext } from 'react';

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);


  if (isLoggedIn) {
    return <Login_navbar />;
  } else {
    return <Logout_navbar />;
  }
};

export default Navbar;