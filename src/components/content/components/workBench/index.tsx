import React, { useState } from 'react';

export const WorkBenchGrandChild = () => {
  console.log('render WorkBenchGrandChild');
  return <p>i'm WorkBenchGrandChild</p>
};

export const WorkBenchChild = () => {
  console.log('render WorkBenchChild');
  return (
    <>
      <p>i'm WorkBenchChild</p>
      <WorkBenchGrandChild />
    </>
  );
};

function ExchangedComp() {
  const [num, setNum] = useState<number>(1);
  console.log('render ExchangeComp');
  return (
    <>
      <input
        value={num}
        onChange={(e) => {
          setNum(+e.target.value || 0);
        }}
      />
      <p>num is {num}</p>
    </>
  );
};

// Demo WorkBench
function WorkBench() {
  console.log('render WorkBench');
  return (
    <>
      <ExchangedComp />
      <WorkBenchChild />
    </>
  );
}

export default WorkBench;
