import React from 'react';
import { members } from '../functions/memberList';
import { DataForChart } from '../Interface/ReactInterface';
import AttackRow from './AttackRow';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
interface chartProp {
  data: {
    [key: string]: {
      attack: number;
      damage: number;
    };
  };
}
const Chart: React.FC<chartProp> = ({ data }) => {
  // turning member list into array
  const attackTrack: string[] = Array.from(members);
  // data to feed to bar chart
  let damageDataArr: DataForChart[] = [];
  // members who attacked atleast once
  let whoAtt: string[] = [];
  // track who attacked how many times
  const attAmount: string[][] = [[], [], []];
  for (const [key, value] of Object.entries(data)) {
    damageDataArr.push({ name: key, damage: value.damage });
    if (value.attack < 3) attAmount[value.attack].push(key);
    whoAtt.push(key);
  }
  damageDataArr = damageDataArr.sort((a, b) => b.damage - a.damage);
  // find out who attacked 0 times
  const setWhoAtt: Set<string> = new Set(whoAtt);
  for (const member of attackTrack) {
    if (!setWhoAtt.has(member)) attAmount[0].push(member);
  }
  console.log(damageDataArr);
  return (
    <div>
      <div className='recharts-responsive-container'>
        <ResponsiveContainer width='90%' height='90%'>
          <BarChart
            width={1000}
            height={400}
            barGap={0}
            data={damageDataArr}
            margin={{
              top: 15,
              right: 20,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' fontSize={18} angle={60} textAnchor='start' />
            <YAxis />
            <Tooltip />
            <Legend layout='horizontal' verticalAlign='top' align='center' />
            <Bar dataKey='damage' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='AttackRow'>
        <AttackRow key={'Att0'} num={0} members={attAmount[0]} />
        <AttackRow key={'Att1'} num={1} members={attAmount[1]} />
        <AttackRow key={'Att2'} num={2} members={attAmount[2]} />
      </div>
    </div>
  );
};
export default Chart;
