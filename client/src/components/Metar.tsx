import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography, Card } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './Metar/metar-regex'
import { clouds, precipitation, getGafor } from './Metar/metar-ui-helper'
import { IMetar, IGafor } from './Metar/assets/IMetar'

import Cloud from './helper/assets/Cloud'
import Sun from './helper/assets/Sun'

function Metar() {

// ! WHY IS HANDLESUBMIT WORKING?

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState<IMetar>()
  const [gafor, setGafor] = useState<IGafor>()
  const [NOSIG, setNOSIG] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loading = <Box sx={{ width: '100%' }}><CircularProgress color='secondary' /></Box>
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
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
    setNOSIG(nosig())
    // sendLogs()                           //! make it work!
    setIsLoading(false)
  }

  const precipitation = () => {
    if (metarCode?.Precipitation?.elements) {
      metarCode?.Precipitation?.elements.map((el) => {
        return <span>{el}</span>
      })
    }
  }
  const nosig = () => {                 //! not working
    if (metarCode?.NOSIG === true) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center">
      <h1>Quick & EEzy Metar</h1>
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
          <Box>
            {metarCode.Visibility === 'CAVOK' && <Sun />}
            {metarCode.Cloud_Layer !== undefined && metarCode.Cloud_Layer?.map((el) => {
              return <Cloud visibility={metarCode.Visibility} cloudBase={el.cloudBase} cloudLayer={el.cloudLayer} />
            })}
          </Box>
          <Typography>
            {metarCode?.Precipitation?.elements && metarCode?.Precipitation?.elements.map((el) => {
              return <span>{el}</span>
            })}
          </Typography>
          <Typography>{metarCode.Winds.speed} {metarCode.Winds.unit} from {metarCode.Winds.direction}°</Typography>
          <Typography>
            QNH {metarCode.QNH} hPa
          </Typography>
          {NOSIG === true && <Typography><span style={{ color: 'red' }}>NO SIG</span>nificant changes expected</Typography>}
          <Typography>{metarCode?.RawMetar}</Typography>
          
        </>
      }
    </Card>
    </>
  )
}

export default Metar