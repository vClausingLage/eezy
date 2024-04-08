import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import Profile from "./Profile";
import Login from './Login';
import Layout from './Layout';

import './main.css';

//! to another file
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },

]);

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
    <RouterProvider router={router} />
    <App />
  </Auth0Provider>,
);