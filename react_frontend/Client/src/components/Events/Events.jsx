import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [events, setEvents] = useState([]);
  const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', { title, description, date, time })
     .then(response => {
        setEvents([...events, response.data]);
        alert('Event registered succesfully');
        navigate('/');
      })
     .catch(error => {
        console.error(error);
        alert('Error creating event: ' + error.message);
      });
  };

  return (
    <div className="relative min-h-screen bg-hero-pattern bg-cover bg-center text-text-light">
      <div className="absolute inset-0 bg-overlay"></div> {/* Optional overlay for better readability */}
      
      <div className="relative max-w-md mx-auto p-4 pt-6 pb-8 mb-4 content-center bg-primary-bg rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-text-light">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-secondary-bg rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter event title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border border-secondary-bg rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter event description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border border-secondary-bg rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-light text-sm font-bold mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border border-secondary-bg rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-highlight hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;