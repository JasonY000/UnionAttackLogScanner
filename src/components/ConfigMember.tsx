import '../scss/App.scss';
// import { AddMemberProp } from '../Interface/ReactInterface';
import React, { useState, useEffect, useRef } from 'react';

const AddMemeberComp = () => {
  const [members, setMembers] = useState<Set<string>>(new Set<string>());
  const inputName = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const storedMembersJSON = localStorage.getItem('members');
    if (storedMembersJSON) {
      const storedMembersArray = JSON.parse(storedMembersJSON) as string[];
      const membersSet = new Set(storedMembersArray);
      setMembers(membersSet);
    }
  }, []);

  function addMember() {
    const newSet = new Set(members);
    if (inputName.current) {
      if (!newSet.has(inputName.current.value)) {
        newSet.add(inputName.current.value);
        setMembers(newSet);
        inputName.current.value = '';
        localStorage.setItem('members', JSON.stringify(Array.from(newSet)));
      }
    }
  }
  function clickDelete(event: any) {
    const target = event.target.parentElement.id;
    const newSet = new Set(members);
    newSet.delete(target);
    setMembers(newSet);
    localStorage.setItem('members', JSON.stringify(Array.from(newSet)));
  }
  return (
    <div className='configMember configRow'>
      <div className=''>
        <input placeholder='name' ref={inputName}></input>
        <button onClick={addMember}>add</button>
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
