import React from 'react';

type IHeaderProps = {
  num?: number;
  updateNum?: (num: number) => void;
};

export default function Header(p: IHeaderProps) {
  console.log('render header');
  return <p>i'm Header</p>;
}
