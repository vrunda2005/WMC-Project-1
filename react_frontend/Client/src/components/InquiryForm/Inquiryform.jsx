// src/components/InquiryForm.js
import React, { useState, useContext } from 'react';
import { useAuth } from '../../creatContext';

const InquiryForm = () => {
  const [auth,setAuth] = useAuth();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: auth.username, email: auth.email, message }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setSuccessMessage('Your inquiry has been sent successfully!');
      setMessage('');
    } catch (error) {
      setErrorMessage('There was a problem sending your inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {auth.isLoggedIn ? (
      <>
        <h2 className="text-2xl font-bold mb-4">Inquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </>):(
        <div className="mt-2 text-center mb-12">
        <h2 className={`text-2xl font-bold mb-4`}>Sign in to continue</h2>
        <p className="text-gray-600">Please sign in to inquiry and contribute to our community.</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
          onClick={() => {
            navigate(`/Login`);
          }}
        >
          Sign In
        </button>
        </div>
      )}
    </div>
  );
};

export default InquiryForm;
