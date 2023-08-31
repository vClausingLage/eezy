import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4C689F' // #20788d #495c75 #568395 #8495b0
    },
    secondary: {
      main: '#121212'
    },
    error: {
      main: '#f12800'
    },
    warning: {
      main: '#ea4f02'
    },
    info: {
      main: '#f2ff00'
    }
  },
  typography: {
    h1: {
      fontSize: '3.5rem'
    },
    h2: {
      fontSize: '2.8rem'
    },
    h3: {
      fontSize: '2rem'
    },
    h4: {
      fontSize: '1.7rem'
    }
  }
})

export default theme
