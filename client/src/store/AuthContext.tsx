import React, { useState } from 'react';

const AuthContext = React.createContext({
  user: {
    email: '',
    token: '',
  },
  loginClick: (userInfo: { email: string; token: string }) => {},
  logoutClick: () => {},
});

const checkUser = () => {
  const localEmail = localStorage.getItem('email');
  return localEmail === null ? '' : localEmail;
};
const checkToken = () => {
  const localToken = localStorage.getItem('token');
  return localToken === null ? '' : localToken;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({ email: checkUser(), token: checkToken() });

  const loginClick = (userInfo: { email: string; token: string }) => {
    setUser(userInfo);
  };

  const logoutClick = () => {
    setUser({ email: '', token: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginClick,
        logoutClick,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
