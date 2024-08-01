import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment';
import EventRegistrationForm from './RegistrationForm';
import Swal from 'sweetalert2';

function Blog() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
    setSelectedEvent(event);
  };

  const handleRemoveEvent = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be removed from events.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/events/${id}`)
        .then(() => {
          setEvents(events.filter(event => event._id !== id));
        })
        .catch(error => {
          console.error('Error removing event:', error);
          alert('Error removing event: ' + error.message);
        });
  
        Swal.fire(
          'Removed!',
          'Event has been removed.',
          'success'
        );
      }
    });
  };

  const currentDate = moment();

  const upcomingEvents = events
    .filter(event => moment(event.date).isSameOrAfter(currentDate))
    .sort((a, b) => moment(a.date) - moment(b.date));

  const pastEvents = events
    .filter(event => moment(event.date).isBefore(currentDate))
    .sort((a, b) => moment(b.date) - moment(a.date));

    return (
      <div className='flex justify-end p-10 ml-[25vw] min-h-screen'>
        {auth.isAdmin ? (
          <div className='fixed left-0 top-30 flex flex-col p-16'>
            <h1 className='text-9xl text-left text-white m-0 p-0'>EVENTS</h1>
          </div>
        ) : (
          <div className='fixed left-0 top-30 flex flex-col p-16'>
            <h1 className='text-9xl text-left text-white m-0 p-0'>EVENT</h1>
            <h1 className='text-8xl text-left text-white m-0 p-0'>CALENDAR</h1>
          </div>
        )}
        <div className="max-w-screen-xl justify-end w-full">
          {loading ? (
            <div className="text-center py-16">
              <div className="spinner-border text-orange-500 mb-4" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading events...</p>
            </div>
          ) : (
            <>
              <div className="mb-18">
                <h3 className="sticky top-0 mt-0 text-white text-5xl font-semibold mb-6 text-center">Upcoming Events</h3>
                {upcomingEvents.length > 0 ? (
                  <div className='flex justify-end gap-8'>
                    <div className="space-y-8 relative right-0 w-full">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event._id}
                          className="flex bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300"
                        >
                          <div className="w-80 bg-gray-800 text-white flex-shrink-0 p-4 text-center flex flex-col justify-center items-center relative">
                            <img src={event.image || './src/assets/images/blank.png'} className="absolute inset-0 object-cover w-full h-full opacity-30" />
                            <p className="text-8xl font-bold">{moment(event.date).format('D')}</p>
                            <p className="text-4xl">{moment(event.date).format('MMM')}</p>
                          </div>

                          <div className="flex flex-col justify-items-start p-6 flex-1">
                            <h3 className="text-left text-3xl mb-2 font-semibold text-blue-600">{event.title}</h3>
                            <hr className='bg-black mb-4' />
                            <p className="text-left text-2xl text-gray-600 mb-4">{event.description}</p>
                            <p className='text-left text-2xl text-gray-600 mb-4'><span className='font-bold'>{moment(event.date).format('h:mm A')}</span> | <span className='font-bold'>{event.venue}</span> | <span className='font-bold'>{event.duration}</span> | <span className='font-bold'>{event.mode}</span></p>

                            {auth.isAdmin && (
                              <button
                                onClick={() => handleRemoveEvent(event._id)}
                                className="w-fit mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                              >
                                Remove Event
                              </button>
                            )}

                            {moment(event.date).isSameOrAfter(currentDate) && (
                              <button
                                onClick={() => handleRegister(event)}
                                className="w-fit mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Register
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">No upcoming events found.</p>
                )}
              </div>
              <div>
                <h3 className="text-5xl text-white font-semibold mb-6 text-center">Past Events</h3>
                {pastEvents.length > 0 ? (
                  <div className='flex justify-end gap-8'>
                    <div className="space-y-8 max-w-screen-lg relative right-0 w-full">
                      {pastEvents.map((event) => (
                        <div
                          key={event._id}
                          className="flex bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300"
                        >
                          <div className="w-80 bg-gray-800 text-white flex-shrink-0 p-4 text-center flex flex-col justify-center items-center relative">
                            <img src={event.image || './src/assets/images/blank.png'} className="absolute inset-0 object-cover w-full h-full opacity-30" />
                            <p className="text-8xl font-bold">{moment(event.date).format('D')}</p>
                            <p className="text-4xl">{moment(event.date).format('MMM')}</p>
                          </div>

                          <div className="flex flex-col justify-items-start p-6 flex-1">
                            <h3 className="text-left text-3xl mb-2 font-semibold text-blue-600">{event.title}</h3>
                            <hr className='bg-black mb-4' />
                            <p className="text-left text-2xl text-gray-600 mb-4">{event.description}</p>
                            <p className='text-left text-2xl text-gray-600 mb-4'><span className='font-bold'>{moment(event.date).format('h:mm A')}</span> | <span className='font-bold'>{event.venue}</span> | <span className='font-bold'>{event.duration}</span> | <span className='font-bold'>{event.mode}</span></p>

                            {auth.isAdmin && (
                              <button
                                onClick={() => handleRemoveEvent(event._id)}
                                className="w-fit mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                              >
                                Remove Event
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
      </div>
    );
  
}

export default Blog;
