import { Box, Typography } from '@mui/material'

import FlightRuleTable from './FlightRuleTable'

function FlightRuleButton () {
  return (
    <Box className='table-flight-rule'>
      <Typography variant='h4'>Flight Rule Colors</Typography>
      <FlightRuleTable />
    </Box>
  )
}

export default FlightRuleButton
