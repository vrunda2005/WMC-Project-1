import './home.scss';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { useTheme } from '../../usetheamContext';
import { useAuth } from '../../creatContext';
import Style from './style';

const PageOne = () => (
  <div>
    <h1>HELLOOOOO</h1>
    <p>Scroll down ⬇</p>
  </div>
);



const PageTwo = ({ stories }) => {
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
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
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


// export default PageTwo;



const PageThree = ({ events, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const containerClass = `relative text-black p-40 overflow-hidden'}`;

  return (
      <div>
      <div className=" flex flex-col items-center justify-center h-screen ">
        <h2 className="text-black text-3xl font-bold mb-6 bg-white rounded-lg text-center">Upcoming Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div>
          <div className={containerClass}>
            <div className="relative">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {events.map((event, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg p-4 w-full min-w-full ">
                    <img src={event.image} alt={event.title} className="w-full h-80 object-cover mb-2"/>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p>{moment(event.date).format('DD MMMM YYYY')}</p>
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
  const [loading, setLoading] = useState(true);



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
    <Style/>,
    <PageTwo key="pageTwo" stories={stories} />,
    <PageThree key="pageThree" events={events} loading={loading}  />,
    <PageOne/>,
  ];
  const totalSlideNumber = content.length;

  return (
    <div className="app" onWheel={parallaxScroll}>
      {content.map((Component, i) => {
        const classNames = [
          "section",
          i <= slideIdx - 1 ? "down-scroll" : "",
          i !== totalSlideNumber - 1 && i >= slideIdx ? "up-scroll" : ""
        ]
          .join(" ")
          .trim();

        return (
          <section key={i} className={classNames}>
            <div className="parallax-wrapper">
              <div className="content">
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
