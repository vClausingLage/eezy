import { useState } from 'react'
import { Box, TextField, Button, LinearProgress } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './helper/metar-regex'

function Metar() {

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState({})
  let isLoading = false  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value)
  }

  const searchIcao = async() => {
    isLoading = true
    const fetchMetar = await fetch('https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=' + icao)
    const data = await fetchMetar.text()
    let metarList = prepareMetar(data)
    checkMetarIntegr(metarList)
    let metarListReduced: string[][] = reduceTempo(metarList)
    let metarObj = maptoMetarObj(metarListReduced[0])
    console.log(metarObj)
    setMetarCode(metarObj)
  }

  const loading = <Box sx={{ width: '100%' }}><LinearProgress /></Box>

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
        id="icao code search field"
        label="Name"
        value={icao}
        onChange={handleChange}
        onSubmit={searchIcao}
      />
      <Button 
        // type='submit' 
        variant='outlined'
        onClick={searchIcao}
        >
        search
        {/* search ! Icon MUI */}
      </Button>
    </Box>
    {isLoading && loading}
    </>
  )
}

export default Metar