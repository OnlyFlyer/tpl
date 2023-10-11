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

// Demo WorkBench
function WorkBench() {
  const [num, setNum] = useState<number>(1);
  console.log('render WorkBench');
  return (
    <>
      <input
        value={num}
        onChange={(e) => {
          setNum(+e.target.value || 0);
        }}
      />
      <p>num is {num}</p>
      <WorkBenchChild />
    </>
  );
}

export default WorkBench;
