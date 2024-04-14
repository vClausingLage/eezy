import { useEffect, useState } from 'react'

import { TextFieldContainer } from '../../../ui/components/TextFields/textFieldContainer'

import { FlightTakeoff, FlightLand, Search } from '@mui/icons-material'
import calcLatLong from '../helper/distanceLatLongCalc'

import '../CSS/planner-calculator.css'
import { Alert } from '../../../ui/components/Alert'

type Props = {
  getDistance: (distance: number) => void
}

function RouteCalculator({ getDistance }: Props) {
  const [icaoDeparture, setIcaoDeparture] = useState('')
  const [icaoDestination, setIcaoDestination] = useState('')
  const [alertIcao, setAlertIcao] = useState(false)
  const [distance, setDistance] = useState<number | undefined>()

  useEffect(() => {
    if (icaoDeparture.length === 4 && icaoDestination.length === 4) {
      calculateRoute()
    } else {
      setDistance(undefined)
    }
  }, [icaoDeparture, icaoDestination])

  function handleDepartureInput(input: string): void {
    setIcaoDeparture(input.toUpperCase())
  }
  function handleDestinationInput(input: string): void {
    setIcaoDestination(input.toUpperCase())
  }

  //! missing dependecy
  function calculateRoute() {
    const fetchLatLong = async (
      icaoDeparture: string,
      icaoDestination: string
    ) => {
      setAlertIcao(false)
      const response = await fetch(
        `/api/airport/distance/${icaoDeparture},${icaoDestination}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const result = await response.json()
      console.log(result)
      if (result.length === 2) {
        setDistance(calcLatLong(result))
        setAlertIcao(false)
      } else {
        setAlertIcao(true)
      }
      if (distance) getDistance(distance) //! ???
    }
    icaoDeparture.length === 4 && icaoDestination.length === 4
      ? fetchLatLong(icaoDeparture, icaoDestination)
      : setAlertIcao(true)
  }

  return (
    <div>
      <h5 color='primary'>
        Departure & Destination
      </h5>
      <div className='flex center-items'>
        <div>
          <TextFieldContainer
            icon={<FlightTakeoff />}
            adornment='check'
            value={icaoDeparture}
            submit={(input: any) => handleDepartureInput(input)}
          />
          <TextFieldContainer
            icon={<FlightLand />}
            value={icaoDestination}
            adornment='check'
            submit={(input: any) => handleDestinationInput(input)}
          />
        </div>
        <div>
          <button
            onClick={calculateRoute}
            disabled={
              icaoDeparture.length !== 4 && icaoDestination.length !== 4
            }
          >
            <Search />
          </button>
        </div>
      </div>
      <div>
        {alertIcao && (
          <Alert severity='error' heading='error' text='proper ICAO Codes for Departure and Destination required'>
          </Alert>
        )}
      </div>
      {icaoDeparture.length === 4 && icaoDestination.length === 4 &&
        <div className='result-view'>
          <p className='font-bold'>
            distance from {icaoDeparture} to {icaoDestination} <br />
            {distance} nm
          </p>
        </div>
      }
    </div>
  )
}

export default RouteCalculator
