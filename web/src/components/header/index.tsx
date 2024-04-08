import { memo, useContext, useState } from 'react';
import { Button } from 'antd';
import { RootContext } from '../../context';
import { useContextData } from '../../hooks';

type IHeaderProps = {
  num?: number;
  updateNum?: (num: number) => void;
};

function Header(p: IHeaderProps) {
  const [num, setNum] = useState(0);
  debugger;
  const handleClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        debugger;
        setNum(num+1);
        console.log(num);
      }, 1000);
    }
  };
  const { updateState } = useContext(RootContext);
  const { addr, name, age } = useContextData();
  console.log('render header');
  return (
    <>
      <p>i'm Header {addr}-{age}-{name}</p>
      <div onClick={handleClick}>num++</div>
      <Button onClick={() => {
        updateState({
          name: 'x',
          addr,
          age,
        });
      }}>updateContext</Button>
    </>
  );
}

export default memo(Header);
