import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { ReactTyped } from "react-typed";
import { useTheme } from '../../usetheamContext';
import axios from 'axios';
import moment from 'moment';
import './Home.css'

<<<<<<< HEAD
const PageOne = () => {
  return (
    <>
     
        <video className="background-video" src={vid} alt="Video" autoPlay loop muted />
        <div className="parallax-wrapper">
          <ReactTyped
            className='md:text-3xl sm:text-4xl font-bold p-20 md:py-6 w-auto h-auto flex text-zinc-900 border-2 rounded-lg border-zinc-800 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]'
            strings={[
              "Welcome to the Epsilon Program!",
              "Discover cosmic truths and transcend the ordinary.",
              "Join our journey to spiritual enlightenment.",
              "Explore our beliefs and embrace inner peace.",
              "Become a member today and start your transformation!"
            ]}
            typeSpeed={80}
            backSpeed={10}
            loop
          />
        </div>
      
    </>
  );
};




const PageTwo = ({ stories }) => {
  const{theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-secondary-bg' : 'bg-dark-secondary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';

  const storyStyles = [
    "bg-yellow-300 rotate-2",
    "bg-pink-200 -rotate-1",
    "bg-blue-200 rotate-1",
    "bg-green-200 -rotate-2",
    "bg-purple-200 rotate-3",
  ];
  const topStories = stories.slice(0, 5);

  // State to manage which story is expanded
  const [expandedStory, setExpandedStory] = useState(null);

  // Function to toggle story expansion
  const handleToggleExpand = (id) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  return (
    <div className={`flex flex-col items-center justify-center bg-opacity-65 border-2 p-4 m-2 h-screen ${containerBgColor}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Latest Stories</h1>
        <div className="relative flex flex-wrap justify-center gap-4 max-w-screen-xl m-auto">
          {topStories.length > 0 ? (
            topStories.map((story, index) => (
              <div
                key={story._id}
                className={`relative w-full max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-lg shadow-md text-black ${storyStyles[index % storyStyles.length]} ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:shadow-xl transition-transform transform hover:scale-105`}
              >
                <h2 className="text-xl font-bold mb-2">{story.username}</h2>
                <p className="text-gray-700 mb-2">
                  {expandedStory === story._id 
                    ? story.story 
                    : story.story.length > 50 
                      ? `${story.story.slice(0, 50)}...` 
                      : story.story}
                  <button
                    onClick={() => handleToggleExpand(story._id)}
                    className="text-blue-500 ml-2"
                  >
                    {expandedStory === story._id ? 'Read Less' : 'Read More'}
                  </button>
                </p>
                <p className="text-gray-500 text-sm">{new Date(story.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
};


const HoverCard = ({ title, description, image }) => {
  return (
    <div className="max-w rounded flex-wrap shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img className="w-full object-cover transition-transform duration-300 transform hover:scale-110" src={image} alt={title} />
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
        <p className="text-zinc-800 transition-all duration-300  group-hover:h-auto group-hover:opacity-100">{description}</p>
      </div>
    </div>
  );
};

const PageFour = ({news,loading}) => {
=======
function Home() {
  const [auth] = useAuth();
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> 65f6ef666ab1fff9a66ccc446c91b31e83e3c324
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const today = moment().startOf('day');
        const upcomingEvents = response.data.filter(event => moment(event.date).isAfter(today));
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/stories')
      .then(response => {
        const sortedStories = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setStories(sortedStories || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

    axios.get('http://localhost:5000/news')
      .then(response => {
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sortedNews || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
      }, 2500);
      return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? upcomingEvents.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

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

  
  return (
    <div className=''>

<<<<<<< HEAD
        return (
          <section key={i} className={`${textColor} ${classNames}`}>
            
            <div className={`${textColor} `}>
              <div className={`${textColor}`}>
                {Component}
              </div>
=======
      <div className="page-1 h-screen flex items-center justify-center relative">
        <div className="react_text bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-opacity-30 backdrop-filter backdrop-blur-2xl p-4 rounded-lg shadow-lg w-auto">
          <ReactTyped
            className="md:text-3xl font-bold md:py-6 text-white text-center"
            strings={['THIS IS OUR EPSILON PROGRAM WEBSITE']}
            typeSpeed={120}
            backSpeed={180}
            loop
          />
        </div>

        {/* vertical */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex'>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div>

        {/* horizontal */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>
      </div>


      {/* Three Events Section */}
      <div className='eventsContainer relative h-[70vh] m-auto'>
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
        <div id="default-carousel" className="eventsPage p-4 relative max-w-screen-xl m-auto" data-carousel="slide">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-60 object-cover mb-2"/>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p>{moment(event.date).format('DD MMMM YYYY')}</p>
                </div>
              ))}
>>>>>>> 65f6ef666ab1fff9a66ccc446c91b31e83e3c324
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {upcomingEvents.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-950' : 'bg-white'}`}
                aria-current={index === currentSlide}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>

          <button
            type="button"
            className="eventsButton absolute top-0 -start-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
            onClick={prevSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 ">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="eventsButton absolute top-0 -end-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
            onClick={nextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        )}
        
        {/* vertical */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex'>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div>

        {/* horizontal */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>
      </div>

      <div>
      {/* <div className={sectionClass}>
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
      </div> */}

      {/* <div className='sectionClass relative h-screen'> */}
        {/* <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 opacity-85 backdrop-blur-sm rounded-lg shadow-lg'>
          <img className='w-[300px] h-[300px] mx-auto my-4 rounded-full animate-pulse' src="https://orcz.com/images/a/a8/Gtavepsilonprogram.jpg" alt="IMAGE" />
          <div className='flex flex-col justify-center p-4'>
            <h1 className='font-bold md:text-4xl sm:text-3xl text-2xl'>THE EPSILONIST PLEDGE</h1>
            <p className='text-lg leading-relaxed'>
              All good things come from Kraff, that is the fact on which Epsilonism is built.
              Epsilonism is a science as well as a Religion - in fact, we are the only religion that is also a science and which is concerned with seeking the truth.
              As real truth seekers, we are willing to pay to make the search go better. In this way we are investing in our future.
            </p>
          </div>
        </div> */}
        
        {/* vertical */}
        {/* <div className='absolute top-0 w-screen h-screen opacity-5 flex'>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div> */}

        {/* horizontal */}
        {/* <div className='absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>
      </div> */}
      </div>

      {/* Latest Stories */}
      <div className='storiesContainer relative h-[80vh]'>
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">Latest Stories</h2>
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="relative flex flex-wrap justify-center gap-8 max-w-screen-xl m-auto">
            {lastFiveStories.map((story, index) => (

              <div key={story._id} className={`stories rounded-none text-white relative w-96 p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}>

                <p className="text-white mb-2 w-50">{story.story}</p>
                <p className="text-lg mb-2 text-white text-right">- {story.username}</p>
                <p className="text-white text-sm italic text-right">{moment(story.date).fromNow()}</p>
              </div>
            ))}
          </div>
        )}

        {/* vertical */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex'>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
          <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div>

        {/* horizontal */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>

      </div>
    </div>
  );
}

export default Home;

