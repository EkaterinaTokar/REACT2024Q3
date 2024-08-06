import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import MyApp from '../pages/_app';

const MockComponent = () => <div>Test Component</div>;

describe('MyApp Component', () => {
  test('renders component without crashing', () => {
    const props: AppProps = {
      Component: MockComponent,
      pageProps: {},
      router: {} as Router,
    };
    render(<MyApp {...props} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
