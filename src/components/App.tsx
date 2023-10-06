import '../scss/App.scss';
import React, { useState, useEffect } from 'react';
import { chartProp } from '../Interface/ReactInterface';
import { startDetection } from '../functions/TessDetect';
import Chart from './DataBoard';
import Settings from './Settings';

function App() {
  const [Chartdata, setChartData] = useState<chartProp>({});
  const [configUp, setConfigUp] = useState<boolean>(false);

  async function send() {
    const data: chartProp = await startDetection();
    console.log(data);
    setChartData(data);
  }
  function setConfigUpFunc() {
    setConfigUp(!configUp);
    return;
  }
  function setChartDataFunc(charData: chartProp) {
    setChartData(charData);
  }
  return (
    <div className='App'>
      <h1>Damage Log Scanner</h1>
      <div>
        <button onClick={setConfigUpFunc} className='SubmitButton btnSub'>
          Get Started
        </button>
      </div>
      {Object.values(Chartdata).length >= 1 && <Chart data={Chartdata} />}
      {configUp && (
        <Settings Close={setConfigUpFunc} setChartDataFunc={setChartDataFunc} />
      )}
    </div>
  );
}

export default App;
