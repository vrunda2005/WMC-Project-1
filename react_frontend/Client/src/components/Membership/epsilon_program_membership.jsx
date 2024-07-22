import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../creatContext';
import {useAuth} from '../../creatContext';
import {useNavigate} from 'react-router-dom'


const MembershipTier = ({ tier, benefits, profileLink, newsLink, message, onCancelMembership }) => {
  return (
    <div className="bg-white shadow-md p-4 mb-6">
      <h2 className="text-2xl font-bold mb-2">{tier} Membership Benefits</h2>
      <ul className="list-disc pl-4">
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Your {tier} Profile</h2>
        <p className="mb-2">View your membership details, track your progress, and access exclusive content through your {tier} profile.</p>
        <a href={profileLink} className="text-blue-600 hover:text-blue-900">View Profile</a>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">{tier} News and Updates</h2>
        <p className="mb-2">Stay informed about the latest developments in the {tier} program, including new content, events, and initiatives.</p>
        <ul className="list-none pl-0">
          <li>
            <a href={newsLink} className="text-blue-600 hover:text-blue-900">
              <i className="fas fa-newspaper mr-2" />
              {tier} Newsletter
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Message from Cris Formage</h2>
        <p className="mb-2">{message}</p>
      </div>

      <div className="mt-4">
        <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={onCancelMembership}
        >
          Cancel Membership
        </button>
      </div>
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

const MembershipLayout = () => {
  const { membership_id } = useParams();
  const membershipTier = membershipTiers[membership_id];
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [ auth ] = useAuth();
  const navigate=useNavigate();

  if (!membershipTier) {
    return <div>Invalid membership ID</div>;
  }

  const handleCancelMembership = () => {
    // Add logic to cancel membership here
    localStorage.removeItem(auth.username); // remove membership status
    console.log('Membership cancelled!');
    setCancellationMessage('Your membership has been cancelled.');
    navigate('/');
  };

  return (
    <div>
      {auth.username}
      {cancellationMessage ? (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          {cancellationMessage}
        </div>
      ) : (
        <MembershipTier {...membershipTier} onCancelMembership={handleCancelMembership} />
      )}
    </div>
  );
};

export default MembershipLayout;
