import { useRouteError } from 'react-router-dom';

interface ErrorRoute {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorRoute;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
        <i>{error.message}</i>
      </p>
    </div>
  );
}