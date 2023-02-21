import { useState, useMemo } from "react";

import AppHeader from "./AppHeader";
import Metar from "./components/Metar";
import Aircraft from "./components/NewAircraft";
import Map from "./components/Map";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens } from "./components/CSS/theme";

import RawMetar from "./components/Metar/RawMetar";
import AppFooter from "./AppFooter";

// THEME https://mui.com/material-ui/customization/default-theme/

function App() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppHeader />
          <Metar />
          {/* <RawMetar /> */}
          <AppFooter />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
