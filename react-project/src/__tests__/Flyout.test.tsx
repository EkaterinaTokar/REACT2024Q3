import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Flyout from '../components/SearchResults/Flyout';
import { apiActions, apiReducer } from '../api/api.slice';

jest.mock('file-saver', () => ({
  ...jest.requireActual('file-saver'),
  saveAs: jest.fn(),
}));

const createMockStore = (initialState: unknown): EnhancedStore =>
  configureStore({
    reducer: { api: apiReducer },
    preloadedState: initialState,
  });

const mockSearchResult = [
  {
    name: 'test 1',
    diameter: 'test 1',
    climate: 'test 1',
    gravity: 'test 1',
  },
];

describe('Flyout component', () => {
  let store: ReturnType<typeof createMockStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    store = createMockStore({
      api: {
        SelectedItems: mockSearchResult,
        currentPageData: [],
      },
    });

    jest.spyOn(store, 'dispatch').mockImplementation(dispatch);
  });

  test('should render without crashing', () => {
    render(
      <Provider store={store}>
        <Flyout selectedItems={mockSearchResult} />
      </Provider>,
    );

    expect(screen.getByText('selected elements:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
  test('should dispatch removeAllItems action', () => {
    render(
      <Provider store={store}>
        <Flyout selectedItems={mockSearchResult} />
      </Provider>,
    );

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);
    expect(dispatch).toHaveBeenCalledWith(apiActions.removeAllItems());
  });
  test('should trigger CSV download', () => {
    render(
      <Provider store={store}>
        <Flyout selectedItems={mockSearchResult} />
      </Provider>,
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);
  });
});
