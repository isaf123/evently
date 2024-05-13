import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  name_voucher: string;
  discount: number;
  start_date?: Date;
  end_date?: Date;
}

const data: IData | any = {
  name_voucher: '',
  discount: 0,
  start_date: '',
  end_date: '',
};
const promoSlice = createSlice({
  name: 'promo', //name menjadi sebagai type
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
  setPromoDataAction: promoSlice.actions.setPromo,
};
export const { setPromoDataAction } = actions;

export default promoSlice.reducer;
