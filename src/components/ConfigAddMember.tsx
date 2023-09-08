import '../scss/App.scss';
import { AddMemberProp } from '../Interface/ReactInterface';
import React, { useState, useEffect, useRef } from 'react';

const AddMemeberComp: React.FC<AddMemberProp> = ({ members, setMembers }) => {
  const inputName = useRef<HTMLInputElement | null>(null);
  function addMember() {
    const newSet = new Set(members);
    if (inputName.current) {
      if (!newSet.has(inputName.current.value)) {
        newSet.add(inputName.current.value);
        setMembers(newSet);
        inputName.current.value = '';
      }
    }
  }
  return (
    <div>
      <div>
        <input placeholder='name' ref={inputName}></input>
        <button onClick={addMember}>add</button>
        <button onClick={addMember}>save</button>
      </div>
      <ul>
        {Array.from(members).map((name) => {
          return <li>{`${name}`}</li>;
        })}
      </ul>
    </div>
  );
};

export default AddMemeberComp;
