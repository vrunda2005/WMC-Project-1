import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialAuthState = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : { username: "", token: "", isLoggedIn: false, isAdmin: false ,membership_id: null };
  };

  const [auth, setAuth] = useState(initialAuthState);
  const [userData, setUserData] = useState({});

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
    if (userData?.membership_id) {
      setAuth(prevAuth => ({ ...prevAuth, membership_id: userData.membership_id }));
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
