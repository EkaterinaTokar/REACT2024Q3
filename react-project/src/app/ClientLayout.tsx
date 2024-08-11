'use client';

import React from 'react';
import '../app/styles/global.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { ThemeProvider } from './components/Theme/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './api/store';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
