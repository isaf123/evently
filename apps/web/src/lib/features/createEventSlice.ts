import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  price?: number;
  event_type?: string;
  available_seat?: number;
  flyer_event?: string;
  start_date?: Date;
  end_date?: Date;
}

const data: IData | any = {
  price: 0,
};

const createEventSlice = createSlice({
  name: 'event', //name menjadi sebagai type
  // initialState:{userData:{...data}},
  initialState: { ...data },
  reducers: {
    setEvent: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
    setPromo: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
  },
});

const actions = {
  setCreateEventAction: createEventSlice.actions.setEvent,
  setPromoEventAction: createEventSlice.actions.setPromo,
};
export const { setCreateEventAction, setPromoEventAction } = actions;

export default createEventSlice.reducer;
