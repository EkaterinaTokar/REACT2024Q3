import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { ThemeProvider } from "./components/Theme/ThemeContext";
import { store } from "./api/store";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import { Provider } from "react-redux";
import '../app/styles/global.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <Provider store={store}>
       <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
       </ThemeProvider>
      </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
