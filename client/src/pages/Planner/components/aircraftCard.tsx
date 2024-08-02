import '../CSS/aircraft-get.css'

import { IAircraft } from '../types/IAaircraft'

type Props = {
  aircraft: IAircraft
  selectAircraft: (aircraft: IAircraft) => void
}

function AircraftCard({ aircraft, selectAircraft }: Props) {
  return (
    <div>
      {aircraft && (
        <div>
          <h5 color='primary.main'>
            {aircraft.registration_number}
          </h5>
          <p>
            {aircraft.manufacturer} {aircraft.model}
          </p>
          <button onClick={() => selectAircraft(aircraft)}>select</button>
        </div>
      )}
    </div>
  )
}

export default AircraftCard
