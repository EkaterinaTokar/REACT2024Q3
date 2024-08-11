import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext } from '../app/components/Theme/ThemeContext';
import ButtonTheme from '../app/components/Theme/ButtonTheme';

describe('ButtonTheme component', () => {
  test('should render without crashing', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
        <ButtonTheme />
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should display dark when theme is light', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
        <ButtonTheme />
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('dark');
  });

  test('should call toggleTheme on button click', () => {
    const toggleTheme = jest.fn();
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
        <ButtonTheme />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalled();
  });
});
