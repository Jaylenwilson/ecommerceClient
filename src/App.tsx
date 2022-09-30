import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

export type Props = {
  sessionToken: string | null,
  updateToken: (newToken: string, uName: string, rName: string) => void,
  clearToken: () => void,
  userId: string,
  firstname: string,
  setFirstName: () => void,
  setSessionToken: (newToken: string | null) => void,
  setUserId: (user: string) => void,
  role: string,
  setRole: () => void
}


const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("")
  const [userId, setUserId] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [role, setRole] = useState<string>("")

  const updateToken = (newToken: string, uName: string, rName: string) => {
    localStorage.setItem("Authorization", newToken);
    localStorage.setItem("firstname", uName);
    localStorage.setItem("role", rName);
    setSessionToken(newToken)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
