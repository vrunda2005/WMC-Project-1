import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function VolunteeringForm({ isOpen, onClose, event }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/volunteers', {
      eventId: event._id,
      name,
      email,
    //   eventName,
      message,
    })
      .then(() => {
        alert('Your interest has been registered!');
        onClose();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + error.message);
      });
  };

  return (
    <div className='border-2 absolute'>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Volunteering Form"
      className="modal absolute top-0 left-[20%] z-10"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-3xl mb-4">Volunteer for {event.title}</h2>
      <form onSubmit={handleSubmit} className='bg-red-500'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
    </div>
  );
}

export default VolunteeringForm;
