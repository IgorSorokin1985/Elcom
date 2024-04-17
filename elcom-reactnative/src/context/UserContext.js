import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [ isAuth, setAuth ] = useState(false);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const loginUser = await AsyncStorage.getItem('login');
      const passwordUser = await AsyncStorage.getItem('password');
      if (loginUser && passwordUser && token) {
        setAuth(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ isAuth, setAuth, }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);