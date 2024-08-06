import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaSun, FaMoon, FaBars, FaTimes ,FaCaretDown} from 'react-icons/fa';
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
  
  const headerClass = `sticky h-18 top-0 z-50 p-4 md:p-6 flex justify-between  ${
    theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'
  }`;

  const buttonClass = `px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;

  return (
    <header className={headerClass}>
    {/* Logo */}
    <a href="/" className="text-lg font-bold  relative left-4 bottom-5">
      <img
        src="https://prod.cloud.rockstargames.com/crews/sc/9275/12545759/publish/emblem/emblem_512.png"
        alt="Logo"
        className="w-18 h-18 border-2 border-white rounded-full"
      />
    </a>

    {/* Theme Toggle Button */}
    <button
      onClick={toggleTheme}
      className="hidden md:flex items-center p-2 ml-auto"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-500" />
      )}
    </button>

      {/* Mobile Menu */}
      <nav className={`md:hidden fixed inset-0 bg-white dark:bg-gray-800 p-5 ${isMobileMenuOpen ? 'block' : 'hidden'} flex flex-col items-center transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out`}>
  <div className="flex justify-between items-center mb-4 w-full">
    <a href="/" className="text-lg font-bold">Logo</a>
    <button onClick={() => setIsMobileMenuOpen(false)} className={`${buttonClass} p-2`} aria-label="Close Menu">
      <FaTimes />
    </button>
  </div>
  <ul className="flex flex-col space-y-4 w-full">
    <li>
      <Link to="/" className={`block py-2 px-4 rounded truncate ${location.pathname === '/' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
    </li>
    {auth.isAdmin ? (
      <>
        <li>
          <Link to='/events' className={`block py-2 px-4 rounded truncate ${location.pathname === '/events' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/events' ? 'page' : undefined}>Events</Link>
        </li>
        <li>
          <Link to='/admin' className={`block py-2 px-4 rounded truncate ${location.pathname === '/admin' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/admin' ? 'page' : undefined}>Donation Users</Link>
        </li>
        <li>
          <Link to='/allusers' className={`block py-2 px-4 rounded truncate ${location.pathname === '/allusers' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/allusers' ? 'page' : undefined}>Show Users</Link>
        </li>
        <li>
          <Link to='/allinquires' className={`block py-2 px-4 rounded truncate ${location.pathname === '/allinquires' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/allinquires' ? 'page' : undefined}>All Inquires</Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`block py-2 px-4 rounded truncate ${location.pathname.includes('/membership') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname.includes('/membership') ? 'page' : undefined}>Membership</Link>
        </li>
        <li>
          <Link to="/storyPage" className={`block py-2 px-4 rounded truncate ${location.pathname === '/storyPage' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/storyPage' ? 'page' : undefined}>Stories</Link>
        </li>
        <li>
          <Link to="/Blog" className={`block py-2 px-4 rounded truncate ${location.pathname === '/Blog' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/Blog' ? 'page' : undefined}>Blog</Link>
        </li>
        <li>
          <Link to="/Donate" className={`block py-2 px-4 rounded truncate ${location.pathname === '/Donate' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/Donate' ? 'page' : undefined}>Donate</Link>
        </li>
        <li>
          <Link to='/About' className={`block py-2 px-4 rounded truncate ${location.pathname === '/About' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/About' ? 'page' : undefined}>About</Link>
        </li>
        <li>
          <Link to='/Quiz' className={`block py-2 px-4 rounded truncate ${location.pathname === '/Quiz' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/Quiz' ? 'page' : undefined}>Quiz</Link>
        </li>
        <li>
          <Link to='/epsilonMap' className={`block py-2 px-4 rounded truncate ${location.pathname === '/epsilonMap' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/epsilonMap' ? 'page' : undefined}>EpsilonMap</Link>
        </li>
        <li>
          <Link to='/inquiryForm' className={`block py-2 px-4 rounded truncate ${location.pathname === '/inquiryForm' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/inquiryForm' ? 'page' : undefined}>Inquiry Form</Link>
        </li>
        <li>
          <Link to='/News' className={`block py-2 px-4 rounded truncate ${location.pathname === '/News' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/News' ? 'page' : undefined}>News</Link>
        </li>
      </>
    )}
  </ul>
  {auth.isLoggedIn ? (
    <button onClick={handleLogout} className={`${buttonClass} mt-4`}>
      Logout
    </button>
  ) : (
    <div className="mt-4 flex flex-col space-y-2">
      <Link to="/login" className={`${buttonClass} block py-2 px-4 rounded`}>
        Log in
      </Link>
      <Link to="/signup" className={`${buttonClass} block py-2 px-4 rounded`}>
        Get started
      </Link>
    </div>
  )}
</nav>





      {/* Desktop Menu */}
      <nav className="hidden relative bottom-8 text-[17px] md:flex items-center space-x-10 flex-wrap justify-between">
      {auth.isLoggedIn && (
        <div className="flex space-x-2 items-center hover:underline">
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
      <ul className="flex items-center space-x-5">
        <li className="flex items-center space-x-1">
          <FcHome />
          <Link to="/" className={`hover:underline ${location.pathname === '/' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Home</Link>
        </li>
        {auth.isAdmin ? (
          <>
            <li className="flex items-center space-x-1">
              <img src={event} alt="Event" className="w-6 h-6" />
              <Link to="/events" className={`hover:underline ${location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Events</Link>
            </li>
            <li className="flex items-center space-x-1">
              <Link to="/admin" className={`hover:underline ${location.pathname === '/admin' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donation Users</Link>
            </li>
            <li className="flex items-center space-x-1">
              <Link to="/allusers" className={`hover:underline ${location.pathname === '/allusers' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Show Users</Link>
            </li>
            <li className="flex items-center space-x-1">
              <Link to="/allinquires" className={`hover:underline ${location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>All Inquires</Link>
            </li>
            <li className="flex items-center space-x-1">
              <GiNewspaper />
              <Link to="/AddNews" className={`hover:underline ${location.pathname === '/AddNews' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Add News</Link>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center space-x-2">
              <img src={profile} alt="Profile" className="w-6 h-6" />
              <Link to="/Profile" className={`hover:underline ${location.pathname === '/Profile' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Profile</Link>
            </li>
            <li className="flex items-center space-x-2">
              <img src={mem} alt="Membership" className="w-6 h-6" />
              <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`hover:underline ${location.pathname.includes('/epsilon_program_membership') || location.pathname === '/membership' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Membership</Link>
            </li>
            <li className="flex items-center space-x-2">
              <img src={story} alt="Story" className="w-6 h-6" />
              <Link to="/storyPage" className={`hover:underline ${location.pathname === '/storyPage' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Stories</Link>
            </li>
            <li className="flex items-center space-x-2">
              <img src={event} alt="Event" className="w-6 h-6" />
              <Link to="/Blog" className={`hover:underline ${location.pathname === '/Blog' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Blog</Link>
            </li>
            <li className="flex items-center space-x-2">
              <FcDonate />
              <Link to="/Donate" className={`hover:underline ${location.pathname === '/Donate' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donate</Link>
            </li>
            <li className="flex items-center space-x-2">
              <img src={auth.image} alt="Profile" className="w-18 h-18 rounded-full border-2 border-white" />
            </li>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`relative inline-block px-4 py-2 hover:underline ${isDropdownOpen ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
              >
                More <FaCaretDown className="inline ml-2" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute mt-2 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48 z-10">
                  <li className="flex items-center space-x-2 p-2">
                    <FcAbout />
                    <Link
                      to="/About"
                      className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/About' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                      onClick={handleDropdownClose}
                    >
                      About
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 p-2">
                    <FaMapMarkedAlt />
                    <Link
                      to="/epsilonMap"
                      className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/epsilonMap' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                      onClick={handleDropdownClose}
                    >
                      EpsilonMap
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 p-3">
                    <FaPersonCircleQuestion />
                    <Link
                      to="/inquiryForm"
                      className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/inquiryForm' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                      onClick={handleDropdownClose}
                    >
                      Inquiry Form
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 p-2">
                    <GiNewspaper />
                    <Link
                      to="/News"
                      className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/News' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                      onClick={handleDropdownClose}
                    >
                      News
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 p-2">
                    <img src={quiz} alt="Quiz" className="w-6 h-6" />
                    <Link to="/Quiz" className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/Quiz' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`} onClick={handleDropdownClose}>
                      Quiz
                    </Link>
                  </li>
                </ul>
              )}
            </div>
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
