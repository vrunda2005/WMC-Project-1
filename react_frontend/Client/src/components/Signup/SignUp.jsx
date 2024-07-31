import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "../../usetheamContext";
import { RiEye2Fill } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import Swal from 'sweetalert2';



export default function App() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", value);
      console.log(response.data);
      setValue({
        name: "",
        email: "",
        password: "",
      });
      await Swal.fire({
        title: 'Success!',
        text: 'Account created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      let errorMessage = 'An error occurred';
      if (err.response) {
        // Handle server errors
        errorMessage=(`Error ${err.response.status}: ${err.response.data.message || 'An error occurred'}`);
      } else if (err.request) {
        // Handle no response errors
        errorMessage=('No response received from the server');
      } else {
        // Handle request setup errors
        errorMessage=('Error setting up the request');
      }
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black';
  const overlayColor = theme === 'blue' ? 'bg-blue-light bg-opacity-50' : 'bg-gray-900 bg-opacity-50';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-blue': 'text-dark-text-blue';
  const textSecondaryColor = theme === 'blue' ? 'text-blue-text-dark' : 'text-dark-text-dark';
  const buttonBgColor = theme === 'blue' ? 'bg-green-500' : 'bg-yellow-500';
  const buttonHoverBgColor = theme === 'blue' ? 'hover:bg-green-600' : 'hover:bg-yellow-600';

  return (
    <>
      <div className={`h-[600px] flex justify-center items-center`}>
        <div className={`max-w-md h-fit w-full p-6 ${containerBgColor} rounded shadow-md`}>
          <form className={`flex flex-col gap-2`} onSubmit={handleSubmit}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/47/Epsilon_Program_Logo.png"
              className={`h-36 shadow-sm`}
              alt="Logo"
            />
            <h2 className={`text-5xl font-bold mt-2 mb-8 text-center`}>Sign Up</h2>
  
            <input 
              placeholder="Username" 
              value={value.name} 
              onChange={handleChange} 
              required 
              name="name" 
              className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded`}
            />
  
            <input 
              type="email"
              placeholder="Email" 
              value={value.email} 
              onChange={handleChange} 
              required 
              name="email" 
              className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4`}
            />
            
            <div className={`flex gap-2`}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password" 
                value={value.password} 
                onChange={handleChange} 
                required 
                name="password" 
                className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4`}
              />
  
              <button 
                type="button"
                onClick={handleShowPassword} 
                className={`border w-7 rounded mt-4 p-1`}
              >
                {showPassword ? <RiEye2Fill />
 : <RiEyeCloseFill/>}
              </button>
            </div>
  
            <button 
              type="submit" 
              className={`w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4`}
            >
              Submit
            </button>
  
            <h4 className={`mt-4 text-center`}>
              Already have an account? <a href='\login' className={`text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all`}>Log In</a>
            </h4>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}  