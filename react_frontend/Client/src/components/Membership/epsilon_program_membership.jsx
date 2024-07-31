import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import Swal from 'sweetalert2';

const MembershipTier = ({ tier, benefits, profileLink, newsLink, message, onCancelMembership }) => {
  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  
  return (
    <div className={`min-h-screen ${containerBgColor} ${textPrimary} p-10`}>
          <div class="codrops-top clearfix">
          <h1 className="text-4xl font-bold mb-8 text-center">HI Congratulations</h1>

              <span class="righ text-2xl">On choosing Epsilon Program Membership</span>
              
          </div>

          <section class=" col-2 ">
          <h1 className="text-4xl font-bold mb-8 text-center">{tier} Membership Benefits</h1>

              <div class="column text">
              {/* <h1 className="text-4xl font-bold mb-8 text-center">Epsilon Program Membership</h1> */}
              <ul className="list-disc pl-6 text-muted mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="mb-2">{benefit}</li>
              ))}
            </ul>
              </div>
              <div class="column">
                <img className='w-[300px] h-[300px] mx-auto my-4 rounded-full animate-pulse' src="https://i.ytimg.com/vi/4pPNTzlfxsk/maxresdefault.jpg" alt="img" />
              </div>
          </section>
    
        <section class="color">
        <h1 className="text-4xl font-bold mb-8 text-center">News and Updates</h1>
        <p className="mb-6">Stay informed about the latest developments in the {tier} program, including new content, events, and initiatives.</p>

          
        </section>

  <section class="col-3">
 
    <ul className="list-none pl-0 mb-6">
          <li>
            <a href={newsLink} className="text-highlight hover:text-accent">
              <i className="fas fa-newspaper mr-2" />
              {tier} Newsletter
            </a>
          </li>
        </ul>
        <h1 className="text-4xl font-bold mb-8 text-center">Your {tier} Profile</h1>
        <p className='text-white'>View your membership details, track your progress, and access exclusive content through your {tier} profile.</p>
        <a href={profileLink} className="text-highlight hover:text-accent">View Profile</a>


  </section>


  <section class="col-2 ss-style-halfcircle">
    <div class="column">
    Message from Cris Formage
    </div>
    <div class="column text">
    {message}
    </div>
    <button
          className={`bg-blue-text-dark hover:bg-red-500 ${textPrimary}  font-bold py-2 px-4 rounded-lg transition-all`}
          onClick={onCancelMembership}
        >
          Cancel Membership
        </button>
  </section>

  <svg id="bigTriangleColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M0 0 L50 100 L100 0 Z" />
      </svg>
  
      
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
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    console.log('Loaded Auth from Local Storage:', storedAuth);
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
        console.log('Updating Auth to Null:', updatedAuth);
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

  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';

  return (
    <div className={`min-h-screen ${containerBgColor} ${textPrimary} p-10`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Epsilon Program Membership</h1>
      {auth.username && <p className="text-center mb-8">Welcome, {auth.username}</p>}
      {cancellationMessage ? (
        <div className="bg-red-100 text-red-700 p-6 mb-10 rounded-lg">
          {cancellationMessage}
        </div>
      ) : (
        <MembershipTier {...membershipTier} onCancelMembership={handleCancelMembership} />
      )}
    
<section class="col  text-white gap-4 ">
  <div class="flex flex-col text-4xl ">
  About the Epsilon Program
  <p className="mb-6 text-white text-2xl m-7">
        The Epsilon Program is a fictional religious cult in the Grand Theft Auto series. Founded by Cris Formage, the program is known for its mysterious teachings, often revolving around the number 157, extraterrestrial life, and unconventional spiritual practices. As a member, you will explore the deepest truths of the universe and connect with like-minded individuals.
      </p>
  </div>
  <div class="column ">
  <p className="mb-6 text-white text-2xl m-7">
        Members are encouraged to donate generously, attend exclusive events, and participate in various rituals to advance their spiritual enlightenment. The program promises profound personal growth, eternal salvation, and a deeper understanding of the cosmos.
      </p>
      <p className="mb-6 text-white text-2xl m-7">
      As you progress through the membership tiers, you'll gain access to more exclusive content, personalized guidance from Cris Formage, and invitations to high-level ceremonies. Embrace the path to enlightenment and join the ranks of the enlightened today!
      </p>

  </div>
</section>
<svg id="bigHalfCircle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0 100 C40 0 60 0 100 100 Z"/>
    </svg>
{/* <section class="col-2 color">
  <div class="column text">

  </div>
  <div class="column">

  </div>
</section> */}
      
    </div>
  );
};

export default MembershipLayout;
