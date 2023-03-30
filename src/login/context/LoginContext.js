import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { authUser } from '../api/LoginApi';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

export function LoginContextProvider(props) {
  const [userAuth, setUserAuth] = useState(null);
  const navigate = useNavigate();
  const loginData = async (data) => {
    const result = await authUser(data);
    if (result.status == 200) navigate('/home');
    return result.json();
  };

  useEffect(() => {}, []);

  return (
    <LoginContext.Provider value={{ loginData, userAuth, setUserAuth }}>
      {props.children}
    </LoginContext.Provider>
  );
}
