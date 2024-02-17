import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Auth0Provider } from '@auth0/auth0-react'
import { domain, clientId } from './config/auth'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://vincent-clausing.de/`,
        scope: "read:current_user"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)

reportWebVitals()
