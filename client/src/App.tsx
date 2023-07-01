import { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

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
  const theme = useMemo(() => createTheme(getDesignTokens()), []);

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
              <Route path="aircraft" element={<Aircraft />} />
              <Route path="flight-planner" element={<FlightPlanner />} />
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
