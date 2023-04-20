import { useSelector } from "react-redux";

import { Card, Box, Grid, CardContent, Typography, Alert } from "@mui/material";

import SelectedAircraft from "./components/SelectedAircraft";
import FlightCalculator from "./components/fuelCalculator";
import InputDestination from "./components/routeCalculator";

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
                    fuelCapacity={selectedAircraft.fuel_capacity}
                    fuelConsumption={selectedAircraft.cruise_fuel_consumption}
                    cruiseSpeed={selectedAircraft.cruise_speed}
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
