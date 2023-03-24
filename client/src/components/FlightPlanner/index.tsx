import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import SelectedAircraft from "./components/SelectedAircraft";

import { calcLatLong } from "./helper/distance-lat-long-calc";

function FlightPlanner() {
  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );

  return (
    <>
      <Card>
        <CardContent>
          <Alert severity="error">under construction</Alert>
          <Typography variant="h2">Flight Planner</Typography>
          <Typography>
            <SelectedAircraft
              aircraft={{
                manufacturer: selectedAircraft.manufacturer,
                model: selectedAircraft.model,
                registration_number: selectedAircraft.registration_number,
              }}
            />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default FlightPlanner;
