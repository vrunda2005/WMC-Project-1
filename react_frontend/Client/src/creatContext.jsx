import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdminLoggedIN,setIsAdminLoggedIn] =useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);

      const isAdmin = localStorage.getItem('isAdmin');
      if (isAdmin) {
        setIsAdminLoggedIn(true);
      }
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const isAdmin=(newToken)=>{
    localStorage.setItem('token', newToken);
    localStorage.setItem('isAdmin', true);
    setToken(newToken);
    setIsAdminLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); 
    setToken(null);
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout,isAdmin ,isAdminLoggedIN}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };