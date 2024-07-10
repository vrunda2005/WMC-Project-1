import React from 'react';
import Login_navbar from './login_navbar';
import Logout_navbar from './logout_navbar';


const Navbar = ({isLoggedIn}) => {
  if (isLoggedIn) {
    return <logout_navbar />;
  } else {
    return <Login_navbar />;
  }
};

export default Navbar;