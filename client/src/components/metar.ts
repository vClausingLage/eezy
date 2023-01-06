import { useState, useEffect } from 'react'

import { TextField, Button } from "@mui/material"
import { Container } from '@mui/system'

import { formatDate, mapToObj, winds } from './metar_helper-functions'

function Metar() {

  const [input, setInput] = useState('')
  let [raw_metar, setRawMetar] = useState([])

  const handleChange = event => {
    // const input = event.target.value.toUpperCase()
    setInput(event.target.value)
  }

  let url = 'https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=' + input

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
          const res = await fetch(url)
          const data = await res.text()
          let metar = data.split('\n')
          metar = metar[0].split(' ')
          setRawMetar(metar)
        }}>
      search
      </Button>
      <Container>
        {raw_metar.length > 0 && raw_metar} <br></br>
        {raw_metar.length > 0 && formatDate(raw_metar)} <br></br>
        {raw_metar.length > 0 && mapToObj(raw_metar)} <br></br>
      </Container>
      
    </>
  )
}

export default Metar