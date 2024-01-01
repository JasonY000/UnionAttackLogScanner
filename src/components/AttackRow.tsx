import React from 'react';
import {RowProp} from '../Interface/ReactInterface';
const AttackRow: React.FC<RowProp> = ({num, members}) => {
  const liList = members.map((mem: string, i?: number) => {
    return <li key={`${mem}+${i}`}>{mem}</li>;
  });
  return (
    <div className='attRow'>
      <h2>{num} Attack</h2>
      <ul>{liList}</ul>
    </div>
  );
};
export default AttackRow;
