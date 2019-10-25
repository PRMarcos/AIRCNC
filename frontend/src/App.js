import React, { useContext } from 'react';
import { AuthContext } from "./context/authProvider"

import { LogOut } from "./services/authentication";

import Routes from "./routes"

import logo from "./assets/logo.svg";
import './App.css';

function App() {
  const { currentUser } = useContext(AuthContext);


  function handleLogOut() {
    LogOut();
  }

  return (


    <>

      <header id="header" className={!currentUser ? "hideheader" : ""}>
        {currentUser &&
          (
            <>
              <h4>Bem vindo <strong>{currentUser.displayName}</strong></h4>
              <button className="btn" onClick={handleLogOut}>Logout</button>
            </>
          )}
      </header>


      <div className="container">
        <img src={logo} alt="Logo AiRcnc" />
        <div className="content">
          <Routes />
        </div>
      </div>
    </>

  );
}

export default App;
