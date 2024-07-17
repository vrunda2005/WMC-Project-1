import { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  // const [auth,setAuth]=useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [auth, setAuth] = useState({
    username: "",
    token: "",
    isLoggedIn: false,
    isAdmin:false,

  });

  //default axios
  useEffect(()=>{
    axios.defaults.headers.common["Authorization"] = auth?.token;

  },[])

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
    //eslint-disable-next-line
  }}, []);


  return (
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);


export { useAuth,AuthProvider, AuthContext };