import '@testing-library/jest-dom';

import { apiActions, apiReducer, initialState } from '../api/api.slice';
import { SearchResult } from '../utils/interface';

const mockSearchResult: SearchResult = {
  name: 'test 1',
  diameter: 'test 1',
  climate: 'test 1',
  gravity: 'test 1',
};

describe('apiSlice', () => {
  test('should return the initial state', () => {
    expect(apiReducer(undefined, { type: 'unknown' })).toBe(initialState);
  });
  test('should handle addSelectedItem', () => {
    const nextState = apiReducer(
      initialState,
      apiActions.addSelectedItem(mockSearchResult),
    );
    const expectedState = {
      ...initialState,
      SelectedItems: [mockSearchResult],
    };
    expect(nextState).toEqual(expectedState);
  });

  test('should handle removeSelectedItem', () => {
    const handleItem = {
      ...initialState,
      SelectedItems: [mockSearchResult],
    };
    const nextState = apiReducer(
      handleItem,
      apiActions.removeSelectedItem(mockSearchResult.name),
    );
    const expectedState = {
      ...initialState,
      SelectedItems: [],
    };
    expect(nextState).toEqual(expectedState);
  });

  test('should handle removeAllItems', () => {
    const handleItem = {
      ...initialState,
      SelectedItems: [mockSearchResult],
    };
    const nextState = apiReducer(handleItem, apiActions.removeAllItems());
    const expectedState = {
      ...initialState,
      SelectedItems: [],
    };
    expect(nextState).toEqual(expectedState);
  });
});
