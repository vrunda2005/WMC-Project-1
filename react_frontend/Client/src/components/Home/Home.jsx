import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../creatContext';

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
      console.log("updated auth ");
      console.log(`Admin points: ${data.admin}`); 
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
        console.log('Auth state updated from localStorage:', parsedAuth);
        console.log('User data updated from localStorage:', parsedUserData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }, []);



  return (
    <div className="container mx-auto h-[650px] p-4 md:p-8 lg:p-7">
     
        hi user : {auth.username}<br/>
        
       Your points: {auth.userPoints}<br/>
        Now here we implement Our home page!!!

      
        



    
    </div>
  );
}

export default Home;