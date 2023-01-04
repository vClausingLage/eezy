import { useState, useEffect } from 'react'

import { TextField, Button } from "@mui/material"
import { Container } from '@mui/system'

function Metar() {

const [input, setInput] = useState('')
const [result, setResult] = useState([])

const handleChange = event => {
  // const input = event.target.value.toUpperCase()
  setInput(event.target.value)
}

function setDate() {
  let time = result[1]
  let today = new Date()
  let date = time + '/' + String(today.getMonth()) + String(today.getFullYear())
  return date
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
          setResult(metar)
        }}>
      search
      </Button>
      <Container>
        {setDate()}
      </Container>
      
    </>
  )
}

export default Metar