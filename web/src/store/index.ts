import { configureStore } from '@reduxjs/toolkit';

import { userModelReducer, goodsModelReducer } from './models';

export const store = configureStore({
  reducer: {
    user: userModelReducer,
    goods: goodsModelReducer,
    // ...
  },
});

export type RootState = ReturnType<typeof store.getState>

export type RootDispatch = typeof store.dispatch
