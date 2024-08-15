import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UncontrolledForm } from './components/UncontrolledForm.tsx';
import { ReactHookForm } from './components/ReactHookForm.tsx';
import { Provider } from 'react-redux';
import { store } from './store.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: 'uncontrolledForm',
        element: <UncontrolledForm />,
      },
      {
        path: 'reactHookForm',
        element: <ReactHookForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
