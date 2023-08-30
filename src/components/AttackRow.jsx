import React from 'react';
const AttackRow = (props) => {
  const liList = props.members.map((mem, i) => {
    return <li key={`${mem}+${i}`}>{mem}</li>;
  });
  return (
    <div>
      <h2>{props.num} Attack</h2>
      <ul>{liList}</ul>
    </div>
  );
};
export default AttackRow;
