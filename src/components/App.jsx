import '../scss/App.scss';
import React, { useState } from 'react';
import { startDetection } from '../functions/TessDetect.js';
import Chart from './Chart.jsx';
function App() {
  const [data, setData] = useState({});
  async function send() {
    const data = await startDetection();
    setData(data);
  }
  console.log(Object.values(data).length < 1);
  return (
    <div className='App'>
      <h1>ARGO damage tracker</h1>
      <button onClick={send} className='SubmitButton'>
        submit
      </button>
      {Object.values(data).length > 1 && <Chart data={data} />}
    </div>
  );
}

export default App;
