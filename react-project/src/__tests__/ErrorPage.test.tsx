import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../components/Error/ErrorPage';
import { MemoryRouter, Route, Routes, useRouteError } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
}));

describe('ErrorPage component', () => {
  test('should render without crashing', async () => {
    console.error = jest.fn();
    const customError = {
      statusText: 'Custom Status Text',
      message: 'Custom Error Message',
    };

    (useRouteError as jest.Mock).mockReturnValue(customError);
    render(
      <MemoryRouter initialEntries={['/invalid/route']}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, an unexpected error has occurred/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Custom Status Text/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Error Message/i)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
