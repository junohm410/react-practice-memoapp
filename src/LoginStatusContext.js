import { createContext, useState, useContext } from "react";

const LoginStatusContext = createContext({});

export function LoginStatusProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginStatusContext.Provider>
  );
}

export function useLoginStatus() {
  return useContext(LoginStatusContext);
}
