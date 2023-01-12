
import Metar from './components/Metar'
import Aircraft from './components/Aircraft'
import Map from './components/Map'

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './components/CSS/theme'
// THEME https://mui.com/material-ui/customization/default-theme/

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <h1>EEzy Flight Planner</h1>
          {/* <Aircraft /> */}
          <Metar />
          <Map />
      </ThemeProvider>
    </>
  )
}

export default App;