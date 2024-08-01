import '../pages/styles/global.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import { ThemeProvider } from '../components/Theme/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './api/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
