import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../api/store';
import Details from '../components/Details/Details';

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('https://swapi.dev/api/planets', async () => {
    await delay(150);
    return HttpResponse.json({
      count: 60,
      next: null,
      previous: null,
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          gravity: '1 standard',
          diameter: '10465',
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

function renderWithContext(element: React.ReactElement) {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/details/Tatooine?page=1']}>
        <Routes>
          <Route path="details/:detailName" element={element} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('Details component', () => {
  test('should render without crashing', async () => {
    renderWithContext(<Details />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
  test('should display data correctly after fetch', async () => {
    renderWithContext(<Details />);

    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
      expect(screen.getByText(/climate: arid/i)).toBeInTheDocument();
      expect(screen.getByText(/gravity: 1 standard/i)).toBeInTheDocument();
      expect(screen.getByText(/diameter: 10465/i)).toBeInTheDocument();
    });
  });
  test('close details when button close is clicked ', async () => {
    renderWithContext(<Details />);
    const closeButton = await screen.findByText(/Close/i);

    fireEvent.click(closeButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/?search=&page=1', {
      replace: true,
    });
  });
});
