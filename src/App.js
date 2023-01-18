import './app.css';
import { default as Breath } from './breathe/Breathe';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';

function App() {

  const [menu, setMenu] = useState(true);

  return (
    <div className="App">
      <div className="header">
        <div className="menu-icon-container" onClick={() => menu ? setMenu(false) : setMenu(true)}>
          <FiMenu className="menu-icon"/>
        </div>
        <div className="app-title-container">
          <h2 className="app-title">Breathing App</h2>
        </div>
      </div>
      <div className="menu" style={menu ? {display: "block"} : {display: "none"}}>
        <div className="menu-item-container">
          <div className="menu-item">
            Techniques
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item">
            Resources
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item">
            Presets
          </div>
        </div>
        <div className="menu-item-container">
          <div className="menu-item">
            Learn
          </div>
        </div>
        <div className="menu-footer">
          <div className="menu-footer-items">
            <div className="menu-item-container">
              <div className="menu-item">
                About us
              </div>
            </div>
            <div className="menu-item-container">
              <div className="menu-item">
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
      <Breath />
    </div>
  );
}

export default App;
