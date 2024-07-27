import React, { useState, useEffect } from 'react';

const AdminDonations = () => {
  const [userDonations, setUserDonations] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user donations data
  const fetchUserDonations = async () => {
    try {
      const response = await fetch('http://localhost:5000/user-donations');
      if (!response.ok) {
        throw new Error('Failed to fetch user donations');
      }
      const data = await response.json();
      setUserDonations(data.userDonations);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch user donations:', error);
    }
  };

  useEffect(() => {
    fetchUserDonations();
  }, []);

  return (
    <div>
      <h1>User Donations</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Donations
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userDonations.map((donation) => (
            <tr key={donation.username}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {donation.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${donation.totalDonations.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonations;
