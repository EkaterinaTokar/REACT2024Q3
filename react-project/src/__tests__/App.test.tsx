import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(true).toBeTruthy();
});
