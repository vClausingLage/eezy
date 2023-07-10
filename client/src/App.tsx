import { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import "./CSS/App.css";

import { useAuth0 } from "@auth0/auth0-react";

import store from "./features/redux/store";
import { Provider } from "react-redux";

import { Box, AppBar, Toolbar, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./General/AppFooter";
import Metar from "./pages/Metar";
import FlightPlanner from "./pages/FlightPlanner";
import IndexPage from "./pages/Index/Index";

import LoginButton from "./General/Buttons/loginButton";
import LoadingCircle from "./General/LoadingCircle";

function App() {
  const theme = useMemo(() => createTheme(getDesignTokens()), []);

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingCircle />;
  }

  const activeStyle = {
    backgroundColor: "#93A4C5",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
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
                      to="/flight-planner"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Flight Planner
                    </NavLink>
                  </nav>
                  {!user && <LoginButton />}
                  <Typography>{user?.name}</Typography>
                </Toolbar>
              </AppBar>
            </Box>

            <Routes>
              <Route path="/" element={<Metar />} />
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
                path="flight-planner"
                element={
                  <FlightPlanner
                    user={user?.sub?.replace("|", "")}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route path="index" element={<IndexPage />} />
              <Route path="callback" element={<Navigate to="/aircraft" />} />
            </Routes>
          </Provider>
        </BrowserRouter>
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
