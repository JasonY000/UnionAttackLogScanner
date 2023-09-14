import '../scss/App.scss';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';

const ConfigMemberList = () => {
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
        setResData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const add = (event: any) => {
    const target = event.target.parentElement.id;
    console.log(target);
  };
  const changeAdd = () => {
    console.log('changeAdd');
  };
  return (
    <div className='configMember configRow2'>
      <div className=''>
        <input
          type='file'
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
            <li>
              <div key={name} id={`${name}`}>
                <div className='liBtnPad'>
                  <button onClick={add}>add </button>
                  <button onClick={changeAdd}>Change & Add </button>
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
