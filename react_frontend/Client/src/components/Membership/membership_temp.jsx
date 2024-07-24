import React, { useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useNavigate, Link } from 'react-router-dom';

function MembershipPage() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Join the Epsilon Program</h1>
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">
          Welcome, {auth.username ? auth.username : 'Guest'}
        </h2>
        <p className="text-lg text-blue-700">
          Choose your membership level and start your journey to happiness and freedom from thoughts!
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 mb-12">
        <div className="bg-white bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          {/* Basic Membership */}
          <h3 className="text-xl font-semibold text-center mb-4">Basic Membership</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl font-bold text-blue-600">$149</h2>
            <span className="text-sm ml-2">per month</span>
          </div>
          <p className="text-lg font-semibold mb-4">Entry-level membership</p>
          <ul className="list-disc list-inside mb-4 text-sm text-blue-800">
            <li>Basic access to Epsilon Program resources.</li>
            <li>Access to online forums and community discussions.</li>
            <li>Subscription to Epsilon Program newsletter.</li>
            <li>Limited access to events (e.g., online webinars).</li>
          </ul>
          <Link to={`/MembershipLayout/${1}`}>
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
              Read More Basic
            </button>
          </Link>
          {auth.userPoints && <p className="text-center mt-4 text-blue-900">Your Points: {auth.userPoints}</p>}
        </div>

        <div className="bg-white bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          {/* Premium Membership */}
          <h3 className="text-xl font-semibold text-center mb-4">Premium Membership</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl font-bold text-indigo-600">$299</h2>
            <span className="text-sm ml-2">per month</span>
          </div>
          <p className="text-lg font-semibold mb-4">Advanced membership</p>
          <ul className="list-disc list-inside mb-4 text-sm text-indigo-800">
            <li>Full access to Epsilon Program resources.</li>
            <li>Discounts on events and merchandise.</li>
            <li>Personalized coaching sessions with Epsilon Program leaders.</li>
            <li>Exclusive access to Epsilon Program's inner circle (e.g., private Facebook group).</li>
          </ul>
          <Link to={`/MembershipLayout/${2}`}>
            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300">
              Read More Premium
            </button>
          </Link>
          {auth.userPoints && <p className="text-center mt-4 text-indigo-900">Your Points: {auth.userPoints}</p>}
        </div>

        <div className="bg-white bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4">
          {/* Elite Membership */}
          <h3 className="text-xl font-semibold text-center mb-4">Elite Membership</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl font-bold text-cyan-500">$499</h2>
            <span className="text-sm ml-2">per month</span>
          </div>
          <p className="text-lg font-semibold mb-4">Elite membership</p>
          <ul className="list-disc list-inside mb-4 text-sm text-cyan-700">
            <li>Subscription to Epsilon Program newsletter.</li>
            <li>Personalized spiritual guidance and mentorship.</li>
            <li>Invitation to an annual retreat at a secluded location.</li>
            <li>VIP access to exclusive events (e.g., private meetings with Epsilon Program leaders).</li>
          </ul>
          <Link to={`/MembershipLayout/${3}`}>
            <button className="w-full py-2 px-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300">
              Read More Elite
            </button>
          </Link>
          {auth.userPoints && <p className="text-center mt-4 text-cyan-900">Your Points: {auth.userPoints}</p>}
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
