import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";
import Swal from 'sweetalert2'

const ProfilePage = () => {
  const [userData, setUserData] = useAuth();
  const [auth] = useAuth();
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    image: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.username || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        password: userData.password || '',
        image: userData.image || '',
      });
    }
  }, [userData]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditToggle = () => {
    if (edit) {
      setFormData({
        name: userData.name,
        dob: userData.dob || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        password: userData.password || '',
        image: userData.image || '',
      });
    }
    setEdit(!edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    console.log('Form Data:', formData); // Check formData content
    try {
      const response = await fetch(`http://localhost:5000/updateuser/${auth.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response Status:', response.status); // Check response status
      const updatedData = await response.json();
      console.log('Response Data:', updatedData); // Check response data
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setUserData(updatedData);
      setEdit(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully!',
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile. Please try again.',
      });
    }
  };
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  const cursorStyle = edit ? 'cursor-text border-gray-300' : 'cursor-not-allowed';
  const textColor = edit ? 'text-white' : 'text-gray-300';

  return (
    <div className='bg-slate-400 h-screen'>
      <div className="max-w-screen-md m-auto mt-16 h-auto bg-gray-800 text-white shadow-lg rounded-lg">
        <div className="p-6 flex">
          <div className="flex flex-col items-center">
            <img
              className="h-80 rounded-lg object-cover"
              src={formData.image}
              alt='profile picture'
            />
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-gray-900 font-semibold py-1 px-2 rounded-lg mr-2"
                onClick={() => edit && setFormData({ ...formData, image: 'new_image_url' })}
                disabled={!edit}
              >
                Change
              </button>
              <button
                className="bg-gray-600 text-white font-semibold py-1 px-2 rounded-lg"
                onClick={() => edit && setFormData({ ...formData, image: '' })}
                disabled={!edit}
              >
                Remove
              </button>
            </div>
          </div>

          <div className='px-16'>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className={`block text-gray-500 ${textColor}`}>Display Name</label>
                <input
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                  type="text"
                  name="name"
                  placeholder={userData.name}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <label className={`block text-gray-500 ${textColor}`}>Date of Birth</label>
                <input
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                  type="text"
                  name="dob"
                  placeholder={userData.dob || 'Not added yet!'}
                  value={formData.dob}
                  onChange={handleChange}
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
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
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
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
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
                      checked={formData.gender === 'other'}
                      onChange={handleChange}
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
                  name="phone"
                  placeholder={userData.phone || 'Not added yet!'}
                  value={formData.phone}
                  onChange={handleChange}
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
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className={`block text-gray-500 ${textColor}`}>Change Password</label>
                  <input
                    className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className={`border w-7 rounded mt-4 p-1 ${!edit && 'cursor-not-allowed'}`}
                    disabled={!edit}
                  >
                    {showPassword ? <RiEye2Fill /> : <RiEyeCloseFill />}
                  </button>
                </div>
              </div>
            </div>

            {edit && (
              <div className='mt-8'>
                <button
                  className='bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-lg mr-2'
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleEditToggle}
              className={`m-auto w-30 py-2 px-4 rounded ${edit ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              {edit ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
