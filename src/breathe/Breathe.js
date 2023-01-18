import './breathe.css';
import React from 'react';

function Breath() {

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
              <input className="counters-input" type="number"></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Sustain</th>
            <th className="float-right">
              <input className="counters-input" type="number"></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Exhale</th>
            <th className="float-right">
              <input className="counters-input" type="number"></input>
            </th>
          </tr>
          <tr className="counters-options">
            <th className="float-left">Sustain</th>
            <th className="float-right">
              <input className="counters-input" type="number"></input>
            </th>
          </tr>
        </table>
      </div>
      <div className="center">
        <button className="start-button">Start</button>
      </div>
    </div>
  );
}

export default Breath;
