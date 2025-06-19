import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useContext, createContext, useEffect } from 'react';
import "./App.css";

import Login from './Login';
import Register from './Register';

interface UserContextType {
  contextUser: any;
  setcontextUser: React.Dispatch<React.SetStateAction<any>>;
}

export const userContext = createContext<UserContextType >(null!);

function App() {
  const [contextUser, setcontextUser] = useState(() => {
    const savedUser = localStorage.getItem("contextUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

useEffect(() => {
    if (contextUser) {
      localStorage.setItem("contextUser", JSON.stringify(contextUser));
    } else {
      localStorage.removeItem("contextUser");
    }
  }, [contextUser]);


  return (
    <userContext.Provider value={{ contextUser, setcontextUser }}>
  
     
      
     
      <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<h2>Home Page</h2>} />
      </Routes>


    </userContext.Provider>
  );
}

export default App;
