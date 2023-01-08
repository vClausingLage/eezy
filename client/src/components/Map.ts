import './Map.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

const limeOptions = { color: 'lime' }
const center = [51.505, -0.09]
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1]
]
function App() {
  return (
    <div className="App">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
}

export default Map;