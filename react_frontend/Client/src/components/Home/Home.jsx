import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../creatContext';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import Layout from '../layout';

function Home() {
  const [userData, setUserData] = useState({});
  const [auth, setAuth] = useAuth();
  
const fetchData = async () => {
  if (auth.username) {
    try {
      const response = await fetch(`http://localhost:5000/getalluser/${auth.username}`);
      const data = await response.json();
      setUserData(data);
      setAuth(data);
    } catch (error) {
      console.error(error);
    }
  }
};
useEffect(() => {
  fetchData();
}, [auth.username]);

const updatePoints = async () => {
  try {
    const response = await fetch(`http://localhost:5000/updateuser/${auth.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points: userData.points + 10 }),
    });
    const data = await response.json();
    console.log(data.user.points);
    console.log(data);
    setUserData(data.user);
    setAuth({
      ...auth,
      username:data.user.username,
      userPoints:data.user.points,
    });
    localStorage.setItem('auth', JSON.stringify(auth));
    localStorage.setItem('userData', JSON.stringify(data.user)); 
    console.log(`Admin points: ${data.admin}`); 
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedUserData = localStorage.getItem('userData');
    if (storedAuth && storedUserData) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        const parsedUserData = JSON.parse(storedUserData);
        setAuth(parsedAuth);
        setUserData(parsedUserData);
        console.log('Auth state updated from localStorage:', parsedAuth);
        console.log('User data updated from localStorage:', parsedUserData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }, []);

  return (
    <>
   hiii  {auth.username}
   {/* <div>
    {products && products ?.map((item,index)=>(
        <ul key={index}>
          <span>{item.username}</span>
          <span>{item.points}</span>
        </ul>
      ))
    }
   </div> */}

    {/* <h3>{auth?.user?.name}</h3>  */}
    <h3>{auth.username}</h3>
    {/* <h3>{auth.user.email}</h3> */}
     <Layout title={"Best offers "}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>


<div>
      {userData && (
        <ul>
          <span>{userData.username}</span>
          <span>{userData.points}</span>
        </ul>
      )}
      <button onClick={updatePoints}>Update Points</button>
    </div>

    </>
    // <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 border border-orange-400 h-fit">
    //   <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    //     <div className="flex flex-wrap justify-center  mt-30 mb-4">
    //       <img
    //         src="https://upload.wikimedia.org/wikipedia/commons/4/47/Epsilon_Program_Logo.png"
    //         alt="Epsilon Programme Logo"
    //         className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full"
    //       />
    //     </div>
       
    //     <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
    //       Welcome to the Epsilon Programme 
    //     </h1>
    //     <p className="text-lg md:text-xl lg:text-2xl text-gray-200">
    //       Join our community of like-minded individuals seeking spiritual enlightenment and self-improvement.
    //     </p>
    //     <button
    //       className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    //       onClick={() => console.log('Get Started')}
    //     >
    //       Get Started
    //     </button>
    //   </div>
    //   <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 ">
    //     <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
    //       What We Do
    //     </h2>
    //     <p className="text-lg md:text-xl lg:text-2xl text-gray-200">
    //       At the Epsilon Programme, we believe that personal growth and spiritual development are key to unlocking human potential. Our programme offers a range of activities and resources designed to help you cultivate mindfulness, self-awareness, and emotional intelligence.
    //     </p>
    //     <ul className="list-none mb-4">
    //       <li className="flex items-center mb-2">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           className="w-6 h-6 text-green-600"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M9 12l2 2 4-4m5-3l2 2 4-4M2 12l2 2 4-4"
    //           />
    //         </svg>
    //         <span className="text-lg md:text-xl lg:text-2xl text-gray-200">
    //           Guided meditation and mindfulness exercises
    //         </span>
    //       </li>
    //       <li className="flex items-center mb-2">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           className="w-6 h-6 text-green-600"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M9 12l2 2 4-4m5-3l2 2 4-4M2 12l2 2 4-4"
    //           />
    //         </svg>
    //         <span className="text-lg md:text-xl lg:text-2xl text-gray-200">
    //           Workshops and seminars on personal growth and development
    //         </span>
    //       </li>
    //       <li className="flex items-center mb-2">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           className="w-6 h-6 text-green-600"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M9 12l2 2 4-4m5-3l2 2 4-4M2 12l2 2 4-4"
    //           />
    //         </svg>
    //         <span className="text-lg md:text-xl lg:text-2xl text-gray-200">
    //           One-on-one coaching and mentoring
    //         </span>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}

export default Home;