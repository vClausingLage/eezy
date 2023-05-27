import { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "./CSS/App.css";

import store from "./features/redux/store";
import { Provider } from "react-redux";

import { Box, AppBar, Toolbar, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./pages/General/AppFooter";
import Metar from "./pages/Metar";
import Aircraft from "./pages/Aircraft";
import FlightPlanner from "./pages/FlightPlanner";
import IndexPage from "./pages/Index/Index";

function App() {
  const userID = "default";
  const theme = useMemo(() => createTheme(getDesignTokens()), []);

  const activeStyle = {
    backgroundColor: "#93A4C5",
  };

  const navigate = useNavigate();

  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN || "dev-lcqbfmwjn2s35t2q.us.auth0.com";
  const clientId =
    process.env.REACT_APP_AUTH0_CLIENT_ID || "KN3f6WPnxdQZoAHhPT53qqYrWU9dyXnS";
  const redirectUri =
    process.env.REACT_APP_AUTH0_CALLBACK_URL ||
    "http://localhost:3000/callback";
  const audience =
    process.env.REACT_APP_AUTH0_AUDIENCE || "https://metarApp.de";

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <Auth0Provider
              domain={domain}
              clientId={clientId}
              authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri,
              }}
              onRedirectCallback={onRedirectCallback}
            >
              <Box>
                <AppBar position="static">
                  <Toolbar>
                    <nav className="nav-bar">
                      <NavLink
                        to="/index"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Metar
                      </NavLink>
                      <NavLink
                        to="/aircraft"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Aircraft
                      </NavLink>
                      <NavLink
                        to="/flight-planner"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Flight Planner
                      </NavLink>
                    </nav>
                  </Toolbar>
                </AppBar>
              </Box>

              <Routes>
                <Route path="/" element={<Metar />} />
                <Route path="aircraft" element={<Aircraft userID={userID} />} />
                <Route path="flight-planner" element={<FlightPlanner />} />
                <Route path="index" element={<IndexPage />} />
              </Routes>
            </Auth0Provider>
          </Provider>
        </BrowserRouter>
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
