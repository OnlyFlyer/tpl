import React from 'react';

export type RootContextType = {
  state: {
    name: string,
    age: number,
    addr: string,
  },
  updateState: (p: RootContextType['state']) => void;
};

export const RootContext = React.createContext<RootContextType>({
  state: {
    name: '张三',
    age: 1,
    addr: '浙江杭州',
  },
  updateState: (p: any) => {},
});
