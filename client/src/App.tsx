import { useState, useMemo } from "react";

import AppHeader from "./components/AppHeader";
import Metar from "./components/Metar";
import Aircraft from "./components/NewAircraft";
import Map from "./components/Map";

import { createTheme, ThemeProvider, Grid, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens } from "./components/CSS/theme";
// THEME https://mui.com/material-ui/customization/default-theme/

function App() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ ml: "2rem", mr: "2rem" }}>
          <AppHeader></AppHeader>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Metar />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Aircraft />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Map />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
