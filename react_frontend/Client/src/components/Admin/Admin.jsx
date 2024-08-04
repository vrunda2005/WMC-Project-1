import React, { useState, useEffect } from 'react';
import { useTheme } from '../../usetheamContext';
import { useAuth } from '../../creatContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDonations = () => {
  const [userDonations, setUserDonations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

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
    if (!auth.isAdmin) {
      Swal.fire({
        title: 'Error!',
        text: 'You are not authorised!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      navigate('/');
    }
  }, []);

  const {theme}=useTheme();
  const bgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const buttonColor = theme === 'blue' ? 'bg-green-600 hover:bg-green-800' : 'bg-green-600 hover:bg-green-800';
  const overlayColor = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay';

  return (
      <div className={`p-6 ${bgColor} min-h-screen`}>
        {auth.isAdmin ? (<>
        <h1 className={`text-3xl font-bold mb-6 `}>User Donations</h1>
        {error && (
          <p className={`text-red-600 bg-red-100 border border-red-300 rounded p-4 mb-6`}>
            {error}
          </p>
        )}
        <div className={`overflow-x-auto ${bgColor} shadow-md rounded-sm border-2 border-sky-100`}>
          <table className={`min-w-full divide-y ${bgColor} divide-gray-200`}>
            <thead className={`border-3`}>
              <tr>
                <th className={`px-6 py-3  text-2xl font-xl  uppercase tracking-wider`}>
                  Username
                </th>
                <th className={`px-6 py-3  text-2xl font-xl  uppercase tracking-wider`}>
                  Total Donations
                </th>
              </tr>
            </thead>
            <tbody className={` divide-y ${textColor} `}>
              {userDonations.map((donation) => (
                <tr key={donation.username} className='hover:bg-gray-600'>
                  <td className={`px-6 py-4 whitespace-nowrap text-lg  `}>
                    {donation.username}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-lg `}>
                    ${donation.totalDonations.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>):(<></>)}
      </div>
    );
  };
  
export default AdminDonations;
