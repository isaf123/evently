import { createSlice } from '@reduxjs/toolkit';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  getDate: Object;
}

const data: IData | any = {
  getDate: {},
};

const CalendarSlice = createSlice({
  name: 'calendar', //name menjadi sebagai type
  // initialState:{userData:{...data}},
  initialState: { ...data },
  reducers: {
    setCalendar: (initialState, action) => {
      // initialState.userData = action.payload

      return { ...initialState, ...action.payload };
    },
  },
});

const actions = {
  setCalendarAction: CalendarSlice.actions.setCalendar,
};
export const { setCalendarAction } = actions;

export default CalendarSlice.reducer;
