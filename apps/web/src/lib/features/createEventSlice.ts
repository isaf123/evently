import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  title?: string;
  start_date?: Date;
  end_date?: Date;
  description?: string;
  category?: string;
  available_seat?: number;
  event_type?: string;
  price?: number;
  location?: string;
  address?: string;
}

const data: IData | any = {
  title: '',
  description: '',
  category: '',
  available_seat: '',
  event_type: '',
  price: 0,
  location: '',
  address: '',
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
  },
});

const actions = {
  setCreateEventAction: createEventSlice.actions.setEvent,
};
export const { setCreateEventAction } = actions;

export default createEventSlice.reducer;