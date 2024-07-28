import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from '../components/Error/ErrButton';
import ErrorBoundary from '../components/Error/ErrorBoundary';

function renderWithContext(element: React.ReactElement) {
  render(<ErrorBoundary>{element}</ErrorBoundary>);
}

describe('Error', () => {
  test('renders the button', async () => {
    renderWithContext(<ErrorButton />);
    const errorButtonText = screen.getByRole('button', {
      name: /Throw Error/i,
    });
    expect(errorButtonText).toBeInTheDocument();
  });
  test('throws an error when the button is clicked', async () => {
    console.error = jest.fn();
    renderWithContext(<ErrorButton />);
    const errorButton = screen.getByRole('button');
    fireEvent.click(errorButton);
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try again?/i)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
  test('"Try again?" button is clicked', () => {
    renderWithContext(<ErrorButton />);
    const errorButtonText = screen.getByRole('button', {
      name: /Throw Error/i,
    });
    fireEvent.click(errorButtonText);
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /Try again?/i,
      }),
    );
    expect(
      screen.queryByText(/Oops! Something went wrong/i),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  });
});
