import React, { useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../usetheamContext';

function MembershipPage() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();


  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

    // Define theme-based classes
    const containerBgColor = theme === 'blue' ? 'bg-blue-secondary-bg' : 'bg-dark-primary-bg';
    const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
    const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
    const Hightlight = theme === 'blue' ? 'text-blue-text-dark' : 'text-dark-text-dark';

    const overlay=theme==='blue' ? 'bg-blue-overlay' : 'bg-dark-overlay'; 

    const buttonBgColorBasic = theme === 'blue' ? 'hover:bg-blue-accent' : 'hover:bg-dark-accent';
    const buttonBgColorPremium = theme === 'blue' ? 'bg-blue-accent hover:bg-blue-highlight' : 'bg-dark-accent hover:bg-dark-highlight';
    const buttonBgColorElite = theme === 'blue' ? ' hover:bg-blue-highlight' : 'hover:bg-dark-highlight';
  
    return (
      <div className={`mx-auto px-4 py-8 md:px-8 md:py-7 lg:px-12 lg:py-16 page-background opacity-90 ${overlay} ` }>
        <div className="text-center mb-12">
        {auth.isLoggedIn ? (<>
          <h1 className={`text-4xl font-bold mb-4 marke `}>Join the Epsilon Program</h1>
          <h2 className={`text-3xl font-semibold mb-4 ${textSecondary}`}>
            Welcome, {auth.username ? auth.username : ''}
          </h2>
          <p className={` ${textSecondary} shadow-md  `}>
            Choose your membership level and start your journey to happiness and freedom from thoughts!
          </p>
        </>):(<>
          <h1 className="text-4xl font-bold mb-4 marke ">Join the Epsilon Program</h1>
          <h2 className="text-3xl font-semibold  mb-4">Become a Member</h2>
          <p className=" ">
            Please sign in to access membership options and start your journey to happiness and freedom from thoughts!
          </p>
          <button
            className="mb-12 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
            onClick={() => {
              navigate(`/Login`)
            }}
          >
            Sign In
          </button>
        </>)}
        </div>
  
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 mb-12">
          {/* Basic Membership */}
          <div className={`${containerBgColor} ${textPrimary} bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4`}>
            <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Epsilon Enthusiast</h3>
            <div className="flex items-center justify-center mb-4">
              <h2 className={`text-4xl font-bold ${theme === 'blue' ? 'text-blue-highlight' : 'text-dark-highlight'}`}>$10</h2>
              <span className=" ml-2">per month</span>
            </div>
            <p className={` font-semibold mb-4 ${Hightlight}`}>Entry-level membership</p>
            <ul className={`list-disc list-inside mb-4  ${textSecondary}`}>
              <li>Basic access to Epsilon Program resources.</li>
              <li>Access to online forums and community discussions.</li>
              <li>Subscription to Epsilon Program newsletter.</li>
              <li>Limited access to events (e.g., online webinars).</li>
            </ul>
            <Link to={`/MembershipLayout/${1}`}>
            <button
            disabled={!auth.isLoggedIn}
            className={`w-full py-2 px-4 text-white rounded-lg  ${buttonBgColorBasic} ${auth.isLoggedIn ?  'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'}`}>
                Read More Basic
              </button>
            </Link>
            {/* {auth.userPoints && <p className={`text-center mt-4 ${textPrimary}`}>Your Points: {auth.userPoints}</p>} */}
          </div>
  
          {/* Premium Membership */}
          <div className={`${containerBgColor}  bg-opacity-80 ${textPrimary} p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4`}>
            <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Epsilon Evangelist</h3>
            <div className="flex items-center justify-center mb-4">
            <h2 className={`text-4xl font-bold ${theme === 'blue' ? 'text-blue-highlight' : 'text-dark-highlight'}`}>$20</h2>
            <span className="ml-2">per month</span>
            </div>
            <p className={`font-semibold mb-4 ${Hightlight}`}>Epsilon Visionary</p>
            <ul className={`list-disc list-inside mb-4 ${textSecondary}`}>
              <li>Full access to Epsilon Program resources.</li>
              <li>Discounts on events and merchandise.</li>
              <li>Personalized coaching sessions with Epsilon Program leaders.</li>
              <li>Exclusive access to Epsilon Program's inner circle (e.g., private Facebook group).</li>
            </ul>
            <Link to={`/MembershipLayout/${2}`}>
            <button
            disabled={!auth.isLoggedIn}
            className={`w-full py-2 px-4 text-white rounded-lg  ${buttonBgColorBasic} ${auth.isLoggedIn ?  'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'}`}>
                Read More Premium
              </button>
            </Link>
            {/* {auth.userPoints && <p className={`text-center mt-4 ${textPrimary}`}>Your Points: {auth.userPoints}</p>} */}
          </div>
  
          {/* Elite Membership */} 
          <div className={`${containerBgColor} ${textPrimary}  bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4`}>
            <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Elite Membership</h3>
            <div className="flex items-center justify-center mb-4">
            <h2 className={`text-4xl font-bold ${theme === 'blue' ? 'text-blue-highlight' : 'text-dark-highlight'}`}>$30</h2>
            <span className="ml-2">per month</span>
            </div>
            <p className={` font-semibold mb-4 ${Hightlight}`}>Elite membership</p>
            <ul className={`list-disc list-inside mb-4  ${textSecondary}`}>
              <li>Subscription to Epsilon Program newsletter.</li>
              <li>Personalized spiritual guidance and mentorship.</li>
              <li>Invitation to an annual retreat at a secluded location.</li>
              <li>VIP access to exclusive events (e.g., private meetings with Epsilon Program leaders).</li>
            </ul>
            <Link to={`/MembershipLayout/${3}`}>
            <button
            disabled={!auth.isLoggedIn}
            className={`w-full py-2 px-4 text-white rounded-lg  ${buttonBgColorBasic} ${auth.isLoggedIn ?  'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'}`}>
                Read More Elite
              </button>
            </Link>
            {/* {auth.userPoints && <p className={`text-center mt-4 ${textPrimary}`}>Your Points: {auth.userPoints}</p>} */}
          </div>
        </div>
      </div>
    );
  }
  
  export default MembershipPage;