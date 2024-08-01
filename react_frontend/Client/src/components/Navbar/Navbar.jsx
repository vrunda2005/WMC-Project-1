import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { MdCurrencyBitcoin } from 'react-icons/md';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import './Navbar.css';
import Swal from 'sweetalert2';


const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log('Auth state:', auth);
  }, [auth]);

 

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout action
        setAuth({ user: null, token: '', isLoggedIn: false });
        localStorage.removeItem('auth');
        navigate('/login', { replace: true });
  
        Swal.fire(
          'Logged Out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };
  
  const headerClass = `sticky top-0 z-50 p-4 md:p-6 flex justify-between items-center ${
    theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'
  }`;

  const buttonClass = `p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;

  return (
    <header className={headerClass}>
      {/* Logo */}
      <a href="/" className="text-lg font-bold truncate">Logo</a>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className={buttonClass} aria-label="Toggle Theme">
        {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
      </button>

      {/* Mobile Menu Toggle Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden ${buttonClass}`} aria-label="Toggle Menu">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <nav className={`md:hidden fixed inset-0 bg-white dark:bg-gray-800 p-5 ${isMobileMenuOpen ? 'block' : 'hidden'} flex flex-col items-center`}>
        <div className="flex justify-between items-center mb-4 w-full">
          <a href="/" className="text-lg font-bold">Logo</a>
          <button onClick={() => setIsMobileMenuOpen(false)} className={buttonClass} aria-label="Close Menu">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 w-full">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
              <li>
                <Link to='/events' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              </li>
              <li>
                <Link to='/admin' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Donation Users</Link>
              </li>
              <li>
                <Link to='/allusers' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Show Users</Link>
              </li>
              <li>
                <Link to='/allinquires' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>All Inquires</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
              </li>
              <li>
                <Link to="/storyPage" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
              </li>
              <li>
                <Link to="/Blog" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              </li>
              <li>
                <Link to="/Donate" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
              </li>
              <li>
                <Link to='/About' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li>
                <Link to='/Quiz' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link>
              </li>
              <li>
                <Link to='/epsilonMap' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>EpsilonMap</Link>
              </li>
              <li>
                <Link to='/inquiryForm' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Inquiry Form</Link>
              </li>
              <li>
                <Link to='/News' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
              </li>
            </>
          )}
        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`mt-4 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className={buttonClass}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center space-x-4 flex-wrap">
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2 hover:underline">
            <FaRegUser size="1.5em" />
            <span className="ml-2 truncate">{auth.username}</span>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2 hover:underline">
            <MdCurrencyBitcoin size="1.5em" />
            <span className="ml-2 truncate">{auth.userPoints}</span>
          </div>
        )}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className={`hover:underline ${window.location.pathname === '/' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
              <li>
                <Link to='/events' className={`hover:underline ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Events</Link>
              </li>
              <li>
                <Link to='/admin' className={`hover:underline ${window.location.pathname === '/admin' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donation Users</Link>
              </li>
              <li>
                <Link to='/allusers' className={`hover:underline ${window.location.pathname === '/allusers' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Show Users</Link>
              </li>
              <li>
                <Link to='/allinquires' className={`hover:underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>All Inquires</Link>
              </li>
              <li>
                <Link to='/AddNews' className={`hover:underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Add News</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`hover:underline ${window.location.pathname.includes('/epsilon_program_membership') || window.location.pathname === '/membership' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Membership</Link>
              </li>
              <li>
                <Link to="/storyPage" className={`hover:underline ${window.location.pathname === '/storyPage' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Stories</Link>
              </li>
              <li>
                <Link to="/Blog" className={`hover:underline ${window.location.pathname === '/Blog' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Blog</Link>
              </li>
              <li>
                <Link to="/Donate" className={`hover:underline ${window.location.pathname === '/Donate' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donate</Link>
              </li>
              <li>
                <Link to='/About' className={`hover:underline ${window.location.pathname === '/About' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>About</Link>
              </li>
              <li>
                <Link to='/Quiz' className={`hover:underline ${window.location.pathname === '/Quiz' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Quiz</Link>
              </li>
              <li>
                <Link to='/epsilonMap' className={`hover:underline ${window.location.pathname === '/epsilonMap' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>EpsilonMap</Link>
              </li>
              <li>
                <Link to='/inquiryForm' className={`hover:underline ${window.location.pathname === '/inquiryForm' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Inquiry Form</Link>
              </li>
              <li>
                <Link to='/News' className={`hover:underline ${window.location.pathname === '/inquiryForm' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>News</Link>
              </li>
            </>
          )}
        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={buttonClass}>
            Logout
          </button>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className={buttonClass}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
