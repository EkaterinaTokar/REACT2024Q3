import React from 'react';
import MainPage from './components/MainPage';
import ErrorBoundary from './components/Error/ErrorBoundary';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
