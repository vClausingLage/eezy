import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  TextField,
  IconButton,
  Alert,
  Card
} from '@mui/material'

import { useAuth0 } from "@auth0/auth0-react";

import SearchIcon from '@mui/icons-material/Search'

import LoadingCircle from '../../general/LoadingCircle'
import DataPanel from './components/DataPanel'
import SVGPanel from './components/SVGPanel'
import AerodromeFrequencies from './components/AerodromeFrequencies'
import WordCloudICAO from './assets/WordCloudICAO.png'
import FlightRuleButton from './components/FlightRuleButton'

import {
  getFlightRules,
  convertDate,
  qnhRegex,
  tempoInformation
} from './helper/metarUiHelpers'
import {
  IMetarObject,
  IAirportObject,
  IMetarAPIObject
} from './types/IMetar'

import './CSS/index.css'

function Metar() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const [responseError, setResponse] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [alertIcao, setAlertIcao] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [airportObject, setAirportObject] = useState({} as IAirportObject)
  const [metarObject, setMetarObject] = useState({
    icao: '',
    tempUnit: '°C'
  } as IMetarObject)
  const [userMetadata, setUserMetadata] = useState(null);


  useEffect(() => {
    console.log(userMetadata)
    console.log('authenticated', isAuthenticated)
    console.log(user?.sub)
    const getUserMetadata = async () => {
      const domain = 'https://vincent-clausing.de'

      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${domain}`,
          // scope: "read:current_user",
        },
      });

      console.log('token', accessToken)

      const userDetailsByIdUrl = `${domain}/api/v2/users/${user?.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.user?.sub]);

  function tempUnitToggle(unit: string) {
    setMetarObject((prevMetarObject: IMetarObject) => ({
      ...prevMetarObject,
      tempUnit: unit === '°C' ? '°F' : '°C'
    }))
  }

  const loading = <LoadingCircle />

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const icao = event.target.value.toUpperCase()
    setMetarObject((prevMetarObject: IMetarObject) => ({
      ...prevMetarObject,
      icao
    }))
    setDisabled(icao.length !== 4)
    setAlertIcao(false)
  }

  async function searchMetar(e: React.SyntheticEvent) {
    e.preventDefault()
    if (metarObject.icao.length !== 4) {
      setAlertIcao(true)
      return
    }
    setIsLoading(true)
    const response = await fetch(`localhost:4001/api/metar/${metarObject.icao}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    const data: IMetarAPIObject = await response.json()
    console.log('API data', data)
    if (data.message && data.message === 'error') {
      setResponse(true)
      setIsLoading(false)
    } else {
      setResponse(false)
      setMetarObject((prevMetarObject: IMetarObject) => ({
        ...prevMetarObject,
        altim: {
          altim: data.altim,
          qnh: qnhRegex(data.rawOb)
        },
        CAVOK: /CAVOK/gi.test(data.rawOb)
          ? true
          : /CLR/gi.test(data.rawOb)
            ? true
            : !!/NCD/gi.test(data.rawOb),
        clouds: data.clouds,
        dewp: data.dewp,
        name: data.name,
        nosig: !!/NOSIG/gi.test(data.rawOb),
        rawMetar: data.rawOb,
        slp: data.slp,
        tempoInformation: tempoInformation(data.rawOb),
        temp: data.temp,
        time: convertDate(data.obsTime + '000'),
        visibility: {
          ...prevMetarObject.visibility,
          meters:
            data.visib === '6+'
              ? 9999
              : Math.round((Number(data.visib) * 1852) / 100) * 100,
          nm: Number(data.visib)
        },
        wspd: data.wspd,
        wdir: data.wdir,
        wgst: data.wgst,
        wxString: data.wxString
      }))
    }
    if (data.message && data.message === 'error') {
      setResponse(true)
      setIsLoading(false)
    } else {
      const airportDBresponse = await fetch(`/api/airport/${metarObject.icao}`)
      const airportDBData = await airportDBresponse.json()
      setAirportObject({
        frequencies: airportDBData.freqs,
        runways: airportDBData.runways
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (metarObject.visibility) {
      //! if (metarObject.visibility !== undefined)
      const flightRuleColor = getFlightRules(
        metarObject.CAVOK ? 'CAVOK' : metarObject.visibility.meters,
        metarObject.clouds
      )
      setMetarObject((prevMetarObject: IMetarObject) => ({
        ...prevMetarObject,
        flightRule: flightRuleColor
      }))
    }
  }, [metarObject.name, metarObject.CAVOK, metarObject.visibility, metarObject.clouds])

  return (
    <Card className='root'>
      {isAuthenticated && (
        <div>
          <p>bla user</p>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )}
      <Box className='metar-text-input-ICAO'>
        <Typography variant='h2'>Metar</Typography>
        <form onSubmit={searchMetar}>
          <TextField
            type='search'
            label='Enter ICAO Code'
            autoFocus
            spellCheck={false}
            value={metarObject.icao}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  type='submit'
                  onClick={searchMetar}
                  disabled={disabled}
                >
                  <SearchIcon />
                </IconButton>
              )
            }}
          />
        </form>
      </Box>
      {isLoading && loading}
      {alertIcao && (
        <Alert severity='error' className='alert'>
          Please provide an ICAO Code.
        </Alert>
      )}
      {responseError && (
        <Alert severity='error' className='alert'>
          No Data Received.
          <br />
          Check if a correct ICAO Code was provided or try again later.
        </Alert>
      )}
      {!isLoading && !metarObject.name && (
        <Box className='wordcloud'>
          <img src={WordCloudICAO} alt='wordcloud' />
        </Box>
      )}
      <Box className='metar-data'>
        {!isLoading && metarObject.name && (
          <>
            <Typography variant='h3'>
              {metarObject.name.split(',')[0].replace('/', ' ')}
            </Typography>
            <Typography
              className='type-flight-rule'
              style={{
                backgroundColor: metarObject.flightRule?.colorCode
              }}
            >
              {metarObject.flightRule?.flightRule}
            </Typography>

            <DataPanel
              altim={metarObject.altim.qnh}
              slp={metarObject.slp}
              temp={metarObject.temp}
              dewp={metarObject.dewp}
              tempUnit={metarObject.tempUnit}
              tempUnitToggle={tempUnitToggle}
              wxString={metarObject.wxString}
              visibilityMeters={metarObject.visibility.meters}
            />

            <SVGPanel
              clouds={metarObject.clouds}
              wspd={metarObject.wspd}
              wdir={metarObject.wdir}
              wgst={metarObject.wgst}
              runways={airportObject.runways}
              timeLocal={metarObject.time.local}
            />

            <Alert severity='info' className='alert'>
              <Typography>
                Metar issued at {metarObject.time.local}h (local time)
              </Typography>
              {metarObject.nosig && (
                <Typography id='NOSIG' sx={{ mt: 1, mb: 1 }}>
                  <span style={{ color: 'red' }}>NO SIG</span>nificant changes
                  expected
                </Typography>
              )}
            </Alert>

            <Box className='raw-metar'>
              <Typography>
                <span style={{ fontWeight: 'bold' }}>Raw Metar</span>{' '}
                {metarObject.rawMetar}
              </Typography>
            </Box>

            {airportObject.frequencies && (
              <AerodromeFrequencies frequencies={airportObject.frequencies} />
            )}

            <FlightRuleButton />
          </>
        )}
      </Box>
    </Card>
  )
}

export default Metar