import './breathe.css';
import React, { useState } from 'react';
import { useEffect } from 'react';

function Breath() {

  const [timerText, setTimerText] = useState(null);


  const [inhale, setInhale] = useState(0);
  const [sustainIn, setSustainIn] = useState(0);
  const [exhale, setExhale] = useState(0);
  const [sustainOut, setSustainOut] = useState(0);

  const [inhaleSetting, setInhaleSetting] = useState(0);
  const [sustainInSetting, setSustainInSetting] = useState(0);
  const [exhaleSetting, setExhaleSetting] = useState(0);
  const [sustainOutSetting, setSustainOutSetting] = useState(0);

  const [buttonText, setButtonText] = useState("Start");
  const [breathingLoop, setBreathingLoop] = useState(false);
  const [actionText, setActionText] = useState("Waiting to start ...");

  const [inhaleTimerTime, setInhaleTimerTime] = useState(0);

  const [timerCount, setTimerCount] = useState(0);

  const timerRef = React.useRef();

  function handleChange(event, code) {
    if (!breathingLoop) {
      switch(code) {
        case "inhale": setInhaleSetting(event.target.value);
          break;
        case "sustainIn": setSustainInSetting(event.target.value);
          break;
        case "exhale": setExhaleSetting(event.target.value);
          break;
        case "sustainOut": setSustainOutSetting(event.target.value);
          break;
        default: console.log(event.target.value);
      }
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (breathingLoop) {
        //  Inhale 
        if (inhale > 0 && timerCount === 0) {
          setInhale(inhale - 1);
          setTimerText(inhale - 1);
          setActionText("Inhaling");
        //  Inhale reaches 0
        } else if (inhale === 0 && timerCount === 0) {
          setInhale(inhaleSetting);
          setTimerText(sustainInSetting);
          setActionText("Sustaining");
          setTimerCount(timerCount + 1);
        //  Sustain
        } else if (sustainIn > 0 && timerCount === 1) {
          setSustainIn(sustainIn - 1);
          setTimerText(sustainIn - 1);
        //  Sustain reaches 0
        } else if (sustainIn === 0 && timerCount === 1) {
          setSustainIn(sustainInSetting);
          setTimerText(exhaleSetting);
          setActionText("Exhaling");
          setTimerCount(timerCount + 1);
        //  Exhale
        } else if (exhale > 0 && timerCount === 2) {
          setExhale(exhale - 1);
          setTimerText(exhale - 1);
        } else if (exhale === 0 && timerCount === 2) {
          setExhale(exhaleSetting);
          setTimerText(sustainOutSetting);
          setActionText("Sustaining");
          setTimerCount(timerCount + 1);
        } else if (sustainOut > 0 && timerCount === 3) {
          setSustainOut(sustainOut - 1);
          setTimerText(sustainOut - 1);
        } else if (sustainOut === 0 && timerCount === 3) {
          setSustainOut(sustainOutSetting);
          setTimerText(inhaleSetting);
          setTimerCount(0);
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
      setBreathingLoop(true);
      runBreathingLoop(true);
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
      setButtonText("Stop");
      setActionText("Inhaling");
      setTimerCount(0);
      console.log("running breathing loop")
    } else {
      setButtonText("Start");
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
        <h1>Breathe</h1>
      </div>
      <div className="counters">
        <table>
          <tr className="counters-options">
            <th className="float-left">Inhale</th>
            <th className="float-right">
              <input className="counters-input" type="number" value={inhaleSetting} onChange={(event) => handleChange(event, "inhale")}></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Sustain</th>
            <th className="float-right">
              <input className="counters-input" type="number" value={sustainInSetting} onChange={(event) => handleChange(event, "sustainIn")}></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Exhale</th>
            <th className="float-right">
              <input className="counters-input" type="number" value={exhaleSetting} onChange={(event) => handleChange(event, "exhale")}></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Sustain</th>
            <th className="float-right">
              <input className="counters-input" type="number" value={sustainOutSetting} onChange={(event) => handleChange(event, "sustainOut")}></input>
            </th>
          </tr>
        </table>
      </div>
      <div className="center">
        <button className="start-button" onClick={toggleLoop}>{buttonText}</button>
      </div>
      <div>
        <div className="action-text">{actionText}</div>
      </div>
      <div>
        <div className="timer-text">Time for next action: {timerText}</div>
      </div>
    </div>
  );
}

export default Breath;
