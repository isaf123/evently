import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  category?: string;
  locations?: string;
  time?: string;
  price?: string;
}

const data: IData | any = {};

const createEventSlice = createSlice({
  name: 'event', //name menjadi sebagai type
  // initialState:{userData:{...data}},
  initialState: { ...data },
  reducers: {
    setEvent: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
  },
});

const actions = {
  setCreateEventAction: createEventSlice.actions.setEvent,
};
export const { setCreateEventAction } = actions;

export default createEventSlice.reducer;
