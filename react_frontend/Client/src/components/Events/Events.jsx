import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import { useNavigate } from 'react-router-dom';
import Blog from '../Blog/Blog';

function Events() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', { title, description, date, time, image })
      .then(response => {
        alert('Event registered successfully');
        navigate('/Blog');
      })
      .catch(error => {
        console.error(error);
        alert('Error creating event: ' + error.message);
      });
  };

  return (
    <>
    {auth.isAdmin ? (<>
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 mt-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Event
        </button>
      </form>

    </div>
    <Blog />
    </>):(<>
      <div className='text-center'>
        <h1 className='mt-20 text-5xl bg-red-500 text-yellow-500 p-4'>You are in wrong direnction !!</h1>
        <h1 className='mt-20 mb-20 text-5xl bg-red-500 text-yellow-500 p-4'>Please go back to <a className='text-6xl text-blue-500 underline' href="/">home</a>. It can be dangerous !!!</h1>
      </div>
    </>)}
    </>
  );
};

export default Events;