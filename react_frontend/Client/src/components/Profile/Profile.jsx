import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';

const ProfilePage = () => {
  const [userData, setUserData] = useAuth();
  const [auth] = useAuth();
  const [edit, setEdit] = useState(false);

  const editButton = () => {
    setEdit(!edit);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (auth.email) {
        try {
          const response = await fetch(`http://localhost:5000/getalluser/${auth.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [auth.email]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  const cursorStyle = edit ? 'cursor-text border-gray-300':'cursor-not-allowed';
  const textColor = edit ? 'text-white':'text-gray-300';

  return (
    <div className='bg-slate-400 h-screen border-4'>
    <div className="max-w-screen-md m-auto mt-16 h-auto bg-gray-800 text-white shadow-lg rounded-lg">

      <div className="p-6 flex">

        <div className="flex flex-col items-center">
          <img
            className="h-80 rounded-lg object-cover"
            src={userData.image || 'https://via.placeholder.com/150'}
            alt={userData.name}
          />
          <div className="mt-4">
            <button className="bg-yellow-500 text-gray-900 font-semibold py-1 px-2 rounded-lg mr-2">Change</button>
            <button className="bg-gray-600 text-white font-semibold py-1 px-2 rounded-lg">Remove</button>
          </div>
        </div>

        <div className='px-16'>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className={`block text-gray-500 ${textColor}`}>Display Name</label>
            <input
              className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
              type="text"
              placeholder={userData.name}
              disabled={!edit}
            />
          </div>
          <div>
            <label className={`block text-gray-500 ${textColor}`}>Date of Birth</label>
            <input
              className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
              type="text"
              placeholder="dd/mm/yyyy"
              disabled={!edit}
            />
          </div>
          <div>
          <label className={`block text-gray-500 ${textColor}`}>Gender</label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-500"
                  name="gender"
                  value="male"
                  defaultChecked
                  disabled={!edit}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-500"
                  name="gender"
                  value="female"
                  disabled={!edit}
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-500"
                  name="gender"
                  value="other"
                  disabled={!edit}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
          <div>
          <label className={`block text-gray-500 ${textColor}`}>Phone Number</label>
            <input
              className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
              type="text"
              placeholder="+91 12345 67890"
              disabled={!edit}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl text-gray-300 mt-8 mb-4">Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white">Current Password</label>
              <input
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                type="password"
              />
            </div>
            <div>
            <label className={`block text-gray-500 ${textColor}`}>Change Password</label>
              <input
                className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                type="password"
              />
            </div>
          </div>
        </div>

        <div className='mt-8'>
            <button className='bg-blue-500 px-4'>Save</button>
        </div>
        </div>

        <div>
            {edit ? (<>
              <button onClick={editButton} className='m-auto w-30 bg-red-500 hover:bg-red-600 py-2'>
                  Cancel
              </button>
              </>):(<>
              <button onClick={editButton} className='m-auto w-30 py-2'>
                  Edit
              </button>              
              </>)}
        </div>

      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
