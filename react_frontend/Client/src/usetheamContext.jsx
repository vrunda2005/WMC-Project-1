// src/usetheamContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('blue');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'blue' ? 'dark' : 'blue'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
