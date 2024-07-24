import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../creatContext';
import { ReactTyped } from "react-typed";
import { useTheme } from '../../usetheamContext';

function Home() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useAuth();
  const { theme } = useTheme();

  
  const goals = [
    "We are making an assault on happiness.",
    "We will be generous, in ways that are upwards and ways that are manifest.",
    "We will live by the proven scientific truth of the metaphors.",
    "We will fight superstition, limited thinking and dogma wherever we find it.",
    "We will be clear thinking, independent minded and do exactly what we are told.",     
    "We will practice science by not doubting.",
    "We will display infinite power by closing out those with doubt with our life choices.",
    "We will practice kindness and mercy by a relentless assault on insavables, always reminding them of what awaits.",
    "We will be everywhere, all at once, but also right here, right now.",
    "We will invest in a structured study program, because we know that knowledge is not free.",
    "We will be open minded to new experiences apart from those that are wrong, insavable, or against teachings.",
    "We will promote epsilonism in everything we do, while we await both the writing of the tract and the ending of the 9th paradigm.",
  ];


  // Apply theme classes
  const containerClass = `max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center ${theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light'}`;
  const sectionClass = `w-full py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;
  const goalItemClass = `flex items-center mb-2 animate-fadeIn ${theme === 'blue' ? 'bg-blue-highlight' : 'bg-dark-highlight'} rounded-lg shadow-md p-4 md:p-6 lg:p-8`;

  return (
    <div className={`${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'}`}>
      <div className={containerClass}>
        <div className='container opacity-80 bg-white'>
          <p className='md:text-5xl sm:text-4xl font-bold md:py-6'>
            Hi user: {auth.username}<br/>
            Membership ID: {auth.membership_id}<br/>
            Your points: {auth.userPoints}<br/>
            Now here we implement our home page!!!
          </p>
          <ReactTyped
            className='md:text-3xl sm:text-4xl font-bold md:py-6'
            strings={['THIS IS OUR EPSILON PROGRAM WEBSITE ']}
            typeSpeed={120}
            backSpeed={130}
            loop
          />
        </div>
      </div>

      <div className={sectionClass}>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 opacity-85 backdrop-blur-sm rounded-lg shadow-lg'>
          <img className='w-[300px] h-[300px] mx-auto my-4 rounded-full animate-pulse' src="https://orcz.com/images/a/a8/Gtavepsilonprogram.jpg" alt="IMAGE" />
          <div className='flex flex-col justify-center p-4'>
            <h1 className='font-bold md:text-4xl sm:text-3xl text-2xl'>OUR GURU</h1>
            <h1 className='font-bold md:text-3xl sm:text-2xl text-xl'>Cris Formage: The Enigmatic Leader of the Epsilon Program</h1>
            <p className='text-lg leading-relaxed'>
              Cris Formage is a fictional character in the Grand Theft Auto series, specifically in Grand Theft Auto: San Andreas. He is the charismatic and mysterious leader of the Epsilon Program, a cult-like organization that claims to offer spiritual enlightenment and self-improvement to its members.
            </p>
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 opacity-85 backdrop-blur-sm rounded-lg shadow-lg'>
          <img className='w-[300px] h-[300px] mx-auto my-4 rounded-full animate-pulse' src="https://orcz.com/images/a/a8/Gtavepsilonprogram.jpg" alt="IMAGE" />
          <div className='flex flex-col justify-center p-4'>
            <h1 className='font-bold md:text-4xl sm:text-3xl text-2xl'>THE EPSILONIST PLEDGE</h1>
            <p className='text-lg leading-relaxed'>
              All good things come from Kraff, that is the fact on which Epsilonism is built.
              Epsilonism is a science as well as a Religion - in fact, we are the only religion that is also a science and which is concerned with seeking the truth.
              As real truth seekers, we are willing to pay to make the search go better. In this way we are investing in our future.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-secondary-bg p-8 gap-8 md:p-12 lg:p-16">
        <h1 className="text-3xl font-bold text-center mb-4 md:text-4xl lg:text-5xl">Epsilonism Goals</h1>
        <ul className="list-none mb-4">
          {goals.map((goal, index) => (
            <li key={index} className={goalItemClass}>
              <span className="text-lg font-bold">{`${index + 1}. `}</span>
              <span className="text-lg">{goal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;