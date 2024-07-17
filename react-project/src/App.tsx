import MainPage from './components/MainPage';
import ErrorBoundary from './components/Error/ErrorBoundary';
import './App.css';
import { FC, useState } from 'react';
import ButtonTheme from './components/Theme/ButtonTheme';

const App: FC = () => {
  const [theme] = useState('light');
  return (
    <div className={theme}>
      <ButtonTheme />
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </div>
  );
};

export default App;
