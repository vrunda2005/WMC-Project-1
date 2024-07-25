import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';

const MembershipDetails = ({ title, description, benefits }) => (
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-3 text-blue-900">{title}</h2>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="list-disc list-inside mb-4 text-gray-800">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center mb-2">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const MembershipLayout = () => {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const updatePoints = async (pointsToUpdate, membership_id) => {
    try {
      const response = await fetch(`https://wmc-project-api.vercel.app/updateuser/${auth.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: userData.userPoints,
          addPoints: pointsToUpdate,
          membership_id: membership_id,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      } else {
        const data = await response.json();
        setUserData({ ...data.user, membershipStatus: membership_id });
        setAuth({
          ...auth,
          username: data.user.name,
          userPoints: data.user.points,
        });

        localStorage.setItem('auth', JSON.stringify(auth));
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem(auth.username, membership_id); // Store membership status

        navigate(`/epsilon_program_membership/${membership_id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const { membership_id } = useParams();

  let membershipDetails = {
    title: 'Invalid Membership ID',
    description: 'Sorry, we couldn’t find a membership with that ID. Please check your membership ID and try again.',
    benefits: [],
  };

  if (membership_id === '1') {
    membershipDetails = {
      title: 'Basic Membership',
      description: 'On choosing our Basic membership! With this membership, you’ll get access to exclusive content including tutorials, webinars, and more. You’ll also receive discounts on our products and services.',
      benefits: [
        'Access to exclusive content',
        'Discounts on products and services',
        'Priority customer support',
      ],
      up: 10,
    };
  } else if (membership_id === '2') {
    membershipDetails = {
      title: 'Premium Membership',
      description: 'As a Premium member, you’ll receive all the benefits of our Basic membership, plus additional perks like personalized coaching, priority customer support, and access to our premium content library.',
      benefits: [
        'All Basic membership benefits',
        'Personalized coaching',
        'Priority customer support',
        'Access to premium content library',
      ],
      up: 20,
    };
  } else if (membership_id === '3') {
    membershipDetails = {
      title: 'Elite Membership',
      description: 'As an Elite member, you’ll enjoy all the benefits of our Premium membership, plus exclusive access to VIP events, personalized consulting, and a dedicated account manager.',
      benefits: [
        'All Premium membership benefits',
        'Exclusive access to VIP events',
        'Personalized consulting',
        'Dedicated account manager',
      ],
      up: 30,
    };
  }

  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  return (
    <div className={`container mx-auto p-6 lg:p-8 ${containerBgColor}`}>
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Membership Details</h1>
      {error && (
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
        </div>
      )}
      <MembershipDetails {...membershipDetails} />
      <div className="text-center mt-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => updatePoints(membershipDetails.up, membership_id)}
        >
          Get Membership
        </button>
        {auth.userPoints && <p className="mt-4 text-gray-700">Your Points: {auth.userPoints}</p>}
      </div>
    </div>
  );
};

export default MembershipLayout;
