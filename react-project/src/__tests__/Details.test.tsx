import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../app/api/store';
import Details from '../app/details/[detailName]';
import { SearchResult } from '../app/components/utils/interface';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
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

const mockData: SearchResult = {
  name: 'Tatooine',
  climate: 'arid',
  gravity: '1 standard',
  diameter: '10465',
};

describe('Details component', () => {
  test('should render without crashing', async () => {
    const setShowDetails = jest.fn();
    renderWithContext(
      <Details setShowDetails={setShowDetails} item={mockData} />,
    );
    await waitFor(() => {
      expect(screen.getByText(/Close/i)).toBeInTheDocument();
    });
  });
  test('should display data correctly', async () => {
    const setShowDetails = jest.fn();
    renderWithContext(
      <Details setShowDetails={setShowDetails} item={mockData} />,
    );
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
      expect(screen.getByText(/climate: arid/i)).toBeInTheDocument();
      expect(screen.getByText(/gravity: 1 standard/i)).toBeInTheDocument();
      expect(screen.getByText(/diameter: 10465/i)).toBeInTheDocument();
    });
  });
});
