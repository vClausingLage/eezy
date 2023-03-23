import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { calcLatLong } from "./helper/distance-lat-long-calc";

import "./Map.css";

import {
  MapContainer,
  TileLayer,
  // Marker,
  // Popup,
  // Polyline,
} from "react-leaflet";

function Map() {
  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );

  // const limeOptions = { color: "lime" };
  const center = { lat: 51.505, lng: -0.09 }; // [51.505, -0.09]
  // const polyline = [
  //   { lat: 51.505, lng: -0.09 },
  //   { lat: 51.51, lng: -0.1 },
  // ];

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
          <Typography>
            your selected aircraft: {selectedAircraft.manufacturer}{" "}
            {selectedAircraft.model} {selectedAircraft.registration_number}
          </Typography>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Polyline pathOptions={limeOptions} positions={polyline} /> */}
          </MapContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default Map;
