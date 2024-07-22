import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemState {
  SelectedItems: string[];
}

const initialState: SelectedItemState = {
  SelectedItems: JSON.parse(localStorage.getItem('favoriteKey') ?? '[]'),
};
export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addSelectedItem(state, action: PayloadAction<string>) {
      state.SelectedItems.push(action.payload);
      localStorage.setItem('favoriteKey', JSON.stringify(state.SelectedItems));
    },
    removeSelectedItem(state, action: PayloadAction<string>) {
      state.SelectedItems = state.SelectedItems.filter(
        (item) => item !== action.payload,
      );
      localStorage.setItem('favoriteKey', JSON.stringify(state.SelectedItems));
    },
  },
});
export const apiActions = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
