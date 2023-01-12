import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography, Card } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './helper/metar-regex'
import { IMetar } from './helper/assets/IMetar'

function Metar() {

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState<IMetar>()
  const [gafor, setGafor] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loading = <Box sx={{ width: '100%' }}><CircularProgress color='secondary' /></Box>
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value)
  }

  const searchIcao = async() => {
    setIsLoading(true)
    const fetchMetar = await fetch('https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=' + icao)
    const data = await fetchMetar.text()
    let metarList = prepareMetar(data)
    checkMetarIntegr(metarList)
    let metarListReduced: string[][] = reduceTempo(metarList)
    let metarObj = maptoMetarObj(metarListReduced[0])
    setMetarCode(metarObj)
    setGafor(metarObj.GAFOR)
    setIsLoading(false)
  }

  const clouds = () => {
    if (metarCode?.Visibility === 'CAVOK') {
      return '☼'
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === 'FEW') {
      return '☁'
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === 'SCT') {
      return '☁ ☁'
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === 'BKN') {
      return '☁ ☁ ☁'
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === 'OVC') {
      return '☁ ☁ ☁ ☁'
    } else {
      return ''
    }
  }

  // const precipitation = () => {
  //   if (metarCode?.Precipitation?.elements)
  // }

  return (
    <>
    <h1>Quick & EEzy Metar</h1>
      <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='icao code search field'
        label='Airport'
        value={icao}
        onChange={handleChange}
      />
      <Button 
        // type= 'submit'
        id='search icao code button'
        variant='outlined'
        onClick={searchIcao}
        >
        search
        {/* search ! Icon MUI */}
      </Button>
    </Box>
    <Card>
      {isLoading && loading}
      {metarCode && 
        <>
          <Typography>
            METAR submitted for {metarCode.Date.toUTCString()}</Typography>
          <Typography>
            Flight Rules (GAFOR Code) {gafor}
          </Typography>
          <Typography>
            Cloud Layer {clouds()}
          </Typography>
          <Typography>
            Precipitation {metarCode.Precipitation?.intensity} {metarCode.Precipitation?.elements[0]} {metarCode.Precipitation?.elements[1]} {metarCode.Precipitation?.elements[2]}
          </Typography>
          <Typography>
            {metarCode.Winds.speed} {metarCode.Winds.unit} from {metarCode.Winds.direction}°
          </Typography>
          <Typography>
            QNH {metarCode.QNH} hPa
          </Typography>
          

          {metarCode.NOSIG && 
            <Typography><span color='red'>NO SIG</span>nificant changes expected</Typography>
          }
          <Typography>
            {metarCode?.RawMetar}
          </Typography>
        </>
      }
    </Card>
    </>
  )
}

export default Metar