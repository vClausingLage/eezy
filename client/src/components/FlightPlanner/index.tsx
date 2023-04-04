import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import SelectedAircraft from "./components/SelectedAircraft";
import FlightCalculator from "./components/FlightCalculator";
import InputDestination from "./components/InputDestination";

function FlightPlanner() {
  //! dummy data
  const distance = 1000;

  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );

  return (
    <>
      <Card>
        <CardContent>
          <Alert severity="error">under construction</Alert>
          <Typography variant="h2">Flight Planner</Typography>
          {selectedAircraft && Object.keys(selectedAircraft).length > 0 && (
            <Box>
              <SelectedAircraft
                aircraft={{
                  manufacturer: selectedAircraft.manufacturer,
                  model: selectedAircraft.model,
                  registration_number: selectedAircraft.registration_number,
                }}
              />

              <Grid
                container
                justifyContent="center"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={4} md={6}>
                  <InputDestination />
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                  <FlightCalculator
                    distance={distance}
                    fuelCapacity={selectedAircraft.fuel_capacityL}
                    fuelConsumption={selectedAircraft.cruise_fuel_consumptionL}
                    cruiseSpeed={selectedAircraft.cruise_speedKTS}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {Object.keys(selectedAircraft).length === 0 && (
            <Alert severity="info">select your Aircraft</Alert>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default FlightPlanner;
