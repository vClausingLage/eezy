import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import './CSS/loadingCircle.css'

function LoadingCircle () {
  return (
    <Box className='loading-circle'>
      <CircularProgress color='primary' />
    </Box>
  )
}

export default LoadingCircle
