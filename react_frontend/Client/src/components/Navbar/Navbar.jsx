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
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '', isLoggedIn: false });
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
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} onClick={() => setIsMobileMenuOpen(false)}>Membership</Link></li>
          <li><Link to="/storyPage" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link></li>
          <li><Link to="/Blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link></li>
          <li><Link to="/Donate" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link></li>
          <li><Link to='/About' onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          <li><Link to='/Quiz' onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link></li>
          <li><Link to='/epsilonMap' onClick={() => setIsMobileMenuOpen(false)}>EpsilonMap</Link></li>
          {auth.isAdmin && <li><Link to='/events' onClick={() => setIsMobileMenuOpen(false)}>Events</Link></li>}
        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`mt-4 text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className={`text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Desktop Menu Content */}
      <nav className="hidden md:flex flex-wrap justify-between items-center">
        {auth.isLoggedIn && (
          <div className="flex items-center mb-2">
            <FaRegUser size="1.5em" />
            <span className="ml-2">{auth.username}</span>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className="flex items-center mb-2">
            <MdCurrencyBitcoin size="1.5em" />
            <span className="ml-2">{auth.userPoints}</span>
          </div>
        )}
        <ul className="flex flex-wrap justify-between">
          <li><Link to="/">Home</Link></li>
          <li><Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'}>Membership</Link></li>
          <li><Link to="/storyPage">Stories</Link></li>
          <li><Link to="/Blog">Blog</Link></li>
          <li><Link to="/Donate">Donate</Link></li>
          <li><Link to='/About'>About</Link></li>
          <li><Link to='/Quiz'>Quiz</Link></li>
          <li><Link to='/epsilonMap'>EpsilonMap</Link></li>
          {auth.isAdmin && <li><Link to='/events'>Events</Link></li>}
        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`text-gray-800 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="flex items-center">
            <Link to="/login" className={`text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 ${buttonClass}`}>
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
