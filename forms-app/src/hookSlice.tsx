import { createSlice } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  picture: string | null;
  country: string;
  isNew?: boolean;
}

export interface FormState {
  setReactHookFormData: FormData[];
}

export const initialState: FormState = {
  setReactHookFormData: [],
};
export const formHookSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    setReactHookFormData(state, action) {
      state.setReactHookFormData.push(action.payload);
    },
  },
});
export const reactHookFormActions = formHookSlice.actions;
export const reactHookFormReducer = formHookSlice.reducer;
