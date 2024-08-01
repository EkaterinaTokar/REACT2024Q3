import '@testing-library/jest-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { fireEvent, render, screen } from '@testing-library/react';
import { SearchResult } from '../components/utils/interface';
// import { configureStore } from '@reduxjs/toolkit';
// import { apiActions, apiReducer } from '../pages/api/api.slice';
// import SearchResults from '../components/SearchResults/SearchResults';

interface RootState {
  api: {
    SelectedItems: SearchResult[];
  };
}

// const mockStore = configureStore({
//   reducer: {
//     api: apiReducer,
//   },
// });

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

// const mockSearchResult: SearchResult[] = [
//   {
//     name: 'test1',
//     diameter: 'test1',
//     climate: 'test1',
//     gravity: 'test1',
//   },
// ];

//const setShowDetails = jest.fn();

describe('SearchResults component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockClear();
  });

  // test('should render without crashing', () => {
  //   render(
  //     <Provider store={mockStore}>
  //       <Router>
  //         <SearchResults
  //           resultCards={mockSearchResult}
  //           setShowDetails={setShowDetails}
  //           currentPage={1}
  //         />
  //       </Router>
  //     </Provider>,
  //   );

  //   mockSearchResult.forEach((item) => {
  //     expect(screen.getByText(item.name)).toBeInTheDocument();
  //   });
  // });

  // test('checkbox is checked/unchecked based on selectedItems', () => {
  //   mockSelector.mockImplementation((selector: (state: RootState) => unknown) =>
  //     selector({
  //       api: {
  //         SelectedItems: [
  //           {
  //             name: 'test1',
  //             diameter: 'test1',
  //             climate: 'test1',
  //             gravity: 'test1',
  //           },
  //         ],
  //       },
  //     }),
  //   );

  //   render(
  //     <Provider store={mockStore}>
  //       <Router>
  //         <SearchResults
  //           resultCards={mockSearchResult}
  //           setShowDetails={setShowDetails}
  //           currentPage={1}
  //         />
  //       </Router>
  //     </Provider>,
  //   );

  //   const checkbox = screen.getByLabelText('test1');
  //   expect(checkbox).toBeChecked();
  // });

  // test('check addSelectedItem action', () => {
  //   mockSelector.mockImplementation((selector: (state: RootState) => unknown) =>
  //     selector({
  //       api: {
  //         SelectedItems: [],
  //       },
  //     }),
  //   );

  //   render(
  //     <Provider store={mockStore}>
  //       <Router>
  //         <SearchResults
  //           resultCards={mockSearchResult}
  //           setShowDetails={setShowDetails}
  //           currentPage={1}
  //         />
  //       </Router>
  //     </Provider>,
  //   );

  //   const checkbox = screen.getByLabelText('test1');
  //   fireEvent.click(checkbox);

  //   expect(mockDispatch).toHaveBeenCalledWith(
  //     apiActions.addSelectedItem({
  //       name: 'test1',
  //       diameter: 'test1',
  //       climate: 'test1',
  //       gravity: 'test1',
  //     }),
  //   );
  // });
});
