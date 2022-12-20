import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Form = () => {

  fetch('/api/aircraft', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => console.log(data))

  const [aircraftSelect, setAircraftSelect] = useState('')

  const handleChange = (event) => {
    setAircraftSelect(event.target.value)
  }

  return(
    <>
      <h1>Input</h1>
      <Box sx={{ margin: 'auto' , minWidth: 120 , maxWidth: '80%'}}>
        <FormControl fullWidth>
          <InputLabel id="ac-select-label">Aircraft</InputLabel>
          <Select
            labelId="ac-select-label"
            id="ac-select"
            value={aircraftSelect}
            label="Select Aircraft"
            onChange={handleChange}
          >
            <MenuItem value={10}>Cessna</MenuItem>
            <MenuItem value={20}>Beechcraft</MenuItem>
            <MenuItem value={30}>Piper</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
)}

export default Form