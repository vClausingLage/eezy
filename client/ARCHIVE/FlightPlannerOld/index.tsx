import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";

import SelectedAircraftCard from "./components/selectedAircraftCard";
import FlightCalculator from "./components/fuelCalculator";
import RouteCalculator from "./components/routeCalculator";

type Props = {
  user?: string;
  isAuthenticated: boolean;
};

interface Aircraft {
  manufacturer: string;
  model: string;
  registration_number: string;
  fuel_capacity: number;
  cruise_fuel_consumption: number;
  cruise_speed: number;
}

function FlightPlanner({ user, isAuthenticated }: Props) {
  const [distance, setDistance] = useState<number | undefined>();

  const selectedAircraft: Aircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );

  const isAircraftSelected = () => Object.keys(selectedAircraft).length > 0;

  const {
    manufacturer,
    model,
    registration_number,
    fuel_capacity,
    cruise_fuel_consumption,
    cruise_speed,
  } = selectedAircraft;

  function getDistance(input: number) {
    console.log(input);
    setDistance(input);
  }

  return (
    <Card>
      <CardContent>
        <Alert severity="error">under construction</Alert>
        <Typography variant="h2">Flight Planner</Typography>
        {isAircraftSelected() && (
          <Box>
            <SelectedAircraftCard
              aircraft={{
                manufacturer,
                model,
                registration_number,
              }}
            />

            <Grid
              container
              justifyContent="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={6}>
                <RouteCalculator getDistance={(input) => getDistance(input)} />
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <FlightCalculator
                  fuelCapacity={fuel_capacity}
                  fuelConsumption={cruise_fuel_consumption}
                  cruiseSpeed={cruise_speed}
                  distance={distance}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {!isAircraftSelected() && (
          <Alert severity="info">select your Aircraft</Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default FlightPlanner;
