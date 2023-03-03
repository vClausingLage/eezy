import { useState, useMemo, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./CSS/App.css";

import { Box, AppBar, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./AppFooter";
import Metar from "./components/Metar";
import Aircraft from "./components/Aircraft";
import Map from "./components/Map";
import RawMetar from "./components/Metar/components/RawMetar";

function App() {
  const googleDiv = useRef(null);

  const [user, setUser] = useState<any>();

  function handleCallbackResponse(response: any) {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
  }

  useEffect(() => {
    if (typeof window === "undefined" || !window.google || !googleDiv.current) {
      return;
    }
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "659451722059-9u4934o3kp0v5osqc4prla3qpgd61gra.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(googleDiv.current!, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
  }, []);

  console.log(user);

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
                  {/* {!user && <div ref={googleDiv}></div>} */}
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
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
