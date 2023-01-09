import { useState, useEffect } from 'react'
import { Box, TextField } from '@mui/material'

function Metar() {

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState('')
  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //   const response = await fetch('https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=edds')
  //   const data = await response.text()
  //   setMetarCode(data)
  //   }
  //   fetchData()
  // })

// https://mui.com/material-ui/api/form-control/

  return (
    <>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Name"
        value={icao}
        onChange={handleChange}
      />
    </Box>
      {icao}
    </>
  )
}

export default Metar