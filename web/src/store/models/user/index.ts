import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../../utils';

interface UserState {
  name: string;
  age: number;
  addr: string;
  company: string;
  random: number;
  loading: boolean;
};

export const userGetUserInfo = createAsyncThunk('UserModel/getUserInfo', async (payload: Partial<UserState>, thunkAPI) => {
  thunkAPI.dispatch({
    type: 'UserModel/updateUser',
    payload: { loading: true },
  });
  const result = await sleep(1500, payload);
  thunkAPI.dispatch({
    type: 'UserModel/updateUser',
    payload: { loading: false, ...result },
  });
});

const initUser: UserState = {
  name: 'xxx',
  age: 18,
  addr: '浙江杭州',
  company: '袋鼠云',
  random: 1,
  loading: false,
};

export const userModel = createSlice({
  name: 'UserModel',
  initialState: initUser,
  reducers: {
    resetUser: (state) => {
      return initUser;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    // getUser: (state, action: PayloadAction<number>) => {
    //   const { payload } = action;
    // },
  },
});

export const { resetUser, updateUser } = userModel.actions;

export const userModelReducer = userModel.reducer;
