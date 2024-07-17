import { FC, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ButtonTheme: FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ButtonTheme must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
};

export default ButtonTheme;
