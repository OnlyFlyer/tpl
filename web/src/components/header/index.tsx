import { memo, useContext } from 'react';
import { Button } from 'antd';
import { RootContext } from '../../context';
import { useContextData } from '../../hooks';

type IHeaderProps = {
  num?: number;
  updateNum?: (num: number) => void;
};

function Header(p: IHeaderProps) {
  const { updateState } = useContext(RootContext);
  const { addr, name, age } = useContextData();
  console.log('render header');
  return (
    <>
      <p>i'm Header {addr}-{age}-{name}</p>
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
