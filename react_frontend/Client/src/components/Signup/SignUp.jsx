import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useToken from '../../tokens';
import { AuthContext } from '../../creatContext';
import { useContext ,useEffect} from 'react';


export default function App() {
  const [value, setValue] = useState({
    name:'',
    email:'',
    password:''
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue ({
        ...value,
        [e.target.name]: e.target.value
    });
  };

  const { setToken } = useToken();
  const { login ,isLoggedIn} = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const reigter = await axios.post("http://localhost:5000/register", value);
    console.log(reigter.data);
    setValue({
      name: "",
      email: "",
      password: "",
    });

    const token =  reigter;
    localStorage.setItem('token',token)
    setToken(token);
    const username =reigter.data.name;
   localStorage.setItem('username',username);
   
    login();
    alert("Acount created");
    navigate('/Donate', { replace: true });
  }
  catch(error){
    console.log(error);
    setError(error.respone.data.error)
  }
  };

  return (
    <>
    <div className="h-[600px] flex justify-center items-center bg-gray-100">
      <div className="max-w-md h-fit w-full p-6 bg-white rounded shadow-md">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/47/Epsilon_Program_Logo.png"
              className="h-36 shadow-sm"
              alt="Logo"
          />
          <h2 className="text-5xl font-bold mt-2 mb-8 text-center">Sign Up</h2>

          <input 
            placeholder="Username" 
            value={value.name} 
            onChange={handleChange} 
            required 
            name= "name" 
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded"
          />

          <input 
            placeholder="Email" 
            value={value.email} 
            onChange={handleChange} 
            required 
            name= "email" 
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4"
          />

          <input 
            placeholder="Password" 
            value={value.password} 
            onChange={handleChange} 
            required 
            name= "password" 
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4"
          />

          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>

          <h4 className='mt-4 text-center'> Already have an account? <a href='\login' className='text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all'>Log In</a> </h4>
          
        </form>
      </div>
    </div>
    </>
  );
}