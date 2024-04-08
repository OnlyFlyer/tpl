import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type RootState, type RootDispatch } from '../../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useRootDispatch: () => RootDispatch = useDispatch;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
