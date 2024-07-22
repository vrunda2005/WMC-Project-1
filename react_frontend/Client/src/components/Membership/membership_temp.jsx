import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../creatContext';
import {useNavigate,Link} from 'react-router-dom';

function MembershipPage() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useAuth();
  const navigate=useNavigate();


  // const fetchData = async () => {
  //   if (auth.username) {
  //     try {
  //       const response = await fetch(`http://localhost:5000/getalluser/${auth.username}`);
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [auth.username]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  // useEffect(() => {
  //   if (auth.username) {
  //     setAuth({ ...auth, userPoints: userData.points });
  //   }
  // }, [userData.points,auth]);

  
  // const updatePoints = async (pointsToUpdate,membership_id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/updateuser/${auth.username}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ points: userData.points + pointsToUpdate ,
  //                               addPoints : pointsToUpdate,
  //                               membership_id:membership_id,

  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     // console.log(data.user);
  //     setUserData(data.user);
  //     const newAuth = {...auth,
  //       username: data.user.name,
  //       userPoints: data.user.points,
  //     };
  //     setAuth(newAuth);
  //     localStorage.setItem('auth', JSON.stringify(newAuth));
  //     localStorage.setItem('userData', JSON.stringify(data.user));
  //     console.log("updated auth ");
  //     console.log(`Admin points: ${data.admin}`); 
  //     navigate(`/MembershipLayout/${membership_id}`);
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const storedAuth = localStorage.getItem('auth');
  //   const storedUserData = localStorage.getItem('userData');
  //   if (storedAuth && storedUserData) {
  //     try {
  //       const parsedAuth = JSON.parse(storedAuth);
  //       const parsedUserData = JSON.parse(storedUserData);
  //       setAuth(parsedAuth);
  //       setUserData(parsedUserData);
  //       // console.log('Auth state updated from localStorage:', parsedAuth);
  //       // console.log('User data updated from localStorage:', parsedUserData);
  //     } catch (error) {
  //       console.error('Error parsing auth state from localStorage:', error);
  //     }
  //   }
  // }, []);



  return (
    <div className="container mx-auto h-[650px] p-4 md:p-8 lg:p-7">
    <div className="text-center flex flex-col gap-5 mb-10">
      <h1 className="text-blue-950 text-4xl font-bold mb-2">Join the Epsilon Program</h1>
      <h1 className="text-blue-950 text-4xl font-bold mb-2">Welcome, {auth.username ? auth.username : 'Guest hi '}</h1>
      <h3 className="text-blue-900 text-xl font-medium">
        Choose your membership level and start your journey to happiness and freedom from thoughts!
      </h3>
    </div>

    <div className="flex flex-wrap justify-center gap-10 mb-10">
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 lg:p-8 shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 hover:cursor-pointer transition duration-550 ease-in-out rounded-[35px]">
        {/* Basic Membership */}
        <h3 className="text-md font-medium text-center -mt-3 mb-3">Basic Membership</h3>
        <div className="flex">
          <h2 className="ml-16 text-blue-600 text-5xl font-bold text-center mb-8">$149</h2>
          <h5 className="relative ml-2 mt-6 text-sm">per month</h5>
        </div>
        <h4 className="text-lg font-bold mb-4">Entry-level membership</h4>
        <ul className="list-none text-sm mb-4 gap-3 flex flex-col">
          <li>Basic access to Epsilon Program resources.</li>
          <li>Access to online forums and community discussions.</li>
          <li>Subscription to Epsilon Program newsletter.</li>
          <li>Limited access to events (e.g., online webinars)</li>
        </ul>
        {/* <button className="bg-orange-400" onClick={() => updatePoints(10,1)}>Get Basic</button> */}
        <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            <Link to={`/MembershipLayout/${1}`}>Read More Basic</Link>
          </button>
        {auth.userPoints}
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 lg:p-8 shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-105 hover:cursor-pointer transition duration-550 ease-in-out rounded-[35px]">
        {/* Premium Membership */}
        <h3 className="text-md font-medium text-center -mt-3 mb-3">Premium Membership</h3>
        <div className="flex">
          <h2 className="ml-16 text-indigo-600 text-5xl font-bold text-center mb-8">$299</h2>
          <h5 className="relative ml-2 mt-6 text-sm">per month</h5>
        </div>
        <h4 className="text-lg font-bold mb-4">Advanced membership</h4>
        <ul className="list-none text-sm mb-4 gap-3 flex flex-col">
          <li>Full access to Epsilon Program resources.</li>
          <li>Discounts on events and merchandise.</li>
          <li>Personalized coaching sessions with Epsilon Program leaders.</li>
          <li>Exclusive access to Epsilon Program's inner circle (e.g., private Facebook group)</li>
        </ul>
        {/* <button className="bg-orange-400" onClick={() => updatePoints(20,2)}>Premium Membership</button> */}
        <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            <Link to={`/MembershipLayout/${2}`}>Read More </Link>
          </button>
        {auth.userPoints}
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 lg:p-8 shadow-lg shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 hover:cursor-pointer transition duration-550 ease-in-out rounded-[35px]">
        {/* Elite Membership */}
        <h3 className="text-md font-medium text-center -mt-3 mb-3">Elite Membership</h3>
        <div className="flex">
          <h2 className="ml-16 text-cyan-500 text-5xl font-bold text-center mb-8">$499</h2>
          <h5 className="relative ml-2 mt-6 text-sm">per month</h5>
        </div>
        <h4 className="text-lg font-bold mb-4">Elite membership</h4>
        <ul className="list-none text-sm mb-4 gap-3 flex flex-col">
          <li>Subscription to Epsilon Program newsletter.</li>
          <li>Personalized spiritual guidance and mentorship</li>
          <li>Invitation to an annual retreat at a secluded location.</li>
          <li>VIP access to exclusive events (e.g., private meetings with Epsilon Program leaders).</li>
        </ul>
        {/* <button className="bg-orange-400" onClick={() => updatePoints(30,3)}>Elite Membership</button> */}
        <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            <Link to={`/MembershipLayout/${3}`}>Read More </Link>
          </button>
        {auth.userPoints}
      </div>
    </div>
  </div>
);
}

export default MembershipPage;