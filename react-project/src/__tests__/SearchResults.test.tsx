import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { SearchResult } from '../app/components/utils/interface';
import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from '../app/api/api.slice';
import SearchResults from '../app/components/SearchResults/SearchResults';

interface RootState {
  api: {
    SelectedItems: SearchResult[];
  };
}

const mockStore = configureStore({
  reducer: {
    api: apiReducer,
  },
});

const mockDispatch = jest.fn();

const mockSelector = jest.fn((selector: (state: RootState) => unknown) =>
  selector({
    api: {
      SelectedItems: [],
    },
  }),
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: RootState) => unknown) =>
    mockSelector(selector),
}));

const mockSearchResult: SearchResult[] = [
  {
    name: 'test1',
    diameter: 'test1',
    climate: 'test1',
    gravity: 'test1',
  },
];

const setShowDetails = jest.fn();
const onSelectItem = jest.fn();

describe('SearchResults component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockClear();
  });

  test('should render without crashing', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SearchResults
            resultCards={mockSearchResult}
            setShowDetails={setShowDetails}
            onSelectItem={onSelectItem}
            currentPage={1}
          />
        </Router>
      </Provider>,
    );

    mockSearchResult.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
