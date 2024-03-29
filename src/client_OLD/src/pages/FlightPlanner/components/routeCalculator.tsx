import { useEffect, useState } from 'react'

import TextFieldContainer from '../../../general/TextFields/textFieldContainer'

import { Typography, Box, Card, Alert, IconButton } from '@mui/material'
import { FlightTakeoff, FlightLand, Search } from '@mui/icons-material'
import calcLatLong from '../helper/distanceLatLongCalc'

import '../CSS/planner-calculator.css'

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
    <Card>
      <Typography variant='h5' color='primary'>
        Departure & Destination
      </Typography>
      <Box display='flex' alignItems='center'>
        <Box>
          <TextFieldContainer
            icon={<FlightTakeoff />}
            adornment='check'
            value={icaoDeparture}
            submit={(input) => handleDepartureInput(input)}
          />
          <TextFieldContainer
            icon={<FlightLand />}
            value={icaoDestination}
            adornment='check'
            submit={(input) => handleDestinationInput(input)}
          />
        </Box>
        <Box>
          <IconButton
            onClick={calculateRoute}
            disabled={
              icaoDeparture.length !== 4 && icaoDestination.length !== 4
            }
          >
            <Search />
          </IconButton>
        </Box>
      </Box>
      <Box>
        {alertIcao && (
          <Alert severity='error'>
            <Typography>
              proper ICAO Codes for Departure and Destination required!
            </Typography>
          </Alert>
        )}
      </Box>
      {icaoDeparture.length === 4 && icaoDestination.length === 4 &&
        <Box className='result-view'>
          <Typography fontWeight='bold'>
            distance from {icaoDeparture} to {icaoDestination} <br />
            {distance} nm
          </Typography>
        </Box>
      }
    </Card>
  )
}

export default RouteCalculator
