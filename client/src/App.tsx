import React, { useState, useEffect } from 'react'
import Metar from './components/metar'
import Aircraft from './components/aircraft.js'

function App() {

  return (
    <div>
      <h1>EEzy Flight Planner</h1>
      <Aircraft />
      <Metar />
    </div>
  )
}

export default App;