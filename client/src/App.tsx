
import Metar from './components/Metar'
import Aircraft from './components/Aircraft'
import Map from './components/Map'

import { ThemeProvider, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './components/CSS/theme'
// THEME https://mui.com/material-ui/customization/default-theme/

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
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