import { configureStore } from '@reduxjs/toolkit';
import { uncontrolledFormReducer } from './slice';
import { countryReducer } from './countrySlice';
import { reactHookFormReducer } from './hookSlice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
    countries: countryReducer,
    reactHookForm: reactHookFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
