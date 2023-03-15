import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { calcLatLong } from "../helper/distance-lat-long-calc";

import placeholderMap from "./placeholderMap.jpg";

import "./Map.css";

import { IAircraft } from "../Aircraft/interfaces/aircraft";

// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

// const limeOptions = { color: 'lime' }
// const center = [51.505, -0.09]
// const polyline = [
//   [51.505, -0.09],
//   [51.51, -0.1]
// ]

type Props = {
  activeAircraft: IAircraft;
};

function Map(props: Props) {
  let latLong = `N 54° 22' 46,09'', E 10° 08' 42,54''`;

  latLong = calcLatLong(latLong);

  return (
    <>
      <Card>
        <CardContent>
          <Alert severity="error">
            This is a placeholder | under construction
          </Alert>
          <Typography variant="h2">Flight Planner</Typography>
          <img src={placeholderMap} alt="map" />
          {/* <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline pathOptions={limeOptions} positions={polyline} />
        </MapContainer> */}
        </CardContent>
      </Card>
    </>
  );
}

export default Map;
