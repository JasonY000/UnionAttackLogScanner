import '../scss/App.scss';
import React, { useState, useEffect } from 'react';
import { chartProp } from '../Interface/ReactInterface';
import { startDetection } from '../functions/TessDetect';
import Chart from './DataBoard';
import Settings from './Settings';

function App() {
  const [data, setData] = useState<chartProp>({});
  const [configUp, setConfigUp] = useState<boolean>(true);
  async function send() {
    const data: chartProp = await startDetection();
    console.log(data);
    setData(data);
  }
  function setConfigUpFunc() {
    setConfigUp(!configUp);
    return;
  }
  return (
    <div className='App'>
      <h1>Damage Log Scanner</h1>
      <div>
        <button onClick={send} className='SubmitButton'>
          submit
        </button>
        <button onClick={setConfigUpFunc} className='SubmitButton'>
          Config
        </button>
      </div>
      {Object.values(data).length >= 1 && <Chart data={data} />}
      {configUp && <Settings Close={setConfigUpFunc} />}
    </div>
  );
}

export default App;
