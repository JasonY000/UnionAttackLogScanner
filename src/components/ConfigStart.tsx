import '../scss/App.scss';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { ConfigStart } from '../Interface/ReactInterface';

const ConfigMemberList: React.FC<ConfigStart> = ({
  setMembersFunc,
  setDataFunc,
}) => {
  const [file, setFile] = useState<File[] | null>(null);
  const [resData, setResData] = useState<[][]>([]);

  const sendConfig = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('img', file[i]);
    }
    axios
      .post('http://localhost:3000/scan/upload', formData)
      .then((res) => {
        setDataFunc(res.data[1][0]);
        setResData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const add = (target: string) => {
    console.log(target);
    setMembersFunc(target, target);
  };

  const changeAdd = (target: string) => {
    console.log('changeAdd');
    const result = prompt('Please enter corrected name.');
    console.log(result);
    setMembersFunc(target, result);
  };

  return (
    <div className='configMember configRow2'>
      <div className=''>
        <input
          type='file'
          accept='image/png, image/jpeg'
          onChange={(e) => {
            if (e.target.files) setFile(Array.from(e.target.files));
          }}
          multiple
        />
        <input type='submit' onClick={sendConfig}></input>
      </div>
      <ul>
        {resData[0]?.map((name) => {
          return (
            <li key={name}>
              <div id={`${name}`}>
                <div className='liBtnPad'>
                  <button onClick={() => add(name)}>add </button>
                  <button onClick={() => changeAdd(name)}>Change & Add </button>
                </div>
                {`${name}`}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConfigMemberList;
