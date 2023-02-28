import { useState, useMemo } from "react";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Metar from "./components/Metar";
import Aircraft from "./components/Aircraft";
import Map from "./components/Map";
import RawMetar from "./components/Metar/components/RawMetar";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { getDesignTokens } from "./CSS/theme";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Metar />}>
        <Route path="aircraft" element={<Aircraft />} />
        <Route path="map" element={<Map />} />
      </Route>
    )
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Box>
          <AppHeader />
          <Metar />
          <AppFooter />
          {/* <Aircraft />
          <RawMetar />
          <Map /> */}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
