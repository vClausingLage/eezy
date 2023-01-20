import { useState, useMemo } from 'react'


import Metar from './components/Metar'
import Aircraft from './components/Aircraft'
import Map from './components/Map'

import { createTheme, ThemeProvider, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens } from './components/CSS/theme'
// THEME https://mui.com/material-ui/customization/default-theme/

function App() {

  const [mode, setMode] = useState('dark')
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Typography variant='h1'>EEzy Flight Planner</Typography>
          {/* <Aircraft /> */}
          <Metar />
          <Map />
      </ThemeProvider>
    </>
  )
}

export default App;