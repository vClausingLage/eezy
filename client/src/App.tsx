import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import "./CSS/App.css";

import { Box, AppBar, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./AppFooter";
import Metar from "./components/Metar";
import Aircraft from "./components/Aircraft";
import Map from "./components/Map";
import RawMetar from "./components/Metar/components/RawMetar";

function App() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  let activeStyle = {
    color: "#800080",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <nav>
                  <NavLink
                    className="navlink"
                    to="/"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Metar
                  </NavLink>
                  <NavLink
                    className="navlink"
                    to="/aircraft"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Aircraft
                  </NavLink>
                  <NavLink
                    className="navlink"
                    to="/map"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Map
                  </NavLink>
                  <a
                    href="https://github.com/vClausingLage/eezy"
                    rel="noreferrer"
                    target="_blank"
                    className="navlink"
                  >
                    <GitHubIcon />
                  </a>
                </nav>
              </Toolbar>
            </AppBar>
          </Box>

          <Routes>
            <Route path="/" element={<Metar />} />
            <Route path="aircraft" element={<Aircraft />} />
            <Route path="map" element={<Map />} />
            <Route path="rawmetar" element={<RawMetar />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
