import Metar from './components/Metar'
import Aircraft from './components/aircraft.js'
import Map from './components/Map'

function App() {

  return (
    <>
      <h1>EEzy Flight Planner</h1>
      {/* <Aircraft /> */}
      <Metar />
      <Map />
    </>
  )
}

export default App;