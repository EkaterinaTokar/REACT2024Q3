import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ButtonTheme from '../components/Theme/ButtonTheme';
import { ThemeProvider } from '../components/Theme/ThemeContext';

describe('ThemeProvider component', () => {
  test('should render without crashing', () => {
    render(
      <ThemeProvider>
        <ButtonTheme />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should provide the correct initial theme', () => {
    render(
      <ThemeProvider>
        <ButtonTheme />
      </ThemeProvider>,
    );
    expect(document.body.classList.contains('light')).toBe(true);
  });

  test('should toggle the theme and update the body class', () => {
    render(
      <ThemeProvider>
        <ButtonTheme />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveTextContent('light');
    expect(document.body.classList.contains('light')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(true);

    fireEvent.click(button);

    expect(button).toHaveTextContent('dark');
    expect(document.body.classList.contains('light')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
