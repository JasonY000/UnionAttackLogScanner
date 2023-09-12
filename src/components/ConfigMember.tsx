import '../scss/App.scss';
// import { AddMemberProp } from '../Interface/ReactInterface';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const AddMemeberComp = () => {
  const [members, setMembers] = useState<string[]>([]);
  const inputName = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const storedMembersJSON = localStorage.getItem('members');
    if (storedMembersJSON) {
      const storedMembersArray = JSON.parse(storedMembersJSON) as string[];
      setMembers(storedMembersArray);
    }
  }, []);

  function addMember() {
    const newSet = new Set(members);
    if (inputName.current && inputName.current.value !== '') {
      if (!newSet.has(inputName.current.value)) {
        newSet.add(inputName.current.value);
        setMembers(Array.from(newSet));
        inputName.current.value = '';
        //localStorage.setItem('members', JSON.stringify(newSet));
      }
    }
  }
  function clickDelete(event: any) {
    const target = event.target.parentElement.id;
    const newSet = new Set(members);
    newSet.delete(target);
    setMembers(Array.from(newSet));
    //localStorage.setItem('members', JSON.stringify(Array.from(newSet)));
  }
  function save() {
    const sort = [...members].sort();
    localStorage.setItem('members', JSON.stringify(sort));
  }
  return (
    <div className='configMember configRow'>
      <div className=''>
        <input placeholder='name' ref={inputName}></input>
        <button onClick={addMember}>add</button>
        <button onClick={save}>save</button>
        {/* <button onClick={saveMember}>save</button> */}
      </div>
      <ul>
        {Array.from(members).map((name) => {
          return (
            <div key={name} id={`${name}`}>
              {`${name}`} <button onClick={clickDelete}>x </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AddMemeberComp;
