import MainPage from './components/MainPage';
import ErrorBoundary from './components/Error/ErrorBoundary';
import './App.css';
import { FC } from 'react';
import ButtonTheme from './components/Theme/ButtonTheme';
import { ThemeProvider } from './components/Theme/ThemeContext';

const App: FC = () => {
  return (
    <ThemeProvider>
      <ButtonTheme />
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
