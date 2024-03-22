import React, { useContext } from 'react';
import { RootContext } from '../../context';
import { FolderTree, WorkBench, SiderBar } from './components';

function Child () {
  console.log('render child');
  return <div>child</div>;
};

function Content() {
  console.log('render content');
  return (
    <>
      <FolderTree />
      <WorkBench />
      <SiderBar />
    </>
  );
}


export default Content;
