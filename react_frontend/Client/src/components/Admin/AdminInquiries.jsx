// src/pages/AdminInquiries.js
import React, { useState, useEffect } from 'react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('https://wmc-project-av5d.onrender.com/admin/inquiries');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        setError('There was a problem fetching the inquiries.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">All Inquiries</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full bg-gray-900 border border-gray-700 rounded-lg">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-700">Name</th>
            <th className="p-2 border-b border-gray-700">Email</th>
            <th className="p-2 border-b border-gray-700">Message</th>
            <th className="p-2 border-b border-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry._id}>
              <td className="p-2 border-b border-gray-700">{inquiry.name}</td>
              <td className="p-2 border-b border-gray-700">{inquiry.email}</td>
              <td className="p-2 border-b border-gray-700">{inquiry.message}</td>
              <td className="p-2 border-b border-gray-700">{new Date(inquiry.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInquiries;
