import React from 'react';
import { members } from '../functions/memberList';
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

const Chart = (props) => {
  // turning member list into array
  const attackTrack = Array.from(members);
  // data to feed to bar chart
  let damageDataArr = [];
  // members who attacked atleast once
  let whoAtt = [];
  // track who attacked how many times
  const attAmount = [[], [], [], []];
  for (const [key, value] of Object.entries(props.data)) {
    damageDataArr.push({ name: key, damage: value.damage });
    attAmount[value.attack].push(key);
    whoAtt.push(key);
    delete attackTrack[key];
  }
  damageDataArr = damageDataArr.sort((a, b) => b.damage - a.damage);
  // find out who attacked 0 times
  whoAtt = new Set(whoAtt);
  for (const member of attackTrack) {
    if (!whoAtt.has(member)) attAmount[0].push(member);
  }

  return (
    <div className='recharts-responsive-container'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={1000}
          height={300}
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
          <XAxis dataKey='name' fontSize={15} angle={60} textAnchor='start' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='damage' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
      <div className='AttackRow'>
        <AttackRow key={'Att0'} num={0} members={attAmount[0]} />
        <AttackRow key={'Att1'} num={1} members={attAmount[1]} />
        <AttackRow key={'Att2'} num={2} members={attAmount[2]} />
      </div>
    </div>
  );
};
export default Chart;
