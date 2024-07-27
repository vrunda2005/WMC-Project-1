import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { MdCurrencyBitcoin } from 'react-icons/md';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    alert("You have logged out");
    setAuth({ user: null, token: '', isLoggedIn: false });
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  const headerClass = `sticky z-50 top-0 p-5 flex justify-between items-center ${theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'}`;
  const buttonClass = `p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;

  return (
    <header className={headerClass}>
      <a href="/" className="logo text-lg font-bold">Logo</a>
      <button onClick={toggleTheme} className={buttonClass}>
        {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
      </button>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={buttonClass} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <nav className={`md:hidden fixed inset-0 bg-white dark:bg-gray-800 p-5 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex justify-between items-center mb-4">
          <a href="/" className="logo text-lg font-bold">Logo</a>
          <button onClick={() => setIsMobileMenuOpen(false)} className={buttonClass} aria-label="Close Menu">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          
          {auth.isAdmin ? (
            <>
            
            <li>
              <Link to='/events' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            </li>
            
             <li>
             <Link to='/admin' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Donation Users</Link>
           </li>
           <li>
             <Link to='/allusers' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Show Users</Link>
           </li>
           <li>
             <Link to='/allinquires' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>All Inquires</Link>
           </li>
           
           </>
          ) : (
            <>
             <li>
            <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
          </li>
          <li>
            <Link to="/storyPage" className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
          </li>
          <li>
            <Link to="/Blog" className="block py-2 px-4 rounded hover:underline  hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          </li>
          <li>
            <Link to="/Donate" className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
          </li>
          <li>
            <Link to='/About' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to='/Quiz' className="block py-2 px-4 rounded hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link>
          </li>
          <li>
            <Link to='/epsilonMap' className="block py-2 px-4 rounded  hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>EpsilonMap</Link>
          </li>
          <li>
            <Link to='/inquiryForm' className="block py-2 px-4 rounded  hover:underline hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Inquiry Form </Link>
          </li>
            
            </>
          )
        }

        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`mt-4 text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className={`block text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Desktop Menu Content */}
      <nav className="hidden md:flex items-center space-x-6">
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2 hover:underline">
            <FaRegUser size="1.5em" />
            <span className="ml-2">{auth.username}</span>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2 hover:underline">
            <MdCurrencyBitcoin size="1.5em" />
            <span className="ml-2">{auth.userPoints}</span>
          </div>
        )}
        <ul className="flex space-x-6">
        <li>
            <Link to="/" className={` hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
            <li>
              <Link to='/events' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Events</Link>
            </li>
            <li>
              <Link to='/admin' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Doantion Users</Link>
            </li>
            <li>
              <Link to='/allusers' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Show Users</Link>
            </li>
            <li>
              <Link to='/allinquires' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>All Inquires</Link>
            </li>
            </>
          ):(
            <>
              <li>
            <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === `/epsilon_program_membership/${auth.membership_id}` || window.location.pathname === '/membership' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Membership</Link>
          </li>
          <li>
            <Link to="/storyPage" className={` hover:underline  hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/storyPage' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Stories</Link>
          </li>
          <li>
            <Link to="/Blog" className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/Blog' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Blog</Link>
          </li>
          <li>
            <Link to="/Donate" className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/Donate' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donate</Link>
          </li>
          <li>
            <Link to='/About' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/About' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>About</Link>
          </li>
          <li>
            <Link to='/Quiz' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/Quiz' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Quiz</Link>
          </li>
          <li>
            <Link to='/epsilonMap' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/epsilonMap' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>EpsilonMap</Link>
          </li>
          <li>
            <Link to='/inquiryForm' className={`hover:underline hover:text-blue-500 dark:hover:text-blue-300 ${window.location.pathname === '/epsilonMap' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Inquiry Form</Link>
          </li>
          
            </>
          )
        
        }


        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className={`text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
              Log in
            </Link>
            <Link to="/signup" className={`text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
              Get started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
