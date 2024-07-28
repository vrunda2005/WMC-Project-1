import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { ReactTyped } from "react-typed";
import { useTheme } from '../../usetheamContext';
import axios from 'axios';
import moment from 'moment';
import './Home.css'; // If you still need custom styles

function Home() {
  const [auth] = useAuth();
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents || []);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/stories')
      .then(response => {
        const sortedStories = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setStories(sortedStories || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const lastFiveStories = stories.slice(0, 5);

  const storyStyles = [
    "bg-yellow-300 rotate-2",
    "bg-pink-200 -rotate-1",
    "bg-blue-200 rotate-1",
    "bg-green-200 -rotate-2",
    "bg-purple-200 rotate-3",
  ];

  const containerClass = `max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center ${theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light'}`;
  const sectionClass = `w-full py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;
  const goalItemClass = `flex items-center mb-2 animate-fadeIn ${theme === 'blue' ? 'bg-blue-highlight' : 'bg-dark-highlight'} rounded-lg shadow-md p-4 md:p-6 lg:p-8`;
  const upcomingEventsClass = `py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;
  const latestStoriesClass = `py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  return (
    <div className={`${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'}`}>
      {/* Five Upcoming Events Section */}
      <div className={upcomingEventsClass}>
        <h2 className="text-black text-3xl font-bold mb-6 p-4 bg-white rounded-lg text-center">Upcoming Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="relative text-black max-w-screen-xl m-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg p-4 w-full min-w-full">
                    <img src={event.image} alt={event.title} className="w-full h-60 object-cover mb-2"/>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p>{moment(event.date).format('DD MMMM YYYY')}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handlePrevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg focus:outline-none">&#8249;</button>
            <button onClick={handleNextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg focus:outline-none">&#8250;</button>
          </div>
        )}
      </div>
      
      <div className={containerClass}>
        <div className='container opacity-80 bg-white'>
          <p className='md:text-5xl sm:text-4xl font-bold md:py-6'>
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

      {/* Last Five Stories Section with Sticky Notes Style */}
      <div className={latestStoriesClass}>
        <h2 className="text-black text-3xl font-bold mb-6 p-4 bg-gray-100 rounded-lg text-center">Latest Stories</h2>
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="relative flex flex-wrap justify-center gap-4 max-w-screen-xl m-auto">
            {lastFiveStories.map((story, index) => (
              <div key={story._id} className={`relative h-auto w-96 p-4 rounded-lg shadow-md text-black ${storyStyles[index % storyStyles.length]} ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:shadow-xl transition-transform transform hover:scale-105`}>
                <h2 className="text-xl font-bold mb-2">{story.username}</h2>
                <p className="text-gray-700 mb-2">{story.story}</p>
                <p className="text-gray-500 text-sm">{new Date(story.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
