import '../scss/App.scss';
import React, {useState, useEffect} from 'react';
import {chartProp} from '../Interface/ReactInterface';
// import { startDetection } from '../functions/TessDetect';
import Chart from './DataBoard';
import Settings from './Settings';

function App() {
  const [Chartdata, setChartData] = useState<chartProp>({});
  const [configUp, setConfigUp] = useState<boolean>(false);

  function toggle() {
    setConfigUp(!configUp);
    return;
  }
  function setChartDataFunc(charData: chartProp) {
    setChartData(charData);
  }
  return (
    <div className='App'>
      <div className='circleGlow'></div>
      <div className='circleGlow bottomLeft'></div>
      <div className='leftDiv'>
        <div className='h1Div'>
          <h1 className='n1'>Damage</h1>
          <h1 className='n2'>Log</h1>
          <h1 className='n3'>Scanner</h1>
        </div>
      </div>

      <div className='rightDiv'>
        <button onClick={toggle} className='btnSub SubmitButton'>
          Get Started
        </button>
      </div>
      {Object.values(Chartdata).length >= 1 && <Chart data={Chartdata} />}
      {configUp && (
        <Settings ClosePop={toggle} setChartDataFunc={setChartDataFunc} />
      )}
    </div>
  );
}

export default App;
