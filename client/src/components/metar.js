import { useState } from 'react'

import { TextField, Button } from "@mui/material"
import { GetApp } from '@mui/icons-material'

function Metar() {

const [input, setInput] = useState('')

const handleChange = event => {
  setInput(event.target.value)
}
const handleAction = () => {
  console.log(input)
  
}



  return(
    <>
      <TextField
        required
        id="airport-input"
        label="Airport"
        defaultValue={input}
        onChange={handleChange}
      />
      <Button 
        variant='contained'
        onClick={async () => {
          const metar = await fetch('https://www.aviationweather.gov/adds/dataserver_current/current/' + 'httpparam?datasource=metars& requesttype=retrieve&format=xml&stationString=' + input, {
            headers: {
              
            }
          })
          console.log(metar.json())
        }}>
      search
      </Button>
    </>
  )
}

export default Metar