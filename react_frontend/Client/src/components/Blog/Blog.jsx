import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment'; // Correctly import moment

function Blog() {
  const [events, setEvents] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // Load events from backend API when the component mounts
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data || []);
      })
      .catch(error => {
        console.error(error);
        alert('Error loading events: ' + error.message);
      });
  }, []);

  const handleRemoveEvent = (eventId, index) => {
    axios.delete(`http://localhost:5000/api/events/${eventId}`)
      .then(() => {
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        setEvents(updatedEvents);
      })
      .catch(error => {
        console.error(error);
        alert('Error deleting event: ' + error.message);
      });
  };

  const currentDate = moment();

  const upcomingEvents = events.filter(event => moment(event.date).isSameOrAfter(currentDate));
  const pastEvents = events.filter(event => moment(event.date).isBefore(currentDate));

  const renderEvent = (event, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
    >
      <div className="flex-none sm:w-40 sm:h-40 bg-gray-200 rounded-lg overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={event.image || './src/assets/images/placeholder.png'} 
          alt={event.title}
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="flex flex-wrap items-center">
          <p className="text-gray-600 mr-4">
            <img className='w-5 inline mr-1 mb-1' src="./src/assets/images/calendar.png" alt="Calendar icon" />
            {event.date}
          </p>
          <p className="text-gray-600">
            <img className='w-5 inline mr-1 mb-1' src="./src/assets/images/clock.png" alt="Clock icon" />
            {event.time}
          </p>
        </div>
        {auth.isAdmin && (
          <button
            onClick={() => handleRemoveEvent(event._id, index)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Remove Event
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h2>
        <div className="grid gap-6">
          {Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? (
            upcomingEvents.map(renderEvent)
          ) : (
            <p className="text-gray-600">No upcoming events found</p>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-800 mt-12">Past Events</h2>
        <div className="grid gap-6">
          {Array.isArray(pastEvents) && pastEvents.length > 0 ? (
            pastEvents.map(renderEvent)
          ) : (
            <p className="text-gray-600">No past events found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
