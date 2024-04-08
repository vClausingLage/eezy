import { createRoot } from 'react-dom/client';

import {
  RouterProvider
} from "react-router-dom";

import { reactRoutes } from './router';

import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <Auth0Provider
    domain="dev-lcqbfmwjn2s35t2q.us.auth0.com"
    clientId="qiN12JePHbGiLHcZ7b4wMcRgXOkRl2Bf"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={reactRoutes} />
    <App />
  </Auth0Provider>,
);