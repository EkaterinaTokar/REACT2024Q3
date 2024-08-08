import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../components/utils/interface';

export interface SelectedItemState {
  SelectedItems: SearchResult[];
  currentPageData: SearchResult[];
}

export const initialState: SelectedItemState = {
  SelectedItems:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('SelectedItemKey') ?? '[]')
      : '[]',
  currentPageData:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('CurrentPageDataKey') ?? '[]')
      : '[]',
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
    setCurrentPageData(state, action: PayloadAction<SearchResult[]>) {
      state.currentPageData = action.payload;
      localStorage.setItem(
        'CurrentPageDataKey',
        JSON.stringify(state.currentPageData),
      );
    },
  },
});
export const apiActions = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
