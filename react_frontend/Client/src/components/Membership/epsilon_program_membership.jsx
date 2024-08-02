import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import Swal from 'sweetalert2';

// Component for displaying membership tier information
const MembershipTier = ({ tier, benefits, profileLink, newsLink,whatYouCanDo, message, onCancelMembership }) => {
  const { theme } = useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';

  return (
    <div className={`min-h-screen ${containerBgColor} ${textPrimary} flex-row`}>
      <div className={`text-center mb-2 ${containerBgColor}`}>
        <h1 className={` font-bold`}>Congratulations!</h1>
        <p className={``}>Thank you for choosing Epsilon Program {tier} Membership</p>
      </div>
      <div className={`text-center `}>
                <img
          className="w-120 h-72  object-cover rounded-full border-4 border-gray-300 shadow-lg"
          src="https://i.ytimg.com/vi/4pPNTzlfxsk/maxresdefault.jpg"
          alt="Membership"
        />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 p-4 min-h-screen">
        <div>
        <a href="#" class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h1 class="mb-2 font-bold ">{tier} Membership Benefits</h1>
        <p class="">
        <ul className={`list-disc pl-6 `}>
                  {benefits.map((benefit, index) => (
                    <li key={index} className={`mb-2`}>{benefit}</li>
                  ))}
                </ul>
        </p>
        </a>
        </div>
        <div>
         <a href="#" class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h1 class="mb-2 font-bold ">what you can do ?</h1>
          <p>{whatYouCanDo}</p>  
          </a>
          </div>

          <div>
         <a href="#" class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h1 class="mb-2 font-bold ">News and Updates</h1>
          <p className={`mb-2`}>Stay informed about the latest developments in the {tier} program, including new content, events, and initiatives.</p>
          </a>
          </div>

          <div>
         <a href="#" class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h1 class="mb-2 font-bold ">Your {tier} Profile</h1>
          <p className={`mb-2`}>View your membership details, track your progress, and access exclusive content through your {tier} profile.</p>
          <a href={profileLink} className={`text-highlight hover:text-accent`}>View Profile</a>

          </a>
          </div>



          <div>
         <a href="#" class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h1 class="mb-2 font-bold ">Message from Cris Formage</h1>
          <p className={`mb-2`}>{message}</p>
          </a>
          </div>    
</div>  
<button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg`}
          onClick={onCancelMembership}
        >
          Cancel Membership
        </button>
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
      {auth.username && <h1>Welcome, {auth.username}</h1>}
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
  "1": {
    "tier": "Epsilon Enthusiast",
    "introduction": "Welcome to the Epsilon Enthusiast tier! As an Enthusiast, you are embarking on a journey of enlightenment and discovery.",
    "benefits": [
      "Exclusive Content: Gain access to a library of Epsilon Program materials, including articles, videos, and guides.",
      "Personal Guidance: Receive personalized guidance from our esteemed leader, Cris Formage.",
      "Exclusive Invitations: Attend private events and ceremonies designed for Enthusiasts."
    ],
    "whatYouCanDo": [
      "Engage with content and deepen your understanding of the Epsilon Program.",
      "Participate in events and connect with other Enthusiasts.",
      "Seek guidance from Cris Formage."
    ],
    "profileLink": "#",
    "newsLink": "#",
    "message": "Welcome to the Epsilon Program, Enthusiast! Your journey begins here."
  },
  "2": {
    "tier": "Epsilon Evangelist",
    "introduction": "As an Epsilon Evangelist, you are advancing your journey with deeper insights and enhanced opportunities.",
    "benefits": [
      "Advanced Content: Access to more in-depth and advanced Epsilon Program materials.",
      "Priority Invitations: Receive priority access to exclusive events and ceremonies."
    ],
    "whatYouCanDo": [
      "Explore advanced content that builds on your Enthusiast experience.",
      "Enjoy priority invitations to special events and ceremonies."
    ],
    "profileLink": "#",
    "newsLink": "#",
    "message": "Congratulations on taking the next step, Evangelist! Your dedication is commendable."
  },
  "3": {
    "tier": "Epsilon Visionary",
    "introduction": "Welcome to the Epsilon Visionary tier, where you gain unparalleled access and opportunities within the Epsilon Program.",
    "benefits": [
      "Masterclasses: Participate in exclusive masterclasses led by Cris Formage.",
      "Personalized Mentorship: Receive one-on-one mentorship from our leader, offering deep insights and guidance."
    ],
    "whatYouCanDo": [
      "Attend masterclasses to further your knowledge and practice.",
      "Receive direct mentorship to refine your journey and understanding."
    ],
    "profileLink": "#",
    "newsLink": "#",
    "message": "Welcome to the inner circle, Visionary! Your commitment to the Epsilon Program is extraordinary."
  }
};

export default MembershipLayout;
