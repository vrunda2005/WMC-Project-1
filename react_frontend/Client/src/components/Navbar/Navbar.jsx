import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRegUser, FaSun, FaMoon, FaBars, FaTimes, FaCaretDown } from 'react-icons/fa';
import { MdCurrencyBitcoin } from 'react-icons/md';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import './Navbar.css';
import Swal from 'sweetalert2';
import logo from '../../assets/images/character_ep.jpg'
import { MdOutlineQuiz } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FcDonate } from "react-icons/fc";
import mem from '../../assets/images/member-card.png'
import event from '../../assets/images/event.png'
import story from '../../assets/images/stories.png'
import profile from '../../assets/images/profile.png'
import quiz from '../../assets/images/quiz.png'
import { FcHome } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('Auth state:', auth);
  }, [auth]);

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

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

  const buttonClass = `px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;

  return (
    <header className={headerClass}>
      {/* Logo */}
      <img
        src="https://prod.cloud.rockstargames.com/crews/sc/9275/12545759/publish/emblem/emblem_512.png"
        alt="Logo"
        className="w-18 h-18 border-2 border-white"
      />

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className={buttonClass} aria-label="Toggle Theme">
        {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
      </button>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2"
        aria-label="Toggle Mobile Menu"
      >
        {isMobileMenuOpen ? <FaTimes size="1.5em" /> : <FaBars size="1.5em" />}
      </button>

      {/* Mobile Menu */}
      <nav
  className={`fixed inset-0 top-16 bg-gray-800 text-white z-50 transition-transform transform ${
    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
  } md:hidden`}
>
  <div className="p-4 flex justify-between items-center">
    <h2 className="text-xl font-semibold">Menu</h2>
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="text-gray-400 hover:text-white"
      aria-label="Close Mobile Menu"
    >
      <FaTimes size="1.5em" />
    </button>
  </div>
  <ul className="flex flex-col space-y-4 p-4">
    {auth.isLoggedIn && (
      <>
        <li className="flex items-center space-x-2">
          <FaRegUser size="1.5em" />
          <span className="ml-2 truncate">{auth.username}</span>
        </li>
        <li className="flex items-center space-x-2">
          <MdCurrencyBitcoin size="1.5em" />
          <span className="ml-2 truncate">{auth.userPoints}</span>
        </li>
      </>
    )}
    {auth.isLoggedIn ? (
      auth.isAdmin ? (
        <>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <img src={event} alt="Event" className="w-6 h-6" />
            <Link to="/events" className="ml-2 hover:underline">Events</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Link to="/admin" className="ml-2 hover:underline">Donation Users</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Link to="/allusers" className="ml-2 hover:underline">Show Users</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <Link to="/allinquires" className="ml-2 hover:underline">All Inquires</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <GiNewspaper size="1.5em" />
            <Link to="/AddNews" className="ml-2 hover:underline">Add News</Link>
          </li>
        </>
      ) : (
        <>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <img src={profile} alt="Profile" className="w-6 h-6" />
            <Link to="/Profile" className="ml-2 hover:underline">Profile</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <img src={mem} alt="Membership" className="w-6 h-6" />
            <Link
              to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'}
              className="ml-2 hover:underline"
            >
              Membership
            </Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <img src={story} alt="Stories" className="w-6 h-6" />
            <Link to="/storyPage" className="ml-2 hover:underline">Stories</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <img src={event} alt="Blog" className="w-6 h-6" />
            <Link to="/Blog" className="ml-2 hover:underline">Blog</Link>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FcDonate className="inline-block" />
            <Link to="/Donate" className="ml-2 hover:underline">Donate</Link>
          </li>
          <li className="p-2">
            <img src={auth.image} alt="Profile" className="w-18 h-18 rounded-full border-2 border-white" />
          </li>
        </>
      )
    ) : (
      <>
        <li className="p-2">
          <Link to="/login" className="block text-center py-2 px-4 bg-blue-500 rounded hover:bg-blue-600">Log in</Link>
        </li>
        <li className="p-2">
          <Link to="/signup" className="block text-center py-2 px-4 bg-green-500 rounded hover:bg-green-600">Get started</Link>
        </li>
      </>
    )}
    {auth.isLoggedIn && (
      <li className="p-2">
        <button onClick={handleLogout} className="block w-full text-center py-2 px-4 bg-red-500 rounded hover:bg-red-600">
          Logout
        </button>
      </li>
    )}
  </ul>
</nav>

 

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center space-x-10 flex-wrap">
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2">
            <FaRegUser size="1.5em" />
            <span className="ml-2">{auth.username}</span>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className="flex items-center space-x-2">
            <MdCurrencyBitcoin size="1.5em" />
            <span className="ml-2">{auth.userPoints}</span>
          </div>
        )}
        {auth.isLoggedIn ? (
          auth.isAdmin ? (
            <>
              <Link to="/events" className="hover:underline">
                <img src={event} alt="Event" className="w-6 h-6 inline-block" />
                Events
              </Link>
              <Link to="/admin" className="hover:underline">Donation Users</Link>
              <Link to="/allusers" className="hover:underline">Show Users</Link>
              <Link to="/allinquires" className="hover:underline">All Inquires</Link>
              <Link to="/AddNews" className="hover:underline">
                <GiNewspaper className="inline-block" />
                Add News
              </Link>
            </>
          ) : (
            <>
              <Link to="/Profile" className="hover:underline">
                <img src={profile} alt="Profile" className="w-6 h-6 inline-block" />
                Profile
              </Link>
              <Link
                to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'}
                className="hover:underline"
              >
                <img src={mem} alt="Membership" className="w-6 h-6 inline-block" />
                Membership
              </Link>
              <Link to="/storyPage" className="hover:underline">
                <img src={story} alt="Stories" className="w-6 h-6 inline-block" />
                Stories
              </Link>
              <Link to="/Blog" className="hover:underline">
                <img src={event} alt="Blog" className="w-6 h-6 inline-block" />
                Blog
              </Link>
              <Link to="/Donate" className="hover:underline">
                <FcDonate className="inline-block" />
                Donate
              </Link>
              <img src={auth.image} alt="Profile" className="w-18 h-18 rounded-full border-2 border-white" />
            </>
          )
        ) : (
          <>
            <Link to="/login" className={buttonClass}>Log in</Link>
            <Link to="/signup" className={buttonClass}>Get started</Link>
          </>
        )}
        {auth.isLoggedIn && (
          <button onClick={handleLogout} className={buttonClass}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
