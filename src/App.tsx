import React, { useMemo, useState } from 'react';
import './App.css';
import { Header, Footer, Content, Editor, Super } from './components';
import { type RootContextType } from './context';
import { add, subtract, multiple, print, divide } from './utils';

export const foo = 'foo';
export const bar = 'bar';

const initState: RootContextType['state'] = {
  name: '张三',
  age: 18,
  addr: '浙江杭州',
};

console.log('13333');


const initArr = new Array(100000).fill(0).map((e, i) => `${e}_${i}`);

// function Aa() {

// };

class Aa {
  a: number;
  b: number;
  constructor() {
    this.a = 1;
    this.b = 2;
    return {a: 3, b: 4};
  };
};

// Demo1
function App() {
  const [arr, setArr] = useState<string[]>(initArr);
  const a = add(1,2);
  const b = subtract(1,2);
  const c = multiple(1,2);
  let xx = 1;
  console.log(window);
  const aa = useMemo(() => {
    return [...arr, Math.random()];
  }, [arr]);
  console.log(aa, '--aa');
  const x = new Aa();
  console.log(x, '--xx');
  const d = divide(1,2);
  return (
    <>
    {a}-
    {b}-
    {c}-
    {d}
    {arr.map((e, i) => <span key={i}>{`第${i}个： ${e}`}</span>)}
    <div onClick={() => {
    setArr([])
    }}>变换</div>
    <div onClick={() => {
      setArr(['1']);
    }}>xx</div>
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
