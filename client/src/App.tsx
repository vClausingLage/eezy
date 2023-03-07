import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import "./CSS/App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { Box, AppBar, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./AppFooter";
import LoginButton from "./components/Authentcation/login";
import LogoutButton from "./components/Authentcation/logout";
import Profile from "./components/Authentcation/profile";
import Metar from "./components/Metar";
import Aircraft from "./components/Aircraft";
import Map from "./components/Map";
import RawMetar from "./components/Metar/components/RawMetar";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userID, setUserID] = useState<string>();

  useEffect(() => {
    if (user?.sub !== undefined) setUserID(user.sub.match(/[0-9]/g)!.join(""));
  });

  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  let activeStyle = {
    color: "#293866",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <nav className="nav-bar">
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
                    to="/map"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Map
                  </NavLink>
                  {!isAuthenticated && !isLoading && <LoginButton />}
                  {isAuthenticated && !isLoading && <LogoutButton />}
                </nav>
              </Toolbar>
            </AppBar>
          </Box>

          <Routes>
            <Route path="/" element={<Metar />} />
            <Route path="aircraft" element={<Aircraft userID={userID} />} />
            <Route path="map" element={<Map />} />
            <Route path="rawmetar" element={<RawMetar />} />
          </Routes>
        </BrowserRouter>
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
