import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../pages/api/store';
import { useGetPlanetsQuery } from '../pages/api/api-service';
import MainPage from '../components/MainPage';

jest.mock('../api/api-service', () => ({
  ...jest.requireActual('../api/api-service'),
  useGetPlanetsQuery: jest.fn(),
}));

function renderWithContext(element: React.ReactElement) {
  render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>,
  );
}

describe('MainPage  component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Should render without crashing', async () => {
    (useGetPlanetsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    renderWithContext(<MainPage />);

    await waitFor(() => {
      const loadingText = screen.getByText(/Loading.../i);
      expect(loadingText).toBeInTheDocument();
    });
  });
  test('Should render with content', async () => {
    (useGetPlanetsQuery as jest.Mock).mockReturnValue({
      data: { count: 60, results: [{ name: 'Tatooine' }] },
      isLoading: false,
      isError: false,
    });

    renderWithContext(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  });
  test('should render error state', () => {
    (useGetPlanetsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithContext(<MainPage />);
    expect(screen.getByText('Error loading results')).toBeInTheDocument();
  });
});
