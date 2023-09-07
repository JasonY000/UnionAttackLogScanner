import React from 'react';
interface RowProp {
  num: number;
  members: string[];
}
const AttackRow: React.FC<RowProp> = ({ num, members }) => {
  const liList = members.map((mem: string, i?: number) => {
    return <li key={`${mem}+${i}`}>{mem}</li>;
  });
  return (
    <div>
      <h2>{num} Attack</h2>
      <ul>{liList}</ul>
    </div>
  );
};
export default AttackRow;
