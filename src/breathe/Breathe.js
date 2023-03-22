import './breathe.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import BigLogo from '../assets/big_icon.svg';

function Breath() {

  const [timerText, setTimerText] = useState(null);


  const [inhale, setInhale] = useState(0);
  const [sustainIn, setSustainIn] = useState(0);
  const [exhale, setExhale] = useState(0);
  const [sustainOut, setSustainOut] = useState(0);

  const [inhaleSetting, setInhaleSetting] = useState(1);
  const [sustainInSetting, setSustainInSetting] = useState(0);
  const [exhaleSetting, setExhaleSetting] = useState(1);
  const [sustainOutSetting, setSustainOutSetting] = useState(0);

  const [buttonText, setButtonText] = useState("BREATHE");
  const [breathingLoop, setBreathingLoop] = useState(false);
  const [actionText, setActionText] = useState("Waiting to start ...");

  const [inhaleTimerTime, setInhaleTimerTime] = useState(0);

  const [timerCount, setTimerCount] = useState(0);

  const timerRef = React.useRef();

  function handleChange(event, code) {
    if (!breathingLoop) {
      switch(code) {
        case "inhale": setInhaleSetting(parseInt(event.target.value));
          break;
        case "sustainIn": setSustainInSetting(parseInt(event.target.value));
          break;
        case "exhale": setExhaleSetting(parseInt(event.target.value));
          break;
        case "sustainOut": setSustainOutSetting(parseInt(event.target.value));
          break;
        default: console.log(parseInt(event.target.value));
      }
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (breathingLoop) {
        console.log("timerCount: " + timerCount);
        console.log(inhale + " " + sustainIn + " " + exhale + " " + sustainOut);
        //  Inhale 
        if (inhale > 0 && timerCount === 0) {
          setInhale(inhale - 1);
          setTimerText(inhale - 1);
          console.log(actionText);
          if (inhale === 1) {
            setInhale(inhaleSetting)
            if (sustainInSetting > 0) {
              setActionText("Sustaining");
              setTimerText(sustainInSetting);
              setTimerCount(timerCount + 1);
            } else {
              setActionText("Exhaling");
              setTimerText(exhaleSetting);
              setTimerCount(timerCount + 2);
            }
          }
        //  Inhale reaches 0
        }
        
        if (sustainIn > 0 && timerCount === 1) {
          setSustainIn(sustainIn - 1);
          setTimerText(sustainIn - 1);
          console.log(actionText);
          if (sustainIn === 1) {
            setSustainIn(sustainInSetting)
            setTimerText(exhaleSetting);
            setActionText("Exhaling");
            setTimerCount(timerCount + 1);
          }
        //  Sustain reaches 0
        } 
        
        if (exhale > 0 && timerCount === 2) {
          setExhale(exhale - 1);
          setTimerText(exhale - 1);
          console.log(actionText);
          if (exhale === 1) {
            setExhale(exhaleSetting)
            if (sustainOutSetting > 0) {
              setActionText("Sustaining");
              setTimerCount(timerCount + 1);
              setTimerText(sustainOutSetting);
            } else {
              setActionText("Inhaling");
              setTimerCount(0);
              setTimerText(inhaleSetting);
            }
          }
        } 
        
        if (sustainOut > 0 && timerCount === 3) {
          setSustainOut(sustainOut - 1);
          setTimerText(sustainOut - 1);
          console.log(actionText);
          if (sustainOut === 1) {
            setSustainOut(sustainOutSetting)
            setTimerText(inhaleSetting);
            setActionText("Inhaling");
            setTimerCount(0);
          }
        } 
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  });

  useEffect(() => {
    setActionText(actionText);
  }, [actionText]);

  useEffect(() => {
    if (!breathingLoop) {
      setInhale(inhaleSetting);
      setSustainIn(sustainInSetting);
      setExhale(exhaleSetting);
      setSustainOut(sustainOutSetting);
      setTimerText(inhaleSetting);
    }
  }, [inhaleSetting, sustainInSetting, exhaleSetting, sustainOutSetting]);

  function toggleLoop() {
    if (!breathingLoop) {
      if (inhaleSetting > 0 && exhaleSetting > 0) {
        setBreathingLoop(true);
        runBreathingLoop(true);
        } else {
          alert("Inhale and Exhale must have values greater than 0")
        }
    } else {
      setBreathingLoop(false);
      runBreathingLoop(false);
    }
  }

  function stopBreathingLoop() {
    clearInterval(timerRef.current);
    setInhale(inhaleSetting);
    setSustainIn(sustainInSetting);
    setExhale(exhaleSetting);
    setSustainOut(sustainOutSetting);
    setTimerText(inhaleSetting);
    console.log("stopping...");
  }

  function runBreathingLoop(toggle) {
    if(toggle) {
      setButtonText("STOP");
      setActionText("Inhaling");
      setTimerCount(0);
      console.log("running breathing loop")
    } else {
      setButtonText("BREATHE");
      setActionText("Waiting to start ...");
      stopBreathingLoop();
    }
  }

  function logMe() {
    console.log("breathingLoop: " + breathingLoop);
  }

  return (
    <div className="breath">
      <div className="title-container">
        <h1>Unplugg</h1>
        <img src={BigLogo} alt = "big logo" className="main-icon" />
      </div>
      <div className="counters">
        <table>
          <tbody>
            <tr className="counters-options">
              <th className="float-left">Inhale</th>
              <th className="float-right">
                <input className="counters-input" type="number" min="1" max="120" value={inhaleSetting} onChange={(event) => handleChange(event, "inhale")}></input>
              </th>
            </tr>
            <tr className="counters-options">
              <th className="float-left">Sustain</th>
              <th className="float-right">
                <input className="counters-input" type="number" min="0" max="120" value={sustainInSetting} onChange={(event) => handleChange(event, "sustainIn")}></input>
              </th>
            </tr>
            <tr className="counters-options">
              <th className="float-left">Exhale</th>
              <th className="float-right">
                <input className="counters-input" type="number" min="1" max="120" value={exhaleSetting} onChange={(event) => handleChange(event, "exhale")}></input>
              </th>
            </tr>
            <tr className="counters-options">
              <th className="float-left">Sustain</th>
              <th className="float-right">
                <input className="counters-input" type="number" min="0" max="120" value={sustainOutSetting} onChange={(event) => handleChange(event, "sustainOut")}></input>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="center">
        <button className="start-button" onClick={toggleLoop}>{buttonText}</button>
      </div>
      {breathingLoop && 
        <div>
          <div className="action-text">{actionText}</div>
          <div className="timer-text">Time: {timerText}</div>
        </div>
      }
      <div className="presets-container">
        <div className="presets">
          <h1 className="presets-text">Presets</h1>
        </div>
      </div>
    </div>
  );
}

export default Breath;
