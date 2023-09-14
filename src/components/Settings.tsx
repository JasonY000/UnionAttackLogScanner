import '../scss/App.scss';
import React, { useState, useEffect, useRef } from 'react';
import AddMemeberComp from './ConfigMember';
import ConfigMemberList from './ConfigStart';
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
          <ConfigMemberList />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
