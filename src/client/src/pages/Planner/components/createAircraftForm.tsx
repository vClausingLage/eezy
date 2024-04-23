import { useState } from 'react'

import { fuelTypes } from '../assets/fuelTypes'

import { ICreateAircraft } from '../types/IAaircraft'

import '../CSS/aircraft-form.css'
import { Alert } from '../../../ui/alert'

type Props = {
  user?: string
  isAuthenticated?: boolean
  createAircraft: (newAircraft: ICreateAircraft) => void
  createSuccess: boolean
  aircraft?: ICreateAircraft
}

function CreateAircraftForm({
  user,
  isAuthenticated,
  createAircraft,
  createSuccess
}: Props) {
  const [newAircraft, setNewAircraft] = useState({
    id: null,
    user: isAuthenticated ? user : '',
    manufacturer: '',
    model: '',
    type: '',
    registration_number: '',
    fuel_type: '',
    fuel_capacity: undefined,
    cruise_fuel_consumption: undefined,
    cruise_speed: undefined,
    magnetic_error: undefined,
    color: '',
    IFR: false,
    equiptment: ''
  } as ICreateAircraft)

  return (
    <>
      {user && (
        <form
          onSubmit={() => createAircraft(newAircraft)}
          className='aircraft-form'
        >
          <div className='aircraft-form-column'>
            <label htmlFor="manufacturer">manufacturer</label>
            <input
              type='text'
              placeholder='e.g. Cessna'
              required
              value={newAircraft.manufacturer}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, manufacturer: e.target.value })}
            />
            <label htmlFor="manufacturer">model</label>
            <input
              type='text'
              placeholder='e.g. C172'
              required
              value={newAircraft.model}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, model: e.target.value })}
            />
            <label htmlFor="type">manufacturer</label>
            <input
              type='text'
              placeholder='e.g. SP'
              value={newAircraft.type}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, type: e.target.value })}
            />
            <label htmlFor="registration number">manufacturer</label>
            <input
              type='text'
              placeholder='e.g. DKIFF'
              required
              value={newAircraft.registration_number}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  registration_number: e.target.value.toUpperCase()
                })}
            />
            <label htmlFor="fuel type">manufacturer</label>
            <input
              type="select"
              value={newAircraft.fuel_type}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_type: e.target.value
                })}
            >
              {fuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </input>
            <label htmlFor="fuel capacity (L)">manufacturer</label>
            <input
              placeholder='Fuel Capacity'
              type='number'
              required
              value={String(newAircraft.fuel_capacity)}
              name='liters'
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_capacity: Number(e.target.value)
                })}
            />
          </div>
          <div className='aircraft-form-column'>
            <label htmlFor="cruise speed (kts)">manufacturer</label>
            <input
              type='number'
              required
              value={String(newAircraft.cruise_speed)}
              name='kts'
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_speed: Number(e.target.value)
                })}
            />
            <label htmlFor="cruise fuel consumption (L)">manufacturer</label>
            <input
              type='number'
              required
              value={String(newAircraft.cruise_fuel_consumption)}
              name='liters'
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_fuel_consumption: Number(e.target.value)
                })}
            />
            <label htmlFor="magnetic error (deg)">manufacturer</label>
            <input
              type='number'
              required
              value={String(newAircraft.magnetic_error)}
              name='°'
              onChange={(e) => {
                setNewAircraft({
                  ...newAircraft,
                  magnetic_error: Number(e.target.value)
                })
              }}
            />
            <label htmlFor="color">manufacturer</label>
            <input
              placeholder='e.g. blue white'
              value={newAircraft.color}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, color: e.target.value })}
            />
            <div className='ifr-box'>
              <label htmlFor="ifr">manufacturer</label>
              <input
                onChange={(e) =>
                  setNewAircraft({
                    ...newAircraft,
                    ifr: e.target.checked
                  })}
              />
            </div>

            <label htmlFor="equipment">manufacturer</label>
            <input
              placeholder='e.g. VFR, G1000, Flarm...'
              value={newAircraft.equiptment}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, equiptment: e.target.value })}
            />
          </div>
          <div className='submit-box'>
            <button
              onClick={() => createAircraft(newAircraft)}
            >
              save
            </button>
            <p
              style={{
                color: 'gray',
                textAlign: 'left',
                alignSelf: 'center'
              }}
            >
              fields with{' '}
              <span style={{ fontWeight: 'bold', color: 'black' }}>*</span> are
              required
            </p>
          </div>
          {createSuccess && <Alert severity='info' heading='created' text='' />}
        </form>
      )}
    </>
  )
}

export default CreateAircraftForm
