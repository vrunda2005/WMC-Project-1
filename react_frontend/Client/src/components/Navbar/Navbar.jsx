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

      {/* <a href="/" className="text-lg font-bold truncate relative left-4 bottom-5">Logo</a> */}
      <img
          src="https://prod.cloud.rockstargames.com/crews/sc/9275/12545759/publish/emblem/emblem_512.png" // Replace with the URL of the profile picture
          alt="Profile"
          className="w-18 h-18  border-2 border-white text-lg font-bold truncate relative left-4 bottom-5"/>
      {/* Theme Toggle Button */}
      {/* <button onClick={toggleTheme} className={buttonClass} aria-label="Toggle Theme">
        {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
      </button> */}

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
      <nav className="hidden relative bottom-8 text-[17px] md:flex items-center space-x-10 flex-wrap  flex-center justify-between">
        {auth.isLoggedIn && (
          <div className="flex  space-x-2 hover:underline">
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
        <ul className="flex flex-center items-center justify-between space-x-5">
          <li className="flex items-center space-x-1 ">
            <FcHome/>
            <Link to="/" className={`hover:underline ${window.location.pathname === '/' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
              <li className="flex items-center space-x-1 ">
              <img src={event} alt="img" className="w-6 h-6" />

             <Link to='/events' className={`hover:underline ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Events</Link>
              </li>
              <li className="flex items-center space-x-1 ">
                <Link to='/admin' className={`hover:underline ${window.location.pathname === '/admin' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donation Users</Link>
              </li>
              <li className="flex items-center space-x-1 ">

                <Link to='/allusers' className={`hover:underline ${window.location.pathname === '/allusers' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Show Users</Link>
              </li>
              <li className="flex items-center space-x-1 ">

                <Link to='/allinquires' className={`hover:underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>All Inquires</Link>
              </li>
              
              <li className="flex items-center space-x-1 ">
              <GiNewspaper/>
                <Link to='/AddNews' className={`hover:underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Add News</Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center space-x-2 ">
              <img src={profile} alt="img" className="w-6 h-6" />
               <Link to="/Profile" className={`hover:underline ${window.location.pathname === '/Profile' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Profile</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img src={mem} alt="membership" className="w-6 h-6" />
              <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`hover:underline ${window.location.pathname.includes('/epsilon_program_membership') || window.location.pathname === '/membership' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Membership</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img src={story} alt="img" className="w-6 h-6" />
              <Link to="/storyPage" className={`hover:underline ${window.location.pathname === '/storyPage' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Stories</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img src={event} alt="img" className="w-6 h-6" />
              <Link to="/Blog" className={`hover:underline ${window.location.pathname === '/Blog' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Blog</Link>
              </li>

              <li className="flex items-center space-x-2 ">
                <FcDonate/>
              <Link to="/Donate" className={`hover:underline ${window.location.pathname === '/Donate' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Donate</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img
                src={auth.image} 
                alt="Profile"
                className="w-18 h-18 rounded-full border-2 border-white"
              />
            </li>
    
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative inline-block px-4 py-2 hover:underline ${isDropdownOpen ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
            >
              More <FaCaretDown className="inline ml-2" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute mt-2 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48 z-10" >
                <li className="flex items-center space-x-2 p-2">
                  <FcAbout/>
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
                  <GiNewspaper/>
                  <Link
                    to="/News"
                    className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/News' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                    onClick={handleDropdownClose}
                  >
                    News
                  </Link>
                </li>
                <li className="flex items-center space-x-2 p-2">
                <img src={quiz} alt="img" className="w-6 h-6" />

                <Link to='/Quiz' className={`hover:underline ${window.location.pathname === '/Quiz' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}
                onClick={handleDropdownClose}
                >Quiz</Link>
                
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
