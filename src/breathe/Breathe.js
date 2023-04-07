import './breathe.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import BigLogo from '../assets/big_icon.svg';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Breath() {

  const [timerText, setTimerText] = useState(null);

  const [inhaleSetting, setInhaleSetting] = useState(1);
  const [sustainInSetting, setSustainInSetting] = useState(0);
  const [exhaleSetting, setExhaleSetting] = useState(1);
  const [sustainOutSetting, setSustainOutSetting] = useState(0);

  const [inhale, setInhale] = useState(inhaleSetting);
  const [sustainIn, setSustainIn] = useState(sustainInSetting);
  const [exhale, setExhale] = useState(exhaleSetting);
  const [sustainOut, setSustainOut] = useState(sustainOutSetting);

  const [buttonText, setButtonText] = useState("BREATHE");
  const [breathingLoop, setBreathingLoop] = useState(false);
  const [actionText, setActionText] = useState("Waiting to start ...");

  const [timerCount, setTimerCount] = useState(0);

  const timerRef = React.useRef();

  const [firstLoop, setFirstLoop] = useState(true);

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
    timerRef.current = setInterval(() => timerFunction(), firstLoop ? 0 : 100);
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
      setTimerText(inhaleSetting - 1);
    }
  }, [inhaleSetting, sustainInSetting, exhaleSetting, sustainOutSetting]);

  function timerFunction() {
    setFirstLoop(false);
    if (breathingLoop) {
      console.log("timerCount: " + timerCount);
      console.log(inhale + " " + sustainIn + " " + exhale + " " + sustainOut);
      //  Inhale 
      if (inhale > 0 && timerCount === 0) {
        setInhale(inhale - 0.1);
        setTimerText(Math.trunc(inhale - 0.1));
        console.log(actionText);
      }

      //  Inhale reaches 0
      if (inhale < 0.01 && timerCount === 0) {
        if (sustainInSetting > 0) {
          setActionText("Retain");
          setSustainIn(sustainIn - 0.1);
          setTimerText(Math.trunc(sustainInSetting - 1));
          setTimerCount(timerCount + 1);
        } else {
          setActionText("Exhale");
          setExhale(exhale - 0.1);
          setTimerText(Math.trunc(exhaleSetting - 1));
          setTimerCount(timerCount + 2);
        }
        setInhale(0);
      }
      
      // Sustain In
      if (sustainIn > 0 && timerCount === 1) {
        setSustainIn(sustainIn - 0.1);
        setTimerText(Math.trunc(sustainIn));
        console.log(actionText);
      } 

      //  Sustain reaches 0
      if (sustainIn < 0.01 && timerCount === 1) {
        setExhale(exhale - 0.1);
        setTimerText(Math.trunc(exhaleSetting - 1));
        setActionText("Exhale");
        setTimerCount(timerCount + 1);
        setSustainIn(0);
      }
      
      // Exhale
      if (exhale > 0 && timerCount === 2) {
        setExhale(exhale - 0.1);
        setTimerText(Math.trunc(exhale));
        console.log(actionText);
      } 

      // Exhale reaches 0
      if (exhale < 0.01 && timerCount === 2) {
        if (sustainOutSetting > 0) {
          setActionText("Sustain");
          setTimerCount(timerCount + 1);
          setSustainOut(sustainOut - 0.1);
          setTimerText(Math.trunc(sustainOutSetting - 1));
          setExhale(0);
        } else {
          setActionText("Inhale");
          setTimerCount(0);
          setTimerText(Math.trunc(inhaleSetting - 1));
          setInhale(inhaleSetting);
          setSustainIn(sustainInSetting);
          setExhale(exhaleSetting);
          setSustainOut(sustainOutSetting);
          setFirstLoop(true);
        }
      }
      
      // Sustain Out
      if (sustainOut > 0 && timerCount === 3) {
        setSustainOut(sustainOut - 0.1);
        setTimerText(Math.trunc(sustainOut));
        console.log(actionText);
      }

      // Sustain Out reaches 0
      if (sustainOut < 0.01 && timerCount === 3) {
        setTimerText(Math.trunc(inhaleSetting - 1));
        setActionText("Inhale");
        setTimerCount(0);
        setInhale(inhaleSetting);
        setSustainIn(sustainInSetting);
        setExhale(exhaleSetting);
        setSustainOut(sustainOutSetting);
        setFirstLoop(true);
      }
    }
  }

  function toggleLoop() {
    if (!breathingLoop) {
      setFirstLoop(true);
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
    setTimerText(inhaleSetting - 1);
    console.log("stopping...");
  }

  function runBreathingLoop(toggle) {
    if(toggle) {
      setButtonText("STOP");
      setActionText("Inhale");
      setTimerCount(0);
      console.log("running breathing loop");
    } else {
      setButtonText("BREATHE");
      setActionText("Waiting to start ...");
      stopBreathingLoop();
    }
  }

  function pressCenter() {
    if (!breathingLoop) {
    setInhaleSetting(4);
    setSustainInSetting(0);
    setExhaleSetting(4);
    setSustainOutSetting(0);
    }
  }

  function pressCalm() {
    if (!breathingLoop) {
      setInhaleSetting(4);
      setSustainInSetting(0);
      setExhaleSetting(6);
      setSustainOutSetting(0);
    }
  }
  
  function pressBox() {
    if (!breathingLoop) {
      setInhaleSetting(4);
      setSustainInSetting(4);
      setExhaleSetting(4);
      setSustainOutSetting(4);
    }
  }

  function press478Breathing() {
    if (!breathingLoop) {
      setInhaleSetting(4);
      setSustainInSetting(7);
      setExhaleSetting(8);
      setSustainOutSetting(0);
    }
  }

  function pressPranayama1() {
    if (!breathingLoop) {
      setInhaleSetting(2);
      setSustainInSetting(0);
      setExhaleSetting(4);
      setSustainOutSetting(0);
    }
  }

  function pressPranayama2() {
    if (!breathingLoop) {
      setInhaleSetting(2);
      setSustainInSetting(4);
      setExhaleSetting(4);
      setSustainOutSetting(0);
    }
  }

  function pressPranayama3() {
    if (!breathingLoop) {
      setInhaleSetting(2);
      setSustainInSetting(6);
      setExhaleSetting(4);
      setSustainOutSetting(2);
    }
  }

  function pressWimHof() {
    window.open(
      "https://www.youtube.com/watch?v=tybOi4hjZFQ", "_blank");
  }

  let pieData = {
    labels: [
      'Inhaling ...',
      'Inhale',
      'Retaining ...',
      'Retain',
      'Exhaling ...',
      'Exhale',
      'Sustaining ...',
      'Sustain'
    ],
    datasets: [{
      label: 'Breathe Settings',
      data:
      [(inhaleSetting - inhale), inhale, 
        (sustainInSetting - sustainIn), sustainIn, 
        (exhaleSetting - exhale), exhale, 
        (sustainOutSetting - sustainOut), sustainOut],
      backgroundColor: [
        '#B8C8C8',
        '#1DBDC3',
        '#B8CCCC',
        '#00A1A5',
        '#B8D0D1',
        '#008488',
        '#BCD4D5',
        '#00696D',
      ],
      hoverOffset: 2
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    animation: {
      duration: 0
    },
    cutout: "50%",
    borderWidth: 0,
    borderJoinStyle: "bevel",
    borderColor: "#BAFCFF"
  }



  return (
    <div className="breath">
      <div className="title-container">
        <h1>Unplugg</h1>
        <img src={BigLogo} alt = "big logo" className="main-icon" />
      </div>
      <div className="info-container">
        <div className="pie-chart">
          <Pie data={pieData} options={pieOptions}/>
          <div className="inner-timer">
            {breathingLoop && <div><span>{ timerText }</span><div>{ actionText }</div></div> }
          </div>
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
                <th className="float-left">Retain</th>
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
      </div>
      <div className="center">
        <button className="start-button" onClick={toggleLoop}>{buttonText}</button>
      </div>
      <div className="presets-container">
        <div className="presets">
          <h1 className="presets-text">Presets</h1>
          <div className="presets-buttons">
            <div className="buttons-row">
              <button className="button preset-button" onClick={pressCenter}>
                CENTER
              </button>
              <button className="button preset-button" onClick={pressBox}>
                BOX
              </button>
              <button className="button preset-button" onClick={pressCalm}>
                CALM
              </button>
            </div>
            <div className="buttons-row">
              <button className="button preset-button" onClick={press478Breathing}>
                478 BREATHING
              </button>
              <button className="button preset-button" onClick={pressPranayama1}>
                PRANAYAMA 1
              </button>
              <button className="button preset-button" onClick={pressPranayama2}>
                PRANAYAMA 2
              </button>
            </div>
            <div className="buttons-row">
              <button className="button preset-button" onClick={pressPranayama3}>
                PRANAYAMA 3
              </button>
              <button className="button preset-button" onClick={pressWimHof}>
                WIM HOF (Video)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="description-container">
        <span>
          Breathwork is a powerful tool.&nbsp;&nbsp;It provides numerous benefits for both their physical 
          and mental health.&nbsp;&nbsp;By focusing on deep, intentional breathing, individuals can 
        </span>
        <span className="highlighted-text">
          &nbsp;reduce stress and anxiety, improve mental clarity and focus, and even boost their immune system.
        </span>
          &nbsp;&nbsp;Additionally, breathwork can help to counteract the negative effects of sitting for prolonged 
          periods, which can be common when working from home, making it an excellent addition to 
          any remote worker's self-care toolkit.
      </div>
    </div>
  );
}

export default Breath;
