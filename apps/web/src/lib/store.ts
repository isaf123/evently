import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './features/eventQuerySLice';
import userSlice from './features/userSlice';
import transactionEventSlice from './features/transactionEventSlice';
import calendarSlice from './features/calendarSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      eventReducer,
      userSlice,
      transactionEventSlice,
      calendarSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
