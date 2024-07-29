import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment';
import EventRegistrationForm from './RegistrationForm'; // Import the new component

function Blog() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [auth] = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert('Error loading events: ' + error.message);
        setLoading(false);
      });
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event); // Set the event for which the registration form should open
  };

  const handleRemoveEvent = (id) => {
    if (window.confirm('Are you sure you want to remove this event?')) {
      axios.delete(`http://localhost:5000/api/events/${id}`)
        .then(() => {
          setEvents(events.filter(event => event._id !== id));
        })
        .catch(error => {
          console.error('Error removing event:', error);
          alert('Error removing event: ' + error.message);
        });
    }
  };

  const currentDate = moment();

  // Sorting upcoming events (ascending) and past events (descending)
  const upcomingEvents = events
    .filter(event => moment(event.date).isSameOrAfter(currentDate))
    .sort((a, b) => moment(a.date) - moment(b.date));

  const pastEvents = events
    .filter(event => moment(event.date).isBefore(currentDate))
    .sort((a, b) => moment(b.date) - moment(a.date));

  const renderEvent = (event, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg relative"
      style={{ minHeight: '300px' }}
    >
      <div className="relative h-auto">
        <img
          className="object-cover w-full h-64"
          src={event.image || './src/assets/images/placeholder.png'}
          alt={event.title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white">
          <div>
            <p className="mb-2">{event.description}</p>
            <p>{event.time}</p>
            {auth.isAdmin ? (<>
              <button
              onClick={() => handleRemoveEvent(event._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove Event
            </button>
            </>):(<></>)}
            
            {moment(event.date).isSameOrAfter(currentDate) && (
              <button
                onClick={() => handleRegister(event)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Register
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
      {auth.isAdmin ? (<></>):(<>
        <h2 className="text-3xl font-bold mb-8 text-center">Events</h2>
      </>)}
      <hr className='mb-12' />
      {loading ? (
        <div className="text-center py-8">
          <div className="spinner-border text-orange-600 mb-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading events...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {upcomingEvents.map(renderEvent)}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No upcoming events found.</p>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Past Events</h3>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pastEvents.map(renderEvent)}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No past events found.</p>
            )}
          </div>
        </>
      )}
      {selectedEvent && (
        <EventRegistrationForm
          isOpen={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
        />
      )}
    </div>
  );
}

export default Blog;
