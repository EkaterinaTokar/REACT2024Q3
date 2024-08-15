import { configureStore } from '@reduxjs/toolkit';
import { uncontrolledFormReducer } from './slice';
import { countryReducer } from './countrySlice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
    countries: countryReducer,
    //two: twoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
