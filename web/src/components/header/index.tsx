import React, { memo } from 'react';

type IHeaderProps = {
  num?: number;
  updateNum?: (num: number) => void;
};

function Header(p: IHeaderProps) {
  console.log('render header');
  return <p>i'm Header</p>;
}

export default memo(Header);
