import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize auth state from local storage if available
  const initialAuthState = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : { username: "", token: "", isLoggedIn: false, isAdmin: false };
  };

  const [auth, setAuth] = useState(initialAuthState);
  const [userData, setUserData] = useState({});

  // Set default axios authorization header
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token;
  }, [auth.token]);

  const fetchData = async () => {
    if (auth.username) {
      try {
        const response = await axios.get(`http://localhost:5000/getalluser/${auth.username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.username]);

  useEffect(() => {
    if (userData?.points) {
      setAuth(prevAuth => ({ ...prevAuth, userPoints: userData.points }));
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth, userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
