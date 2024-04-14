import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CloseIcon from '@mui/icons-material/Close'

import '../CSS/planner-card-selected.css'

type Props = {
  aircraft: {
    id: number | null
    manufacturer: string
    model: string
    registration_number: string
  }
  editAircraft: (id: number | null, user?: string) => void
  deleteAircraft: (i: number | null, user?: string) => void
  deselectAircraft: () => void
  user?: string
}

function SelectedAircraftCard({
  aircraft,
  editAircraft,
  deleteAircraft,
  deselectAircraft,
  user
}: Props) {
  return (
    <div className='card-aircraft-selected'>
      <h5 color='primary.main'>
        your Aircraft
      </h5>
      <p>
        {aircraft.manufacturer} {aircraft.model}
      </p>
      <p>{aircraft.registration_number}</p>
      <p className='aircraft-selected'>
        <button onClick={() => editAircraft(aircraft.id, user)}>
          <EditIcon color='primary' />
        </button>
        <button onClick={() => deleteAircraft(aircraft.id, user)}>
          <DeleteForeverIcon color='error' />
        </button>
        <button onClick={() => deselectAircraft()}>
          <CloseIcon color='error' />
        </button>
      </p>
    </div>
  )
}

export default SelectedAircraftCard
