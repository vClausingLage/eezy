import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography, Card } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './Metar/metar-regex'
import { clouds, precipitation, getGafor } from './Metar/metar-ui-helper'
import { IMetar, IGafor } from './Metar/assets/IMetar'


function Metar() {

// ! WHY IS HANDLESUBMIT WORKING?

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState<IMetar>()
  const [gafor, setGafor] = useState<IGafor>()
  const [isLoading, setIsLoading] = useState(false)

  const loading = <Box sx={{ width: '100%' }}><CircularProgress color='secondary' /></Box>
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value)
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('submit')
  }

  const sendLogs = () => {
    fetch('http://localhost:4000/api/logs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        metarCode
      )
    })
  }

  const searchIcao = async() => {
    setIsLoading(true)
    const fetchMetar = await fetch('https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=' + icao)
    const data = await fetchMetar.text()
    let metarList = prepareMetar(data)
    checkMetarIntegr(metarList)
    let metarListReduced: string[][] = reduceTempo(metarList)
    let metarObj = maptoMetarObj(metarListReduced[0])
    console.log(metarObj)
    setMetarCode(metarObj)
    let gafor = getGafor(metarObj.Visibility, metarObj?.Cloud_Layer[0]?.cloudBase)
    setGafor(gafor)
    // sendLogs()                           //! make it !
    setIsLoading(false)
  }

  const precipitation = () => {
    if (metarCode?.Precipitation?.elements) {
      metarCode?.Precipitation?.elements.map((el) => {
        return <span>{el}</span>
      })
    }
  }

  return (
    <>
    <h1>Quick & EEzy Metar</h1>
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField 
          type='search'
          value={icao}
          onChange={handleChange}
        ></TextField>
        <Button 
          type='submit' 
          variant='outlined'
          onClick={searchIcao}
        >search</Button>
      </form>
    </Box>
    <Card>
      {isLoading && loading}
      {metarCode && 
        <>
          <Typography>
            METAR submitted for {metarCode.Date.toString()}</Typography>
          <Typography>
            Flight Rules (GAFOR Code) {gafor?.GaforCode}
          </Typography>
          <Typography>
            Cloud Layer {metarCode.Cloud_Layer?.map((el, idx) => {
              return <p>{clouds(metarCode.Visibility, el.cloudLayer, idx)} at {String(el.cloudBase) + '00ft'}</p>
            })}
          </Typography>
          <Typography>
            {metarCode?.Precipitation?.elements && metarCode?.Precipitation?.elements.map((el) => {
              return <span>{el}</span>
            })}
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