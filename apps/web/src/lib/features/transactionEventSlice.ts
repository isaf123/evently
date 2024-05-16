import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  total_price: number;
  discount: number;
  point: number;
  voucher_id: null | number;
  ticket_count: number;
}

const data: IData | any = {
  total_price: 0,
  discount: 0,
  point: 0,
  voucher_id: null,
  ticket_count: 0,
};

const TransactionSlice = createSlice({
  name: 'transaction', //name menjadi sebagai type
  // initialState:{userData:{...data}},
  initialState: { ...data },
  reducers: {
    setPromo: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
  },
});

const actions = {
  setTransactionAction: TransactionSlice.actions.setPromo,
};
export const { setTransactionAction } = actions;

export default TransactionSlice.reducer;
