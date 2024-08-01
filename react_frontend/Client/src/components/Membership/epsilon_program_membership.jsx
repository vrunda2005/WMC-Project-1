import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import Swal from 'sweetalert2';

// Component for displaying membership tier information
const MembershipTier = ({ tier, benefits, profileLink, newsLink, message, onCancelMembership }) => {
  const { theme } = useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';

  return (
    <div className={`min-h-screen ${containerBgColor} ${textPrimary} `}>
      <div className={`text-center mb-2 ${containerBgColor}`}>
        <h1 className={`text-4xl font-bold`}>Congratulations!</h1>
        <p className={`text-2xl`}>On choosing Epsilon Program {tier} Membership</p>
      </div>

      <section className={` ${containerBgColor} ${textPrimary}`}>
        <h2 className={`text-3xl font-bold text-center`}>{tier} Membership Benefits</h2>
        <ul className={`list-disc pl-6 `}>
          {benefits.map((benefit, index) => (
            <li key={index} className={`mb-2`}>{benefit}</li>
          ))}
        </ul>
        <div className={`text-center `}>
          <img className={` mx-auto rounded-full`} src="https://i.ytimg.com/vi/4pPNTzlfxsk/maxresdefault.jpg" alt="Membership" />
        </div>
      </section>

      <section className={` ${containerBgColor} ${textPrimary}`}>
        <h2 className={`text-3xl font-bold mb-2 text-center`}>News and Updates</h2>
        <p className={`mb-2`}>Stay informed about the latest developments in the {tier} program, including new content, events, and initiatives.</p>
        <a href={newsLink} className={`text-highlight hover:text-accent`}>
          <i className={`fas fa-newspaper mr-2`} />
          {tier} Newsletter
        </a>
      </section>

      <section className={`${containerBgColor} ${textPrimary}`}>
        <h2 className={`text-3xl font-bold  text-center`}>Your {tier} Profile</h2>
        <p className={`mb-2`}>View your membership details, track your progress, and access exclusive content through your {tier} profile.</p>
        <a href={profileLink} className={`text-highlight hover:text-accent`}>View Profile</a>
      </section>

      <section className={`mb-2 ${containerBgColor} ${textPrimary}`}>
        <h2 className={`text-3xl font-bold mb-4 text-center`}>Message from Cris Formage</h2>
        <p className={`mb-2`}>{message}</p>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg`}
          onClick={onCancelMembership}
        >
          Cancel Membership
        </button>
      </section>

      <svg className={`${containerBgColor}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M0 0 L50 100 L100 0 Z" />
      </svg>
    </div>
  );
};

// MembershipLayout component that uses MembershipTier and handles membership state
const MembershipLayout = () => {
  const { membership_id } = useParams();
  const membershipTier = membershipTiers[membership_id];
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  if (!membershipTier) {
    return <div>Invalid membership ID</div>;
  }

  const handleCancelMembership = async () => {
    try {
      const response = await fetch('http://localhost:5000/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: auth.username }),
      });

      if (response.ok) {
        const updatedAuth = { ...auth, membership_id: null };
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
        setCancellationMessage('Your membership has been cancelled.');

        await Swal.fire({
          title: 'Success!',
          text: 'Your membership has been cancelled.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate('/');
        
      } else {
        setCancellationMessage('Failed to cancel membership. Please try again later.');
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to cancel membership. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error cancelling membership:', error);
      setCancellationMessage('Failed to cancel membership. Please try again later.');
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to cancel membership. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const { theme } = useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const overlay = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay'; 

  return (
    <div className={`min-h-screen ${containerBgColor} ${textPrimary} page-background opacity-75 ${overlay} p-10`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Epsilon Program Membership</h1>
      {auth.username && <p className="text-center mb-8">Welcome, {auth.username}</p>}
      {cancellationMessage ? (
        <div className="bg-red-100 text-red-700 p-6 mb-10 rounded-lg">
          {cancellationMessage}
        </div>
      ) : (
        <MembershipTier {...membershipTier} onCancelMembership={handleCancelMembership} />
      )}

      <section className={`col ${containerBgColor} ${textPrimary} gap-4`}>
        <div className={`flex flex-col text-4xl`}>
          About the Epsilon Program
          <p className={`mb-6 text-white text-2xl m-7`}>
            The Epsilon Program is a fictional religious cult in the Grand Theft Auto series. Founded by Cris Formage, the program is known for its mysterious teachings, often revolving around the number 157, extraterrestrial life, and unconventional spiritual practices. As a member, you will explore the deepest truths of the universe and connect with like-minded individuals.
          </p>
        </div>
        <div className={`column`}>
          <p className={`mb-6 text-white text-2xl m-7`}>
            Members are encouraged to embrace the Epsilon teachings and participate in various activities to deepen their understanding. Your membership grants you access to exclusive content, personalized guidance, and a supportive community dedicated to exploring the unknown.
          </p>
        </div>
      </section>
    </div>
  );
};

const membershipTiers = {
  1: {
    tier: 'Epsilon Enthusiast',
    benefits: [
      'Access to exclusive Epsilon Program content',
      'Personalized guidance from Cris Formage',
      'Invitations to exclusive events and ceremonies',
    ],
    profileLink: '#',
    newsLink: '#',
    message: 'Welcome to the Epsilon Program, Enthusiast!',
  },
  2: {
    tier: 'Epsilon Evangelist',
    benefits: [
      'All Epsilon Enthusiast benefits',
      'Access to advanced Epsilon Program content',
      'Priority invitations to exclusive events and ceremonies',
    ],
    profileLink: '#',
    newsLink: '#',
    message: 'Congratulations on taking the next step, Evangelist!',
  },
  3: {
    tier: 'Epsilon Visionary',
    benefits: [
      'All Epsilon Evangelist benefits',
      'Access to exclusive Epsilon Program masterclasses',
      'Personalized mentorship from Cris Formage',
    ],
    profileLink: '#',
    newsLink: '#',
    message: 'Welcome to the inner circle, Visionary!',
  },
};

export default MembershipLayout;
