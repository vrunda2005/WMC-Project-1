import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../creatContext';
import { ReactTyped } from "react-typed";

function Home() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState({});


  const fetchData = async () => {
    if (auth.username) {
      try {
        const response = await fetch(`http://localhost:5000/getalluser/${auth.username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.username]);

  
  const updatePoints = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updateuser/${auth.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: userData.points - 10 }),
      });
      const data = await response.json();
      setUserData(data.user);
      setAuth({
        ...auth,
        username:data.user.username,
        userPoints:data.user.points,
      });  
      localStorage.setItem('auth', JSON.stringify(auth));
      localStorage.setItem('userData', JSON.stringify(data.user)); 
      // console.log("updated auth ");
      // console.log(`Admin points: ${data.admin}`); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedUserData = localStorage.getItem('userData');
    if (storedAuth && storedUserData) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        const parsedUserData = JSON.parse(storedUserData);
        setAuth(parsedAuth);
        setUserData(parsedUserData);
        // console.log('Auth state updated from localStorage:', parsedAuth);
        // console.log('User data updated from localStorage:', parsedUserData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }, []);



  return (
    <div className="">
      <div className='max-w[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>

      <div className='container opacity-80 bg-white 
      '>
        <p className='md:text-5xl sm:text-4xl font-bold text-blue-950 md:py-6'>
        hi user : {auth.username}<br/>
        
       Your points: {auth.userPoints}<br/>
        Now here we implement Our home page!!!
        </p>
        <ReactTyped  className='md:text-3xl sm:text-4xl font-bold text-blue-950 md:py-6'
        strings={['THIS IS OUR EPSILON PROGRAME WEBSITE ']}
        typeSpeed={120} 
        bacsSpeed={130} 
        loop
         />

        </div>
    </div>


    <div className='w-full   py-16 px-4 text-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 opacity-85 backdrop-blur-sm bg-zinc-800 '>
          <img className='w-[300px] h-[300px] mx-auto my-4' src="https://orcz.com/images/a/a8/Gtavepsilonprogram.jpg" alt="IMAGE" />
          <div className='flex flex-col justify-center'>
            <h1 className='font-bold' md:text-4xl sm:text-3xl text-2xl>OUR GURU</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores et blanditiis nostrum ipsum corrupti quas error quo? Quos quia sunt minima beatae necessitatibus saepe, recusandae, modi deserunt ipsum, adipisci cumque!</p>
          </div>

      </div>
    </div>

    <div className='w-full  py-16 px-4 text-balck'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 opacity-85 backdrop-blur-sm bg-white '>
          <img className='w-[300px] h-[300px] mx-auto my-4' src="https://orcz.com/images/a/a8/Gtavepsilonprogram.jpg" alt="IMAGE" />
          <div className='flex flex-col justify-center'>
            <h1 className='font-bold' md:text-4xl sm:text-3xl text-2xl>OUR GURU</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores et blanditiis nostrum ipsum corrupti quas error quo? Quos quia sunt minima beatae necessitatibus saepe, recusandae, modi deserunt ipsum, adipisci cumque!</p>
          </div>

      </div>
    </div>
        
    </div>
  );
}

export default Home;