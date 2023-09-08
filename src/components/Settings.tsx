import '../scss/App.scss';
import React, { useState, useEffect, useRef } from 'react';
import AddMemeberComp from './ConfigMember';
interface settingsProp {
  Close: () => void;
}
const Settings: React.FC<settingsProp> = ({ Close }) => {
  // const [members, setMembers] = useState<Set<string>>(new Set<string>());
  // function setMembersFunc(set: Set<string>) {
  //   setMembers(set);
  //
  // }

  return (
    <div>
      <div className='pop-up popupbackground'></div>
      <div className='pop-up note'>
        <div className='popUpTop'>
          <h1>Config</h1>
          <button onClick={Close}>X</button>
        </div>
        <div className='mainDiv'>
          <AddMemeberComp />
          <div>
            <input placeholder='name'></input>
            <button>add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
