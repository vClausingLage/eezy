import { useState, useEffect } from 'react'

import { API_SERVER } from '../../constants/constants';

import { useAuth0 } from "@auth0/auth0-react";

import { IMetarObject } from './types';

import LoadingCircle from '../../ui/loadingCircle'
import { DataPanel } from './components/DataPanel'
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
    const [metarObject, setMetarObject] = useState({} as IMetarObject)
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
        setMetarObject(data)
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

    console.log('metarObject', metarObject)

    { isLoading && <LoadingCircle /> }

    return (
        <div>
            {/* INPUT */}
            <div className="flex justify-center content-center bg-pink-700 py-24">
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        id="icao-input"
                        className="shadow-md rounded-lg p-4 text-2xl outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50"
                        value={icao}
                        onChange={e => setIcao(e.target.value)}
                    />
                    {/*! ADD SEARCH ICON */}
                    <label
                        htmlFor="icao-input"
                        className="text-2xl p-4"
                    >
                        ICAO
                    </label>
                </form>
            </div>

            {/* RESULT */}
            <div>
                {/* DATA PANEL */}
                <div className='grid grid-cols-3 mx-24 my-6 gap-4'>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            TEMP
                        </div>
                        <div className='text-green-700'>
                            {metarObject?.decodedMetar?.temperature?.temp}{metarObject?.decodedMetar?.temperature?.unit}
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            VISIBILITY
                        </div>
                        <div className='text-green-700'>
                            {metarObject?.decodedMetar?.visibility?.value}{metarObject?.decodedMetar?.visibility?.unit}
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            PRECIPITATION
                        </div>
                        <div className='text-green-700'>
                            {metarObject?.decodedMetar?.precipitation}
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 mx-24 my-6 gap-4'>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            XXXX
                        </div>
                        <div className='text-green-700'>
                            {metarObject?.decodedMetar?.temperature?.temp}°C
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            AIR PRESSURE ({metarObject?.decodedMetar?.air_pressure?.pressure})
                        </div>
                        <div className='text-green-700'>
                            {metarObject?.decodedMetar?.air_pressure?.value} {metarObject?.decodedMetar?.air_pressure?.unit}
                        </div>
                    </div>
                    <div className='flex flex-col rounded-lg border-2 border-green-700 text-center'>
                        <div className='bg-green-700 text-white'>
                            ZZZZ
                        </div>
                        <div className='text-green-700'>
                            zzzzzzz
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Metar