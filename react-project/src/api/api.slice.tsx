import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../utils/interface';

export interface SelectedItemState {
  SelectedItems: SearchResult[];
}

const initialState: SelectedItemState = {
  SelectedItems: JSON.parse(localStorage.getItem('SelectedItemKey') ?? '[]'),
};
export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addSelectedItem(state, action: PayloadAction<SearchResult>) {
      state.SelectedItems.push(action.payload);
      localStorage.setItem(
        'SelectedItemKey',
        JSON.stringify(state.SelectedItems),
      );
    },
    removeSelectedItem(state, action: PayloadAction<string>) {
      state.SelectedItems = state.SelectedItems.filter(
        (item) => item.name !== action.payload,
      );
      localStorage.setItem(
        'SelectedItemKey',
        JSON.stringify(state.SelectedItems),
      );
    },
    removeAllItems(state) {
      state.SelectedItems = [];
      localStorage.setItem(
        'SelectedItemKey',
        JSON.stringify(state.SelectedItems),
      );
    },
  },
});
export const apiActions = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
