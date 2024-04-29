import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  category?: string;
  locations?: string;
  time?: string;
  price?: string;
}

const data: IData | any = {};

const eventSlice = createSlice({
  name: 'event', //name menjadi sebagai type
  // initialState:{userData:{...data}},
  initialState: { ...data },
  reducers: {
    setEvent: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
    setEventDelete: (initialState, action) => {
      console.log();
      return { ...data };
    },
  },
});

const actions = {
  setFilterDataAction: eventSlice.actions.setEvent,
  setEventDeleteAction: eventSlice.actions.setEventDelete,
};
export const { setFilterDataAction, setEventDeleteAction } = actions;

export default eventSlice.reducer;
