import { Card, CardContent, Typography, Button } from '@mui/material'

import '../CSS/aircraft-get.css'

import { IAircraft } from '../interfaces/IAaircraft'

interface Props {
  aircraft: IAircraft
  selectAircraft: (aircraft: IAircraft) => void
}

function AircraftCard ({ aircraft, selectAircraft }: Props) {
  return (
    <Card>
      {aircraft && (
        <CardContent>
          <Typography variant='h5' color='primary.main'>
            {aircraft.registration_number}
          </Typography>
          <Typography>
            {aircraft.manufacturer} {aircraft.model}
          </Typography>
          <Button onClick={() => selectAircraft(aircraft)}>select</Button>
        </CardContent>
      )}
    </Card>
  )
}

export default AircraftCard
