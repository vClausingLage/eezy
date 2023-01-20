import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography, Card, Tooltip, Zoom } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './Metar/metar-regex'
import { precipitation, getFlightRules } from './Metar/metar-ui-helper'
import { IMetar, IFlightRule } from './Metar/assets/IMetar'

import Cloud from './Metar/assets/Cloud'
import Sun from './Metar/assets/Sun'
import Wind from './Metar/assets/Wind'

function Metar() {

// ! WHY IS HANDLESUBMIT WORKING?

  const [icao, setIcao] = useState('');
  const [metarCode, setMetarCode] = useState<IMetar>()
  const [flightRule, setFlightRule] = useState<IFlightRule>()
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
    setMetarCode(metarObj)
    let flightRules = getFlightRules(metarObj?.Visibility, metarObj?.Cloud_Layer[0]?.cloudBase)
    setFlightRule(flightRules)
    setNOSIG(metarObj.NOSIG)
    // sendLogs()                           //! make it work!
    console.log(metarObj)
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
    <Card>
    <Box
      id='Metar text input ICAO'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <Typography variant='h2'>Quick & EEzy Metar</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          type='search'
          label='enter ICAO Code'
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
      {isLoading && loading}
      {metarCode && 
        <Box 
        id='Metar Data'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        >
          <Typography variant='body1'>
            METAR submitted for {metarCode.Date.toUTCString()} 
          </Typography>
          <Tooltip title='Color Codes for Flight Rules, see bottom of page' arrow placement='top' TransitionComponent={Zoom}>
            <Typography style={{ backgroundColor: flightRule?.colorCode, textAlign: 'center', padding: '0.3rem' }}>
              {flightRule?.flightRule}
            </Typography>
          </Tooltip>
          <Typography>
            QNH {metarCode.QNH} hPa
          </Typography>
          <Typography>
            Temperature {metarCode.Temperature[0]} °C <br/>
            Dewpoint {metarCode.Temperature[1]} °C
          </Typography>
          <Box>
            {metarCode.Visibility === 'CAVOK' && <Sun />}
            {metarCode.Cloud_Layer !== undefined && metarCode.Cloud_Layer?.map((el, key) => {
              return <Cloud key={key} visibility={metarCode.Visibility} cloudBase={el.cloudBase} cloudLayer={el.cloudLayer} />
            })}
          </Box>
          <Typography>
            {metarCode?.Precipitation?.elements && metarCode?.Precipitation?.elements.map((el, key) => {
              return <span key={key}>{el}</span>
            })}
          </Typography>
          <Box style={{maxWidth: '250px'}}>
            <Wind {...metarCode?.Winds} />
          </Box>
          {String(NOSIG)}
          {NOSIG && <Typography><span style={{ color: 'red' }}>NO SIG</span>nificant changes expected</Typography>}
          <Typography>{metarCode?.RawMetar}</Typography>
          </Box>
      }
      </Card> 
    </>
  )
}

export default Metar