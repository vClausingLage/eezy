import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { reactRoutes } from './layout/router'
import { Auth0Provider } from '@auth0/auth0-react'

import './index.css'

const root = createRoot(document.getElementById('root')!)

import { AppContextProvider } from './context'

root.render(
  <Auth0Provider
    domain="dev-lcqbfmwjn2s35t2q.us.auth0.com"
    clientId="qiN12JePHbGiLHcZ7b4wMcRgXOkRl2Bf"
    authorizationParams={{
      audience: 'https://clausing-lage.de',
      redirect_uri: window.location.origin
    }}
  >
    <AppContextProvider>
      <RouterProvider router={reactRoutes} />
    </AppContextProvider>
  </Auth0Provider>,
)