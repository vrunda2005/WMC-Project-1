import './home.scss';
import React, { useState, useEffect } from 'react';
import _, { over } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { useTheme } from '../../usetheamContext';
import { useAuth } from '../../creatContext';
import Style from './style';
import Page_description from './Page_description';
import { ReactTyped } from 'react-typed';
import 'bootstrap/dist/css/bootstrap.css';
import vid from '../../assets/images/video_gta.mp4'

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
  const { theme } = useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';

  const displayNews = news.slice(0, 3);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen  ${textPrimaryColor} p-8`}>
      <h1 className=" font-bold mb-10">Epsilon News </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayNews.map((card, index) => (
          <div key={index} className="group">
            <HoverCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};


const PageThree = ({ events, loading }) => {
  const{theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-secondary-bg' : 'bg-dark-secondary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const containerClass = `relative p-10 overflow-hidden ${containerBgColor} ${textPrimaryColor} `;

  return (
      <div>
      <div className=" flex flex-col items-center justify-center h-screen ">
        <h2 className={` text-4xl font-bold mb-6 p-5 ${containerBgColor} ${textPrimaryColor}rounded-lg text-center`}>Upcoming Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div>
          <div className={containerClass}>
            <div className="relative">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {events.map((event, index) => (
                  <div key={index} className={`${containerBgColor} ${textPrimaryColor} shadow-md rounded-lg p-4 w-full min-w-full `}>
                    <img src={event.image} alt={event.title} className="w-full h-80 object-cover mb-2"/>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className={`${textPrimaryColor}`} >{moment(event.date).format('DD MMMM YYYY')}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg focus:outline-none"
              >
                &#8249;
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg focus:outline-none"
              >
                &#8250;
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
      </div>
  );
};



   




// export default PageThree;
// Content mapping

const transitionDuration = 600;

const Home = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [stories, setStories] = useState([]);
  const [events, setEvents] = useState([]);
  const [News, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const today = moment().startOf('day');
        const upcomingEvents = response.data.filter(event => moment(event.date).isAfter(today));
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      })
      .catch(error => console.error(error))

    axios.get('http://localhost:5000/stories')
      .then(response => {
        const sortedStories = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setStories(sortedStories || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

      axios.get('http://localhost:5000/news')
      .then(response => {
        const News = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(News || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

      
      


  }, []);

  const slideDurationTimeout = (slideDuration) => {
    setTimeout(() => {
      setIsBusy(false);
    }, slideDuration);
  };
  const upcomingEvents = events.slice(0, 5);
  const lastFiveStories = stories.slice(0, 5);
  const today = moment().format('YYYY-MM-DD');

  const parallaxScroll = _.throttle((e) => {
    const isWheelingDown = -e.deltaY <= 0;

    if (isWheelingDown && !isBusy) {
      setIsBusy(true);
      if (slideIdx !== totalSlideNumber - 1) {
        scrollDown();
      }
      slideDurationTimeout(transitionDuration);
    }

    if (!isWheelingDown && !isBusy) {
      setIsBusy(true);
      if (slideIdx !== 0) {
        scrollUp();
      }
      slideDurationTimeout(transitionDuration);
    }
  }, transitionDuration);

  const scrollDown = () => setSlideIdx(prevIdx => Math.min(prevIdx + 1, totalSlideNumber - 1));

  const scrollUp = () => setSlideIdx(prevIdx => Math.max(prevIdx - 1, 0));

  const content = [
    <PageOne/>,
    <Page_description/>,
    <PageFour key="pageFour" news={News} loading={loading}  />,
    <PageTwo key="pageTwo" stories={stories} />,
    <PageThree key="pageThree" events={events} loading={loading}  />,
  
  ];
  const totalSlideNumber = content.length;
  console.log(totalSlideNumber);

  const bgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const buttonColor = theme === 'blue' ? 'bg-green-600 hover:bg-green-800' : 'bg-green-600 hover:bg-green-800';
  const overlayColor = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay';

  return (
    <div className={`app ${overlayColor} ${textColor}`} onWheel={parallaxScroll}>
      {content.map((Component, i) => {
        const classNames = [
          "section",
          i <= slideIdx - 1 ? "down-scroll" : "",
          i !== totalSlideNumber - 1 && i >= slideIdx ? "up-scroll" : ""
        ]
          .join(" ")
          .trim();

        return (
          <section key={i} className={`${textColor} ${classNames}`}>
            
            <div className={`${textColor} `}>
              <div className={`${textColor}`}>
                {Component}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Home;
