import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      const data = axios.get("http://localhost:4001/api/profile");
      setUser(data.data);
      setReady(true);
    }
  }, [user]);
  return (
    <UsersContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UserContextProvider;
