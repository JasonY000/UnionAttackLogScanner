import '../scss/App.scss';
import React, { useState } from 'react';
import { startDetection } from '../functions/TessDetect';
import Chart from './Chart';
interface chartProp {
  [key: string]: {
    attack: number;
    damage: number;
  };
}
interface MemberPerformance {
  attack: number;
  damage: number;
}
function App() {
  const [data, setData] = useState<chartProp>({});
  async function send() {
    const data: chartProp = await startDetection();
    console.log(data);
    setData(data);
  }
  return (
    <div className='App'>
      <h1>Damage Log Scanner</h1>
      <button onClick={send} className='SubmitButton'>
        submit
      </button>
      {Object.values(data).length >= 1 && <Chart data={data} />}
    </div>
  );
}

export default App;
