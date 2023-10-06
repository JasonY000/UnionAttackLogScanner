import '../scss/App.scss';
import axios from 'axios';
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';
import ConfigMember from './ConfigMember';
import ConfigStart from './ConfigStart';
interface settingsProp {
  Close: () => void;
  setChartDataFunc: Function;
}
type MemberType = Record<string, string>;
type DataType = Record<string, number>;

export const MemberContext = createContext<MemberType>({});

const Settings: React.FC<settingsProp> = ({ Close, setChartDataFunc }) => {
  const [members, setMembers] = useState<MemberType>({});
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const storedMembersJSON = localStorage.getItem('members');
    if (storedMembersJSON) {
      const storedMembersArray = JSON.parse(storedMembersJSON);
      setMembers(storedMembersArray);
    }
  }, []);

  function setMembersFunc(wrong: string | MemberType, correct: string) {
    if (typeof wrong === 'string') {
      setMembers({ ...members, [wrong]: correct });
    } else {
      setMembers(wrong);
    }
  }

  function setDataFunc(arr: string[]) {
    setData(arr);
  }

  function save() {
    localStorage.setItem('members', JSON.stringify(members));
  }

  function finalizeFunc() {
    localStorage.setItem('members', JSON.stringify(members));
    const body = { members: members, data: data };
    axios
      .post('http://localhost:3000/scan/finalize', body)
      .then((res) => setChartDataFunc(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className='pop-up popupbackground'></div>
      <div className='pop-up note'>
        <div className='popUpTop'>
          <button onClick={save} className='btnSub'>
            SAVE
          </button>
          <button onClick={Close} className='xBtn'>
            X
          </button>
        </div>
        <div className='mainDiv'>
          <div>
            <p>member list</p>
            <MemberContext.Provider value={members}>
              <ConfigMember setMembersFunc={setMembersFunc} />
            </MemberContext.Provider>
          </div>
          <div>
            <p>Upload logs and add members</p>
            <ConfigStart
              setMembersFunc={setMembersFunc}
              setDataFunc={setDataFunc}
            />
          </div>
        </div>
        <button onClick={finalizeFunc} className='btnSub'>
          Save & Finalize
        </button>
      </div>
    </div>
  );
};

export default Settings;
