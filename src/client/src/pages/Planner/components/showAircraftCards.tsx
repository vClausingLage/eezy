import AircraftCard from './aircraftCard'
import LoadingCircleDescription from '../../../ui/components/LoadingCircleDescription'

import { IAircraft } from '../types/IAaircraft'

import '../CSS/aircraft-card.css'
import { Alert } from '../../../ui/components/Alert'

type Props = {
  aircraftList: IAircraft[]
  loading: boolean
  selectAircraft: (aircraft: IAircraft) => void
  user?: string
}

function ShowAircraftCards({
  aircraftList,
  loading,
  selectAircraft,
  user
}: Props) {
  return (
    <div>
      {aircraftList.length === 0 && loading && (
        <LoadingCircleDescription description='Looking up Saved Aircraft' />
      )}

      {!user && (
        <Alert severity='info' heading='' text='You must be logged in to create and choose your aircraft' />
      )}

      <div>{aircraftList.length === 0 && <h3>no Aircraft found</h3>}</div>

      <div className='aircraft-container'>
        {aircraftList.map((ac: IAircraft) => (
          <AircraftCard
            key={ac.id}
            aircraft={ac}
            selectAircraft={(id) => selectAircraft(id)}
          />
        ))}
        <button className='rounded outline-1 outline-current'>add aircraft</button>
      </div>
    </div>
  )
}

export default ShowAircraftCards
