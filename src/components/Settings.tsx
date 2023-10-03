import '../scss/App.scss';
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
}
type MemberType = Record<string, string>;
type DataType = Record<string, number>;

export const MemberContext = createContext<MemberType>({});

const Settings: React.FC<settingsProp> = ({ Close }) => {
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

  return (
    <div>
      <div className='pop-up popupbackground'></div>
      <div className='pop-up note'>
        <div className='popUpTop'>
          <button onClick={save}>save members</button>
          <button onClick={Close}>X</button>
        </div>
        <div className='mainDiv'>
          <MemberContext.Provider value={members}>
            <ConfigMember setMembersFunc={setMembersFunc} />
          </MemberContext.Provider>
          <ConfigStart
            setMembersFunc={setMembersFunc}
            setDataFunc={setDataFunc}
          />
        </div>
        <button>Finalize</button>
      </div>
    </div>
  );
};

export default Settings;
