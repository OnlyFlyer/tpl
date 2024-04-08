import { useState, useCallback, useEffect, useContext } from 'react';
import { debounce } from 'lodash';

import { RootContext } from '../context';

export * from './store';

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

export const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);
  const setMergeState = useCallback((patch: any) => {
      setState((prevState) => {
          const newState = isFunction(patch) ? patch(prevState) : patch;
          return newState ? { ...prevState, ...newState } : prevState;
      });
  }, []);
  return [state, setMergeState];
};

export const useTime = (now: number, setNow: Function) => {
  const [timeObj, setTime] = useState({ hour: '00', minute: '00', second: '00' });
  const formatTime = (time: number) => {
    const date = new Date(time);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return { h, m, s };
  };
  useEffect(() => {
    let timer: NodeJS.Timer | null = null;
    if (now) {
      timer = setInterval(() => {
        const { h, m, s } = formatTime(now);
        setTime({
          hour: h,
          minute: m,
          second: s,
        });
        setNow((time: number) => time + 1000);
      }, 1000);
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [now, setNow]);

  return timeObj;
};

export const useWinResize = ({ dom = document.body } = {}) => {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const initSize = useCallback(() => {
    try {
      const { offsetWidth = 0, offsetHeight = 0 } = dom || {};
      setSizes({ width: offsetWidth, height: offsetHeight });
    } catch (err) {
      //
    }
  }, [dom]);
  const debounceFn = debounce(initSize, 1000);
  useEffect(() => {
    initSize();
    window.addEventListener('resize', debounceFn);
    return () => {
      window.removeEventListener('resize', debounceFn);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initSize]);
  return sizes;
};

export const useContextData = (ctx = RootContext) => {
  const { state } = useContext(ctx);
  return state;
};
