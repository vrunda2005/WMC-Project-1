import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment';

function Blog() {
  const [events, setEvents] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
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
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg relative"
      style={{ minHeight: '300px' }} // Adjust minimum height as needed
    >
      <div className="relative h-full">
        <img
          className="object-cover w-full h-64"
          src={event.image || './src/assets/images/placeholder.png'}
          alt={event.title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white">
          <div>
            <p className="mb-2">{event.description}</p>
            <p>{event.time}</p>
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
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600">{moment(event.date).format('DD MMMM YYYY')}</p>
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Events</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {upcomingEvents.map(renderEvent)}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming events found.</p>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Past Events</h3>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastEvents.map(renderEvent)}
          </div>
        ) : (
          <p className="text-gray-600">No past events found.</p>
        )}
      </div>
    </div>
  );
}  

export default Blog;
