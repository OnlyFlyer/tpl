import React, { useMemo, useState } from 'react';
import './App.css';
import { Header, Footer, Content } from './components';
import { RootContext, type RootContextType } from './context';

const initState: RootContextType['state'] = {
  name: '张三',
  age: 18,
  addr: '浙江杭州',
};

// Demo1
function App() {
  // const [, setStr] = useState<string>();
  return (
    <>
      <Header />
      <Content />
      <Footer />
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
