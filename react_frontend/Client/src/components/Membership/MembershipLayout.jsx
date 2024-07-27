import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './layout.css'
import axios from 'axios';

const MembershipDetails = ({ title, description, benefits }) => (
  <div>
  <h2 className="text-xl font-bold mb-2">{title}</h2>
  <p className="mb-4">{description}</p>
  <ul className="list-disc pl-5 mb-4">
    {benefits.map((benefit, index) => (
      <li key={index} className="text-gray-300">{benefit}</li>
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
      const response = await fetch(`https://wmc-project-av5d.onrender.com/updateuser/${auth.username}`, {
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
        console.log(auth);
        console.log("data",data);
        setUserData({ ...data.username, membershipStatus: membership_id });
        setAuth({
          ...auth,
          username: data.user.name,
          userPoints: data.user.points,
        });

        localStorage.setItem('auth', JSON.stringify(auth));
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem(auth.username, membership_id); // Store membership status

        toast.success("Membership updated successfully!");
        navigate(`/epsilon_program_membership/${membership_id}`);

      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);

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
      title: 'Epsilon Enthusiast',
      description: `Unlock the door to a world of exclusive Epsilon content with our Basic membership! 
                    As an Epsilon Enthusiast, you’ll gain access to a treasure trove of exclusive tutorials, 
                    insightful webinars, and a wealth of additional resources designed to elevate your experience. 
                    Enjoy special discounts on our premium products and services, and receive priority support 
                    from our dedicated customer care team. This is your first step into a vibrant community of like-minded individuals!`,
      benefits: [
        'Exclusive Content: Access a variety of tutorials, webinars, and articles available only to members.',
        'Discounts: Enjoy exclusive discounts on our products and services.',
        'Priority Support: Receive faster responses and enhanced support from our customer service team.',
        'Community Access: Connect with fellow enthusiasts through exclusive forums and events.'
      ],
      up: 10,
    };
  } else if (membership_id === '2') {
    membershipDetails = {
      title: 'Epsilon Evangelist',
      description: `Elevate your Epsilon journey with the Premium membership! The Epsilon Evangelist tier includes 
                    all the benefits of the Basic membership, with a host of additional perks designed to offer 
                    a more personalized and enriching experience. Enjoy one-on-one coaching from experts, access 
                    to our exclusive content library, and receive priority support tailored to your needs. Immerse 
                    yourself in a world of premium resources and elevate your role within our community.`,
      benefits: [
        'All Basic Benefits: Continue enjoying all the benefits of the Epsilon Enthusiast membership.',
        'Personalized Coaching: Receive expert guidance and coaching tailored to your goals.',
        'Premium Content: Unlock access to an exclusive library of advanced resources and content.',
        'Enhanced Support: Get priority support with personalized attention to your needs.',
        'Special Events: Invitations to premium events and webinars hosted by industry leaders.'
      ],
      up: 20,
    };
  } else if (membership_id === '3') {
    membershipDetails = {
      title: 'Epsilon Visionary',
      description: `Step into the upper echelon of the Epsilon community with our Elite membership! The Epsilon 
                    Visionary tier offers an unparalleled level of access and exclusivity. Enjoy all the benefits 
                    of the Premium membership, plus exclusive invitations to VIP events, personalized consulting, 
                    and a dedicated account manager to ensure your every need is met. This is the ultimate membership 
                    for those who are truly committed to making the most of their Epsilon experience.`,
      benefits: [
        'All Premium Benefits: Enjoy all the perks and privileges of the Epsilon Evangelist membership.',
        'VIP Events: Exclusive invitations to high-profile events and networking opportunities.',
        'Personalized Consulting: Receive tailored consulting services to achieve your personal and professional goals.',
        'Dedicated Account Manager: Get personalized attention and support from a dedicated account manager.',
        'Recognition: Be recognized as a top supporter within the Epsilon community.'
      ],
      up: 30,
    };
  }

  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  return (
    <div id="card_container" className="relative mx-auto max-w-3xl p-4 mt-20">
    {/* <div className="pg">
      <img src="https://th.bing.com/th/id/OIP.y6ZKND2A3XLBHfF8QmkuRgHaHn?rs=1&pid=ImgDetMain" alt="GTA 5 Cris Formage" className="w-full rounded-lg" />
    </div> */}
    <div id="card" className="relative bg-cover bg-center text-white p-6 rounded-lg shadow-lg">
      <div className="shine absolute inset-0"></div>
      <div className="text-block relative z-10">
        {error && (
          <div className="text-red-600 text-center mb-4">
            <p>{error}</p>
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase mb-2">
          Membership Details <small className="text-gray-300 text-sm">(2018)</small>
        </h1>
        <h3 className="text-xl font-bold mb-4">Action | Adventure</h3>
        {/* <p className="mb-4">
          Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.
        </p> */}
        <MembershipDetails {...membershipDetails} />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updatePoints(membershipDetails.up, membership_id)}
            className="bg-transparent border-4 border-white text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Get Membership
          </button>
        </div>
        {auth.userPoints && <p className="mt-4 text-gray-300">Your Points: {auth.userPoints}</p>}
      </div>
    </div>
    <ToastContainer />

  </div>


    )
};

export default MembershipLayout;
