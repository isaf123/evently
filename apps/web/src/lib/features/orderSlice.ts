import { createSlice } from '@reduxjs/toolkit';

// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  type: string;
  order: string;
}

const data: IData | any = {
  type: 'date_transaction',
  order: 'desc',
};

const orderSlice = createSlice({
  name: 'orderBy',

  initialState: { ...data },
  reducers: {
    setOrder: (initialState, action) => {
      return { ...initialState, ...action.payload };
    },
  },
});

const actions = {
  setOrderAction: orderSlice.actions.setOrder,
};
export const { setOrderAction } = actions;

export default orderSlice.reducer;
