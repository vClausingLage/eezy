import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

import Metar from './pages/metar/'

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

import theme from './CSS/theme'
import { Box, AppBar, Toolbar, ThemeProvider, Typography } from '@mui/material'
const activeStyle = {
  backgroundColor: '#93A4C5'
}

import AppFooter from '../../client/src/general/AppFooter'
import LoginButton from './general/Buttons/loginButton'
import LoadingCircle from '../../client/src/general/LoadingCircle'

import './CSS/App.css'

function App() {

  const { user, isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <LoadingCircle />
  }

  console.log(isAuthenticated, isLoading, user)

  return (
    <>
      <Auth0Provider
        domain="dev-lcqbfmwjn2s35t2q.us.auth0.com"
        clientId="qiN12JePHbGiLHcZ7b4wMcRgXOkRl2Bf"
        authorizationParams={{
          redirect_uri: window.location.origin,
          // audience: `https://dev-lcqbfmwjn2s35t2q.us.auth0.com/api/v2/`,
          // scope: "read:current_user update:current_user_metadata"
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Box>
              <AppBar position='static'>
                <Toolbar>
                  <nav className='nav-bar'>
                    <NavLink
                      to='/index'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to='/'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined}
                    >
                      Metar
                    </NavLink>

                    <NavLink
                      to='/flight-planner'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined}
                    >
                      Flight Planner
                    </NavLink>
                  </nav>
                  {(user == null) && <LoginButton />}
                  <Typography>{user?.name}</Typography>
                </Toolbar>
              </AppBar>
            </Box>

            <Routes>
              <Route path='/' element={<Metar />} />
              {/* <Route
                path="aircraft"
                element={
                  <Aircraft
                    user={user?.sub?.replace("|", "")}
                    isAuthenticated={isAuthenticated}
                  />
                }
              /> */}
              <Route
                path='flight-planner'
              // element={
              //   <FlightPlanner
              //   />
              // }
              />
              {/* <Route path='index' element={<IndexPage />} /> */}
            </Routes>
          </BrowserRouter>
          <AppFooter />
        </ThemeProvider>
      </Auth0Provider>
    </>
  )
}

export default App
