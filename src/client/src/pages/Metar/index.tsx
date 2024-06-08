import { useState, useEffect } from 'react'

import { API_SERVER } from '../../constants/constants';

import { useAuth0 } from "@auth0/auth0-react";

import SearchIcon from '@mui/icons-material/Search'

import LoadingCircle from '../../ui/loadingCircle'
import DataPanel from './components/DataPanel'
import SVGPanel from './components/SVGPanel'
import AerodromeFrequencies from './components/AerodromeFrequencies'
import WordCloudICAO from './assets/WordCloudICAO.png'
import FlightRuleButton from './components/FlightRuleButton'

const Metar = () => {
    const { getAccessTokenSilently } = useAuth0()

    const [responseError, setResponse] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [alertIcao, setAlertIcao] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [airportObject, setAirportObject] = useState({} as any)
    const [metarObject, setMetarObject] = useState({} as any)
    const [icao, setIcao] = useState('' as string)

    function tempUnitToggle(unit: string) {
        setMetarObject((prevMetarObject: any) => ({ //! type
            ...prevMetarObject,
            tempUnit: unit === '°C' ? '°F' : '°C'
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const icao = event.target.value.toUpperCase()
        setMetarObject((prevMetarObject: any) => ({//! type
            ...prevMetarObject,
            icao
        }))
        setDisabled(icao.length !== 4)
        setAlertIcao(false)
    }

    const searchMetar = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (icao.length !== 4) {
            setAlertIcao(true)
            return
        }
        setIsLoading(true)
        const token = await getAccessTokenSilently({
            // authorizationParams: { audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/` }
        });
        const response = await fetch(`${API_SERVER}/api/metar/${icao}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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
        }
        setIsLoading(false)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        searchMetar(e)
    }

    { isLoading && <LoadingCircle /> }

    return (
        <div className="flex justify-center content-center bg-pink-700 py-24">
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    id="icao-input"
                    className="shadow-md rounded-lg p-4 text-2xl focus:ring-pink-700 focus:ring-opacity-50"
                    value={icao}
                    onChange={e => setIcao(e.target.value)}
                />
                <label
                    htmlFor="icao-input"
                    className="text-2xl p-4"
                >
                    ICAO
                </label>
            </form>
        </div>
    )
}

export default Metar