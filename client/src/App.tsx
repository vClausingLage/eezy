import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import "./CSS/App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { Box, AppBar, Toolbar, ThemeProvider, Typography } from "@mui/material";
import theme from "./CSS/theme";

import AppFooter from "./general/AppFooter";
import Metar from "./pages/Metar";
import FlightPlanner from "./pages/FlightPlanner";
import IndexPage from "./pages/Index/Index";

import LoginButton from "./general/Buttons/loginButton";
import LoadingCircle from "./general/LoadingCircle";

function App() {
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
        </BrowserRouter>
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
