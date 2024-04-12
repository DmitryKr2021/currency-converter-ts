import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import ErrorPage from './components/ErrorPage.tsx';
import MainPage from './components/MainPage.tsx';
import * as routes from './routes.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root()} element={null}>
      <Route index element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

const App: React.FC = () => (
  <div className="h-100">
    <div className="h-100 d-flex flex-column">
      <RouterProvider router={router} />
    </div>
  </div>
);

export default App;
