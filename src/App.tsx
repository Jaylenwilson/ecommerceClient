import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Sidebar } from "./componnents/Navbars/SideBar";
import { useNavigate } from 'react-router-dom'
import BasicLogin from "./Auth/Basiclogin";


export type Props = {
  sessionToken: string | null,
  updateToken: (newToken: string, uName: string, rName: string) => void,
  clearToken: () => void,
  userId: string,
  firstName: string,
  setFirstName: (username: string) => void,
  setSessionToken: (newToken: string | null) => void,
  setUserId: (user: string) => void,
  role: string,
  setRole: (role: string) => void
}


const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("")
  const [userId, setUserId] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const navigate = useNavigate()


  const updateToken = (newToken: string, uName: string, rName: string) => {
    localStorage.setItem("Authorization", newToken);
    localStorage.setItem("firstname", uName);
    localStorage.setItem("role", rName);
    setSessionToken(newToken)
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setUserId('')
    navigate('/')
  }
  return (
    <>
      <Sidebar sessionToken={sessionToken} firstName={firstName} role={role} clearToken={clearToken} />
      <Routes>

        <Route>
          <Route path='/' element={
            <BasicLogin sessionToken={sessionToken} setFirstName={setFirstName} setUserId={setUserId} userId={userId} setSessionToken={setSessionToken} updateToken={updateToken} role={role} setRole={setRole} firstName={firstName} />
          } />
        </Route>


      </Routes>
    </>
  );
}

export default App;
