import React, { useState ,useEffect} from 'react'
import { useAuth } from '../../creatContext';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'



function Donate() {
  const [auth,setAuth]=useAuth();
  const [userData, setUserData] = useState({});
  const navigate=useNavigate();
  const [error, setError] = useState(null);


  const [amount ,setAmount]=useState(0);

  // console.log("here is donation ",auth);

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

  useEffect(() => {
    fetchData();
  }, [auth.username]);

  
  useEffect(() => {
    if (auth.username) {
      setAuth({ ...auth, userPoints: userData.points });
    }
  }, [userData.points]);



  const handleDonate = async()=>{
    event.preventDefault();
          try {
            console.log(`amount ${amount}`);
      const response = await fetch(`http://localhost:5000/donate/${auth.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: auth.userPoints - amount ,
                                addPoints : amount,

        }),
      });
      if(!response.ok){
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }else{
      const data = await response.json();
      // console.log(data);
      // console.log(data.user);
      setUserData(data.user);
      const newAuth = {...auth,
        username: data.user.name,
        userPoints: data.user.points,
      };
      setAuth(newAuth);
    
      localStorage.setItem('auth', JSON.stringify(newAuth));
      localStorage.setItem('userData', JSON.stringify(data.user));
      // console.log("updated auth ");
      // console.log(`Admin points: ${data.admin}`); 
      navigate(`/`);
    }
      
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }



  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
        >
          <circle cx="800" cy="500" r="600" fill="rgba(255, 165, 0, 0.1)" />
          <circle cx="400" cy="300" r="400" fill="rgba(255, 255, 255, 0.05)" />
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-12">
        {/* Header Section */}
        <header className="text-center py-12">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Support the Epsilon Program
          </motion.h1>
        </header>

        {/* Donation Info */}
        <section className="max-w-4xl mx-auto my-12 bg-gray-800 p-8 rounded-lg shadow-lg relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-center">Dear {auth.username}!</h2>
            {error && (
              <div className='text-red-600 text-center mb-4'>
                <p>{error}</p>
              </div>
            )}
            <p className="text-lg mb-6 text-green-400 text-center">
              Your donation will help us level up our resources and support our community.<br />
              "Support the Epsilon Program - Your donations help us spread the truth and enlighten more souls."<br />
              Donation Levels:<br />
              • $500: "Seeker of Truth"<br />
              • $2,000: "Beacon of Enlightenment"<br />
              • $10,000: "Ultimate Believer - Guaranteed Enlightenment"
            </p>

            <div className="flex flex-wrap justify-center -mx-4 mb-6">
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDonate(500)}
                >
                  $500
                </motion.button>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDonate(2000)}
                >
                  $2000
                </motion.button>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <motion.button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDonate(10000)}
                >
                  $10000
                </motion.button>
              </div>
            </div>

            <form className="max-w-md mx-auto p-4 pt-6 bg-gray-800 rounded-lg shadow-md">
              <label className="block mb-4">
                <span className="text-lg text-gray-400">Custom Donation Amount:</span>
                <input 
                  type="number" 
                  className="w-full p-2 text-sm text-gray-300 border border-gray-600 rounded" 
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  id="donation-amount"
                />
              </label>
              <motion.button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md w-full"
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
};

export default Donate;