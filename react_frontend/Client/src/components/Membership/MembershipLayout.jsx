import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../creatContext';
import { useState ,useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
const MembershipDetails = ({ title, description, benefits,up }) => {

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="list-none mb-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MembershipLayout = () => {
  // UPDATESTION CODE 
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState({});
  const navigate=useNavigate();


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

  
  const updatePoints = async (pointsToUpdate,membership_id) => {
    try {
      const response = await fetch(`http://localhost:5000/updateuser/${auth.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: userData.points + pointsToUpdate ,
                                addPoints : pointsToUpdate,
                                membership_id:membership_id,

        }),
      });
      const data = await response.json();
      // console.log(data);
      // console.log(data.user);
      setUserData(data.user);
      setAuth({
        ...auth,
        username:data.user.name,
        userPoints:data.user.points,
      });  
      localStorage.setItem('auth', JSON.stringify(auth));
      localStorage.setItem('userData', JSON.stringify(data.user)); 
      // console.log("updated auth ");
      // console.log(`Admin points: ${data.admin}`); 
      navigate(`/MembershipLayout/${membership_id}`);
      
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
        // console.log('Auth state updated from localStorage:', parsedAuth);
        // console.log('User data updated from localStorage:', parsedUserData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }, []);



  ///MY CODE 
  const { membership_id } = useParams();
  // console.log(membership_id);

  let membershipDetails;
  if (membership_id === '1') {
    membershipDetails = {
      title: 'Basic Membership',
      description: 'Congratulations on choosing our Basic membership! With this membership, you\'ll get access to our exclusive content, including tutorials, webinars, and more. You\'ll also get discounts on our products and services.',
      benefits: [
        'Access to exclusive content',
        'Discounts on products and services',
        'Priority customer support',
      ],
      up:10,
    };
  } else if (membership_id === '2') {
    membershipDetails = {
      title: 'Premium Membership',
      description: 'Welcome to our Premium membership! As a Premium member, you\'ll get all the benefits of our Basic membership, plus additional perks like personalized coaching, priority customer support, and access to our premium content library.',
      benefits: [
        'All Basic membership benefits',
        'Personalized coaching',
        'Priority customer support',
        'Access to premium content library',
      ],
      up:20,
    };
  } else if (membership_id === '3') {
    membershipDetails = {
      title: 'Elite Membership',
      description: 'You\'re part of our Elite membership! As an Elite member, you\'ll get all the benefits of our Premium membership, plus exclusive access to our VIP events, personalized consulting, and a dedicated account manager.',
      benefits: [
        'All Premium membership benefits',
        'Exclusive access to VIP events',
        'Personalized consulting',
        'Dedicated account manager',
      ],
      up:30,
    };
  } else {
    membershipDetails = {
      title: 'Invalid Membership ID',
      description: 'Sorry, we couldn\'t find a membership with that ID. Please check your membership ID and try again.',
      benefits: [],
    };
  }

  return (
    <div className='container p-5 justify-center items-center '>
      <h1 className='text-center  text-4xl font-bold mb-2 text-zinc-600'>MembershipLayout</h1>
      <MembershipDetails {...membershipDetails} />
      <button>Membership_ID  :  {membership_id}</button>
      <button className="flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" onClick={() => updatePoints(membershipDetails.up,membership_id)}>GETTT Membership</button>
      {auth.userPoints}
      
    </div>
  );
};

export default MembershipLayout;