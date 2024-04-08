import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  age: number;
  addr: string;
  company: string;
  random: number;
};

const initUser: UserState = {
  name: 'xxx',
  age: 18,
  addr: '浙江杭州',
  company: '袋鼠云',
  random: 1,
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
    getUser: (state, action: PayloadAction<number>) => {
      const { payload } = action;
    },
  },
});

export const { resetUser, updateUser } = userModel.actions;

export const userModelReducer = userModel.reducer;
