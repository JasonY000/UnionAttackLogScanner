import '../scss/App.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MemberContext } from './Settings';
import { ConfigMember } from '../Interface/ReactInterface';

// Define the type for members
type MemberType = Record<string, string>;

const AddMemberComp: React.FC<ConfigMember> = ({ setMembersFunc }) => {
  // Use useContext with the specified type
  const members = useContext<MemberType>(MemberContext);
  const [list, setList] = useState<JSX.Element[]>([]);

  const inputName = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log('useeffect', members);
    const elements = Object.entries(members).map(([key, val]) => {
      let str = key;
      if (key !== val) str += ` => ${val}`;
      return (
        <div key={`${key}selected`}>
          {str} <button onClick={() => clickDelete(key)}>x</button>
        </div>
      );
    });
    setList(elements);
  }, [members]);

  function clickDelete(keyToDelete: string) {
    const newList = { ...members };
    delete newList[keyToDelete];
    setMembersFunc(newList);
  }

  return (
    <div className='configMember configRow'>
      <ul>{list}</ul>
    </div>
  );
};

export default AddMemberComp;
