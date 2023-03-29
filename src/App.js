import './App.css';
import { default as Breath } from './breathe/Breathe';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';
import Logo from './assets/icon.svg';
import { LoginSignup } from './login_signup/LoginSignup';

function App() {

  const [menu, setMenu] = useState(true);

  const [openSignup, setOpenSignup] = useState(false);

  return (
    <div className="App">
      <div className="header" onClick={ () => openSignup && setOpenSignup(false)}>
        <div className="left-info">
          <div className="menu-icon-container" onClick={() => menu ? setMenu(false) : setMenu(true)}>
            <FiMenu className="menu-icon"/>
          </div>
          <div className="app-title-container">
            <h2 className="app-title">Unplugg</h2>
            <img src={Logo} alt="logo" className="header-icon" />
          </div>
        </div>
        <div className="right-info">
          <button className="button login-button" onClick={() => setOpenSignup(true)}>
            Login
          </button>
          <button className="button register-button">
            Register
          </button>
        </div>
      </div>
      <div className="menu" style={menu ? {width: "0px", border: "none"} : {width: "125px"}}>
        <div className="menu-item-container">
          <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
            Saved Routines
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
            History
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
            Resources
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
            Placeholder
          </div>
        </div>
        <div className="menu-footer">
          <div className="menu-footer-items">
            <div className="menu-item-container">
              <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
                About us
              </div>
            </div>
            <div className="menu-item-container">
              <div className="menu-item" style={menu ? {visibility: "hidden"} : {visibility: "visible", transitionDelay: "0.6s", transitionProperty: "visibility"}}>
                Login/logout
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginSignup open = { openSignup } onClose = {() => setOpenSignup(false)}/>
      <Breath />
    </div>
  );
}

export default App;
