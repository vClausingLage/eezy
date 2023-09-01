import { useState, useEffect } from 'react'

import { fuelTypes } from '../assets/fuelTypes'

import { ICreateAircraft } from '../interfaces/IAaircraft'

import '../CSS/aircraft-form.css'

import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  InputAdornment,
  MenuItem
} from '@mui/material'

interface Props {
  user: string | undefined
  isAuthenticated: boolean
  createAircraft: (newAircraft: ICreateAircraft) => void
  createSuccess: boolean
  aircraft?: ICreateAircraft
}

function CreateAircraftForm ({
  user,
  isAuthenticated,
  createAircraft,
  createSuccess
}: Props) {
  const [newAircraft, setNewAircraft] = useState({
    id: null,
    user: '',
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

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        setNewAircraft({ ...newAircraft, user })
      }
    }
  }, [isAuthenticated, user])

  return (
    <>
      {user && (
        <form
          onSubmit={() => createAircraft(newAircraft)}
          className='aircraft-form'
        >
          <Box className='aircraft-form-column'>
            <TextField
              label='Manufacturer'
              placeholder='e.g. Cessna'
              required
              value={newAircraft.manufacturer}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, manufacturer: e.target.value })}
            />
            <TextField
              label='Model'
              placeholder='e.g. C172'
              required
              value={newAircraft.model}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, model: e.target.value })}
            />
            <TextField
              label='Type'
              placeholder='e.g. SP'
              value={newAircraft.type}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, type: e.target.value })}
            />
            <TextField
              label='Registration Number'
              placeholder='e.g. DKIFF'
              required
              value={newAircraft.registration_number}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  registration_number: e.target.value.toUpperCase()
                })}
            />
            <TextField
              select
              label='Fuel Type'
              placeholder='Fuel Type'
              value={newAircraft.fuel_type}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_type: e.target.value
                })}
            >
              {fuelTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Fuel Capacity (L)'
              placeholder='Fuel Capacity'
              type='number'
              required
              value={String(newAircraft.fuel_capacity)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>liters</InputAdornment>
                )
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_capacity: Number(e.target.value)
                })}
            />
          </Box>
          <Box className='aircraft-form-column'>
            <TextField
              label='Cruise Speed (KTS)'
              type='number'
              required
              value={String(newAircraft.cruise_speed)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>kts</InputAdornment>
                )
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_speed: Number(e.target.value)
                })}
            />
            <TextField
              label='Cruise Fuel Consumption (L)'
              type='number'
              required
              value={String(newAircraft.cruise_fuel_consumption)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>liters</InputAdornment>
                )
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_fuel_consumption: Number(e.target.value)
                })}
            />
            <TextField
              label='Magnetic Error (deg)'
              type='number'
              required
              value={String(newAircraft.magnetic_error)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>°</InputAdornment>
              }}
              onChange={(e) => {
                setNewAircraft({
                  ...newAircraft,
                  magnetic_error: Number(e.target.value)
                })
              }}
            />
            <TextField
              label='Color'
              placeholder='e.g. blue white'
              value={newAircraft.color}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, color: e.target.value })}
            />
            <FormGroup className='ifr-box'>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(e) =>
                      setNewAircraft({
                        ...newAircraft,
                        ifr: e.target.checked
                      })}
                  />
                }
                label='IFR rated?'
              />
            </FormGroup>

            <TextField
              label='Equipment'
              placeholder='e.g. VFR, G1000, Flarm...'
              value={newAircraft.equiptment}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, equiptment: e.target.value })}
            />
          </Box>
          <Box className='submit-box'>
            <Button
              onClick={() => createAircraft(newAircraft)}
              style={{ maxWidth: '100px' }}
              variant='contained'
            >
              save
            </Button>
            <Typography
              style={{
                color: 'gray',
                textAlign: 'left',
                alignSelf: 'center'
              }}
            >
              fields with{' '}
              <span style={{ fontWeight: 'bold', color: 'black' }}>*</span> are
              required
            </Typography>
          </Box>
          {createSuccess && <Alert severity='info'>created!</Alert>}
        </form>
      )}
    </>
  )
}

export default CreateAircraftForm
