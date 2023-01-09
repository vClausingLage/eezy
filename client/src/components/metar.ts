import { useState, useEffect } from 'react'

import { TextField, Button } from "@mui/material"
import { Container } from '@mui/system'


function Metar() {

  const [input, setInput] = useState('')
  let [raw_metar, setRawMetar] = useState([])

  // const handleChange = event => {
  //   // const input = event.target.value.toUpperCase()
  //   setInput(event.target.value)
  // }

  let url = 'https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=' + input

  return(
    <>
      <TextField
        required
        id="airport-input"
        label="Airport"
        defaultValue={input}
        onChange={}
      />
      <Button 
        variant='contained'
        onClick={}>
      search
      </Button>
      <Container>
      </Container>
      
    </>
  )
}

export default Metar