import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/api/store';
import MainPage from '../app/components/MainPage';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
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
    renderWithContext(
      <MainPage
        data={{ count: 60, next: null, previous: null, results: [] }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
      expect(screen.getByText(/light/i)).toBeInTheDocument();
      expect(screen.getByText(/Search/i)).toBeInTheDocument();
    });
  });
  test('Should render with content', async () => {
    renderWithContext(
      <MainPage
        data={{
          count: 60,
          next: null,
          previous: null,
          results: [
            {
              name: 'test1',
              diameter: 'test1',
              climate: 'test1',
              gravity: 'test1',
            },
          ],
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('test1')).toBeInTheDocument();
    });
  });
});
