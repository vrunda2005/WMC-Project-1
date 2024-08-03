import React, { useState } from 'react';

const AdminNewsForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://wmc-project-av5d.onrender.com/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image }),
      });

      if (response.ok) {
        Swal.fire({
            title: 'Success!',
            text: 'News item created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        setTitle('');
        setDescription('');
        setImage('');
      } else {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to create news item',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
    } catch (error) {
      console.error('Error creating news:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className={`p-8 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto mt-10`}>
      <h1 className={`text-4xl font-extrabold text-gray-900 mb-6`}>Create News Item</h1>
      <form onSubmit={handleSubmit} className={`space-y-6`}>
        <div className={`mb-4 text-black`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>
        <div className={`mb-4`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
            required
          />
        </div>
        <div className={`mb-4`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminNewsForm;
