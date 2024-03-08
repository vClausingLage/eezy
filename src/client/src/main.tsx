import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

//! to another fille
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

{/* <NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "red" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }}
/> */}

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