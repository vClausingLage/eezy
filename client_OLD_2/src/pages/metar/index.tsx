import { useState } from 'react'

// AUTH
import { useAuth0 } from "@auth0/auth0-react"

//MUI
import {
    Typography,
    Box,
    TextField,
    IconButton,
    Alert,
    Card
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

// CSS
import './CSS/index.css'

// COMPONENTS
import DataPanel from './components/DataPanel'
import SVGPanel from './components/SVGPanel'
import AerodromeFrequencies from './components/AerodromeFrequencies'
import FlightRuleButton from './components/FlightRuleButton'
import LoadingCircle from '../../../../client/src/general/LoadingCircle'
import WordCloudICAO from './assets/wordcloud-icao.png'

// TYPES
import {
    IMetar,
    IAirportObject,
} from './types/IMetar'

export default function Metar() {
    const { getAccessTokenSilently } = useAuth0()

    const [responseError, setResponse] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [alertIcao, setAlertIcao] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [airportObject, setAirportObject] = useState({ frequencies: [], runways: [] } as IAirportObject) //useState({} as IAirportObject)
    const [metarObject, setMetarObject] = useState({} as IMetar) //useState({} as IMetar)

    const loading = <LoadingCircle />

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const icao = event.target.value.toUpperCase()
        setMetarObject((prevMetarObject: IMetar) => ({
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
        const token = await getAccessTokenSilently({
            // authorizationParams: { audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/` }
        });
        const response = await fetch(`http://localhost:4001/api/metar/${metarObject.icao}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        const data = await response.json()
        console.log('API data', data)
        if (data.message && data.message === 'error') {
            setResponse(true)
            setIsLoading(false)
        } else {
            setResponse(false)
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

    return (
        <Card className='root'>
            <Box className='metar-text-input-ICAO'>
                <Typography variant='h2'>Metar</Typography>
                <form onSubmit={searchMetar}>
                    <TextField
                        type='search'
                        label='Enter ICAO Code'
                        autoFocus
                        spellCheck={false}
                        value={metarObject.icao || ''}
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
            {!isLoading && !metarObject && (
                <Box className='wordcloud'>
                    <img src={WordCloudICAO} alt='wordcloud' />
                </Box>
            )}
            <Box className='metar-data'>
                {!isLoading && metarObject && (
                    <>
                        <Typography variant='h3'>
                            {metarObject.name}
                        </Typography>
                        <Typography
                            className='type-flight-rule'
                            style={{
                                // backgroundColor: metarObject.flightRule?.colorCode
                            }}
                        >
                            {/* {metarObject.flightRule?.flightRule} */}
                        </Typography>

                        <DataPanel
                        // altim={metarObject.altim.qnh}
                        // slp={metarObject.slp}
                        // temp={metarObject.temp}
                        // dewp={metarObject.dewp}
                        // tempUnit={metarObject.tempUnit}
                        // tempUnitToggle={tempUnitToggle}
                        // wxString={metarObject.wxString}
                        // visibilityMeters={metarObject.visibility.meters}
                        />

                        <SVGPanel
                        // clouds={metarObject.clouds}
                        // wspd={metarObject.wspd}
                        // wdir={metarObject.wdir}
                        // wgst={metarObject.wgst}
                        // runways={airportObject.runways}
                        // timeLocal={metarObject.time.local}
                        />

                        <Alert severity='info' className='alert'>
                            <Typography>
                                {/* Metar issued at {metarObject.time.local}h (local time) */}
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
                                {/* {metarObject.rawMetar} */}
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