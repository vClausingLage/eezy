import { useState, useEffect } from 'react'

import { Box, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

import FuelCalculatorTextInput from './fuelCalculatorTextInput'

import { getRange } from '../helper/fuelCalculator'

import '../CSS/planner-calculator.css'

type Props = {
  fuelCapacity: number
  fuelConsumption: number
  cruiseSpeed: number
  distance?: number
}

function FlightCalculator({
  fuelCapacity,
  fuelConsumption,
  cruiseSpeed,
  distance,
}: Props) {
  const [fuelLoaded, setFuelLoaded] = useState<number>(fuelCapacity)
  const [fuelReserve, setFuelReserve] = useState<number>(0)
  const [fuelMaxAlert, setFuelMaxAlert] = useState(false)
  const [range, setRange] = useState<number | undefined>(0)

  useEffect(() => { //! set to hook, remove useEffect
    setRange(
      Math.round(
        getRange(fuelLoaded, fuelConsumption, cruiseSpeed, fuelReserve)
      )
    )
  }, [fuelLoaded, fuelReserve])

  function handleFuelChange(e: any) {
    if (e.target.value > fuelCapacity) {
      setFuelMaxAlert(true) // setFuelLoaded(Number(e.target.value))
    } else if (e.target.value !== undefined && e.target.value >= 0) {
      setFuelLoaded(Number(e.target.value))
      setFuelMaxAlert(false)
    }
  }
  function handleReserveChange(e: any): void {
    if (e.target.value >= 0) setFuelReserve(e.target.value)
  }
  function fuelReserveText(
    inputReserve: number | undefined,
    inputConsumption: number
  ): number {
    return inputReserve ? (inputConsumption / 60) * inputReserve : 0
  }
  function fuelCapacityText(input: number | undefined): number {
    return input || 0
  }
  function isRangeAlert(): boolean {
    if (distance && range && distance >= range) return true
    return false
  }

  return (
    <Card>
      <Typography variant='h5' color='primary.main'>
        Fuel Calculator
      </Typography>

      <Box>
        <FuelCalculatorTextInput
          label='Fuel'
          unit='liters'
          value={fuelLoaded}
          placeholder=''
          helperText={`of aircraftʼs ${fuelCapacityText(
            fuelCapacity
          )} liters max fuel`}
          handleChange={(e) => handleFuelChange(e)}
        />
        {fuelMaxAlert && (
          <Alert severity='error'>
            Fuel Load exceeds your Aircraftʼs max. Capacity!
          </Alert>
        )}
        {isRangeAlert() && (
          <Alert severity='error'>
            Distance to destination exceeds aircraftʼs maximum range!
          </Alert>
        )}
        <FuelCalculatorTextInput
          label='Reserve'
          unit='minutes'
          value={fuelReserve}
          placeholder='e.g. 45'
          helperText={`equals ${fuelReserveText(
            fuelReserve,
            fuelConsumption
          )} liters`}
          handleChange={(e) => handleReserveChange(e)}
        />
      </Box>

      <Box className='result-view'>
        <Typography fontWeight='bold'>
          max Range: {range} nautical miles <br /> distance to destination:{' '}
          {distance}
        </Typography>
      </Box>
      <Box className='attention-bar'>
        <Stack direction='row' alignItems='center'>
          <PriorityHighIcon color='warning' />
          <Typography color='warning.main'>ATTENTION</Typography>
        </Stack>
        <ul>
          <li>fuel calculations are guidelines not exact values</li>
          <li>
            always check your aircraftʼs flight manual, fuel consumption may
            vary for individual aircraft
          </li>
          <li>monitor your aircraftʼs fuel consumption of previous flights</li>
          <li>
            note that most GA aircraftʼs fuel inidcators are vague and do not
            indicate exact fuel amounts
          </li>
          <li>
            apply mixture according to altitude and fly at the manufacturerʼs
            recommended cruise RPM
          </li>
          <li>double check with your own calculations</li>
          <li>
            recommended fuel reserve is 30" (day), 45" (night) [
            <a
              href='https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-135/subpart-D/section-135.209'
              target='_blank'
              rel='noreferrer'
            >
              link
            </a>
            ]
          </li>
        </ul>
      </Box>
    </Card>
  )
}

export default FlightCalculator
