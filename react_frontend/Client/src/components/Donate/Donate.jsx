import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../usetheamContext';

function Donate() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const fetchData = async () => {
    if (auth.username) {
      try {
        const response = await fetch(`http://localhost:5000/getalluser/${auth.username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchTotalDonations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/total-donations`);
      const data = await response.json();
      setTotalDonations(data.total);
    } catch (error) {
      console.error('Failed to fetch total donations:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalDonations();
  }, [auth.username]);

  useEffect(() => {
    if (auth.username) {
      setAuth({ ...auth, userPoints: userData.points });
    }
  }, [userData.points]);

  const handleDonate = async (donationAmount) => {
    event.preventDefault();
    if (donationAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/donate/${auth.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: auth.userPoints - donationAmount,
          addPoints: donationAmount,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      } else {
        const data = await response.json();
        setUserData(data.user);
        const newAuth = {
          ...auth,
          username: data.user.name,
          userPoints: data.user.points,
        };
        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate(`/`);
        fetchTotalDonations();
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleButtonClick = (amount) => {
    setAmount(amount);
    setError(null);
  };

  const bgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textColor = theme === 'blue' ? 'text-blue-light' : 'text-gray-100';
  const buttonColor = theme === 'blue' ? 'bg-blue-600 hover:bg-blue-800' : 'bg-green-600 hover:bg-green-800';
  const overlayColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-gray-800';

  return (
    <div className={`relative bg-hero-pattern bg-cover bg-center text-${textColor}`}>
      <div className={`absolute inset-0 ${overlayColor} bg-opacity-50`} />

      <div className="absolute inset-0 z-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <circle cx="800" cy="500" r="600" fill="rgba(255, 165, 0, 0.1)" />
          <circle cx="400" cy="300" r="400" fill="rgba(255, 255, 255, 0.05)" />
        </svg>
      </div>

      <div className="relative z-10 p-6 md:p-12">
        <header className="text-center py-12">
          <motion.h1
            className={`text-5xl font-bold mb-4 ${textColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Support the Epsilon Program
          </motion.h1>
        </header>

        <section className={`max-w-4xl mx-auto my-12 ${bgColor} p-8 rounded-lg shadow-lg relative`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className={`text-3xl font-semibold mb-4 text-center ${textColor}`}>
              Dear {auth.username}!
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <p className={`text-lg mb-6 text-center ${textColor}`}>
              Your donation will help us level up our resources and support our community.<br />
              "Support the Epsilon Program - Your donations help us spread the truth and enlighten more souls."<br />
              Donation Levels:<br />
              • $500: "Seeker of Truth"<br />
              • $2,000: "Beacon of Enlightenment"<br />
              • $10,000: "Ultimate Believer - Guaranteed Enlightenment"
            </p>

            <div className="text-center mb-6">
              <h3 className={`text-2xl font-semibold ${textColor}`}>
                Total Accumulated Donations: ${totalDonations}
              </h3>
            </div>

            <div className="flex flex-wrap justify-center -mx-4 mb-6">
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleButtonClick(50)}
                >
                  $50
                </motion.button>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleButtonClick(100)}
                >
                  $100
                </motion.button>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleButtonClick(500)}
                >
                  $500
                </motion.button>
              </div>
            </div>

            <form className={`max-w-md mx-auto p-4 pt-6 ${bgColor} rounded-lg shadow-md`}>
              <label className="block mb-4">
                <h1 className={`text-lg mb-4 ${textColor}`}>Custom Donation Amount:</h1>
                <input 
                  type="number" 
                  className="w-full p-2 text-sm text-gray-300 border border-gray-600 rounded" 
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  id="donation-amount"
                />
              </label>
              <motion.button
                className={`text-white font-bold py-2 px-4 rounded shadow-md w-full ${buttonColor}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleDonate(amount);
                }}
              >
                Donate Now
              </motion.button>
            </form>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Donate;
