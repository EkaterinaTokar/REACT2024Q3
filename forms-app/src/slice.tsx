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
}

export interface FormState {
  uncontrolledFormData: FormData[];
}

export const initialState: FormState = {
  uncontrolledFormData: [],
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action) {
      state.uncontrolledFormData.push(action.payload);
    },
  },
});
export const uncontrolledFormActions = formSlice.actions;
export const uncontrolledFormReducer = formSlice.reducer;
