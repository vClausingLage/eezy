import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography, Card, Tooltip, Zoom } from '@mui/material'

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from './Metar/metar-regex'
import { precipitation, getGafor } from './Metar/metar-ui-helper'
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
    setMetarCode(metarObj)
    let gafor = getGafor(metarObj.Visibility, metarObj?.Cloud_Layer[0]?.cloudBase)
    setGafor(gafor)
    setNOSIG(metarObj.NOSIG)
    // sendLogs()                           //! make it work!
    console.log(metarObj)
    console.log('nosig', NOSIG)
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
    <Box 
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <h1>Quick & EEzy Metar</h1>
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
    <Card>
      {isLoading && loading}
      {metarCode && 
        // ! needed nesting <></> ???
        <>
          <Typography>
            METAR submitted for {metarCode.Date.toString()}</Typography>
          <Typography>
            Flight Rules (GAFOR Code) <Tooltip title='GAFOR Code, see description on bottom of page' arrow placement='right' TransitionComponent={Zoom}><span style={{ color: gafor?.ColorCode }}>{gafor?.GaforCode}</span></Tooltip>
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
          <Typography>
            {metarCode.Winds && metarCode.Winds.speed} {metarCode.Winds && metarCode.Winds.unit} from {metarCode.Winds && metarCode.Winds.direction}{metarCode.Winds && typeof(metarCode.Winds.direction) === 'number'? '°' : '° variation'}
          </Typography>
          <Typography>
            QNH {metarCode.QNH} hPa
          </Typography>
          {NOSIG && <Typography><span style={{ color: 'red' }}>NO SIG</span>nificant changes expected</Typography>}
          <Typography>{metarCode?.RawMetar}</Typography>
          
        </>
      }
    </Card>
    </>
  )
}

export default Metar