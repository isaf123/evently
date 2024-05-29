import { createSlice } from '@reduxjs/toolkit';
import { subDays } from 'date-fns';
// slice untuk mengkonfigurasi pembuatan reducer dan action

interface IData {
  from?: string;
  to?: string;
}

const data: IData | any = {
  from: subDays(new Date(), 30).toISOString(),
  to: new Date().toISOString(),
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
