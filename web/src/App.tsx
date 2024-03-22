import React, { useMemo, useState } from 'react';
import './App.css';
import { Header, Footer, Content, Super, Rtc } from './components';
import { type RootContextType } from './context';
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
  const [arr, setArr] = useState<string[]>([]);
  return (
    <>
      <Rtc />
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
