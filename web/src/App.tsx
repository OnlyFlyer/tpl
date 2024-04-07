import React, { useMemo, useState } from 'react';
import './App.css';
import { Header, Footer, Content, Super, Rtc, TplWebSocket } from './components';
import { type RootContextType } from './context';
import { Button, Space } from 'antd';
import { useWinResize } from './hooks';
// import { add, subtract, multiple, print, divide } from './utils';

export const foo = 'foo';
export const bar = 'bar';

const initState: RootContextType['state'] = {
  name: '张三',
  age: 18,
  addr: '浙江杭州',
};

// Demo1
function App() {
  debugger;
  const [arr, setArr] = useState<string[]>([]);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(2);
  const [num3, setNum3] = useState(3);
  const { width, height } = useWinResize();
  return (
    <>
      {/* <Rtc randomNumber={3} /> */}
      <br />
      {/* <TplWebSocket randomNumber={1} /> */}
      {width}-{height}
      <Space>
        <Button onClick={() => { setNum1(num1+1) }}>{num1} - num1+1</Button>
        <Button onClick={() => { setNum2(num2+1) }}>{num2} - num2+1</Button>
        <Button onClick={() => { setNum3(num3+1) }}>{num3} - num3+1</Button>
      </Space>
      {/* <Editor /> */}
      {/* <Super a={1} b={2} /> */}
      {/* <Header />
      <Content />
      <Footer /> */}
      {/* <input onChange={(e) => { setStr(e.target.value) }} /> */}
    </>
  );
};

// function App() {
//   const [state, updateState] = useState(initState);
//   const [num, setNum] = useState(0);
//   const rootContextValue = useMemo(() => {
//     return { state, updateState };
//   }, [state, updateState]);
//   console.log('render app');
//   return (
//     <RootContext.Provider value={rootContextValue}>
//         <Header />
//         <Body />
//         <SiderBar state={state} />
//         <Footer />
//         <button onClick={() => { setNum(num+1) }}>cc</button>
//     </RootContext.Provider>
//   );
// }

export default React.memo(App);
