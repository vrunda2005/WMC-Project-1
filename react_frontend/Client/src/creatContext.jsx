import { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [auth, setAuth] = useState({
    username: "",
    token: "",
    isLoggedIn: false,
    isAdmin:false,

  });

  //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

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

  
  useEffect(() => {
    if (auth.username) {
      setAuth({ ...auth, userPoints: userData.points });
    }
  }, [userData.points]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data !== null) { // Check if data is not null
      try {
        const parseData = JSON.parse(data);
        setAuth({
          ...auth,
          username: parseData.username,
          token: parseData.token,
          isLoggedIn: true,
          userPoints: parseData.points,
          isAdmin: parseData.isAdmin ? true : false,
        });
      } catch (error) {
        console.error("Error parsing auth data from local storage:", error);
      }
  }}, []);

  

  return (
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);


export { useAuth,AuthProvider, AuthContext };