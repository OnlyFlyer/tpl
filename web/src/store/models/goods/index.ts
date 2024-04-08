import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../../utils';


interface GoodsState {
  list: Array<{ goodsName: string; goodsId: number; }>;
  baseInfo: {
    from: string;
    to: string;
    userName: string;
  };
  randomKey: number;
  loading: boolean,
};

const initGoods: GoodsState = {
  list: [],
  baseInfo: { from: '', to: '', userName: '' },
  randomKey: 2,
  loading: false,
};

export const goodsGetGoodsListThunk = createAsyncThunk('GoodsModel/getGoodsList', async (payload: Partial<GoodsState>, thunkAPI) => {
  thunkAPI.dispatch({
    type: 'GoodsModel/updateGoods',
    payload: { loading: true },
  });
  const result = await sleep(2000, payload);
  thunkAPI.dispatch({
    type: 'GoodsModel/updateGoods',
    payload: { loading: false, ...result },
  });
});

export const goodsModel = createSlice({
  name: 'GoodsModel',
  initialState: initGoods,
  reducers: {
    resetGoods: (state) => {
      return initGoods;
    },
    updateGoods: (state, action: PayloadAction<Partial<GoodsState>>) => {
      console.log(state, action);
      return { ...state, ...action.payload };
    },
    // getGoodsList: (state, action: PayloadAction<number>) => {
    //   const { payload } = action;
    //   console.log(payload);
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(goodsGetGoodsListThunk.fulfilled, (state, action) => {
  //       return { ...state, ...action.payload };
  //     });
  // },
});

export const { resetGoods, updateGoods } = goodsModel.actions;

export const goodsModelReducer = goodsModel.reducer;
