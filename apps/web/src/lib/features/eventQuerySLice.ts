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
  price: '',
  location: '',
  address: '',
};

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
