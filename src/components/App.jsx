import '../scss/App.scss';
import React, { useState } from 'react';
import { startDetection } from '../functions/TessDetect.js';
import Chart from './Chart.jsx';
function App() {
  const [data, setData] = useState({});
  async function send() {
    const data = await startDetection();
    console.log(data);
    setData(data);
  }
  return (
    <div className='App'>
      <h1>Damage Log Scanner</h1>
      <button onClick={send} className='SubmitButton'>
        submit
      </button>
      {Object.values(data).length > 1 && <Chart data={data} />}
    </div>
  );
}

export default App;
