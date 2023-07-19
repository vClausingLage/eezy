import React, { useState, useEffect } from "react";

import ShowAircraftCards from "./components/showAircraftCards";
import SelectedAircraftCard from "./components/selectedAircraftCard";
import FlightCalculator from "./components/fuelCalculator";
import RouteCalculator from "./components/routeCalculator";

import { Box, Card, CardContent, Alert, Typography, Grid } from "@mui/material";

import { IAircraft } from "./interfaces/aircraft";

type Props = {
  user?: string;
  isAuthenticated: boolean;
};

function FlightPlanner({ user, isAuthenticated }: Props) {
  const [aircraftList, setAircraftList] = useState([] as IAircraft[]);
  const [aircraft, setAircraft] = useState({} as IAircraft);
  const [loading, setLoading] = useState(false);

  const isAircraftSelected = () => Object.keys(aircraftList).length > 0;

  const {
    manufacturer,
    model,
    registration_number,
    fuel_capacity,
    cruise_fuel_consumption,
    cruise_speed,
  } = aircraft;

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchAircraft = async () => {
        const response = await fetch(`/api/aircraft/create/${user}`);
        const result = await response.json();
        if (result.message === "fetched") {
          setAircraftList(result.data);
          setLoading(false);
        } else if (result.message === "no aircraft") {
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      if (aircraftList.length === 0 && isAuthenticated) {
        setLoading(true);
        fetchAircraft();
      }
    }
  }, []);

  const editAircraft = async (id: number | null, user?: string) => {
    if (id && user) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "update",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log("edited", result.data);
    }
  };

  const deleteAircraft = async (id: number | null, user?: string) => {
    if (id && user) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.message === "created") {
        console.log("deleted", result.data);
      }
    }
  };

  const selectAircraft = (aircraft: IAircraft) => {
    if (aircraft) setAircraft(aircraft);
  };

  const getDistance = (distance: number) => {
    console.log(distance);
  };

  return (
    <>
      <ShowAircraftCards
        aircraftList={aircraftList}
        loading={loading}
        editAircraft={editAircraft}
        deleteAircraft={deleteAircraft}
        selectAircraft={(id) => selectAircraft(id)}
        aircraft={aircraft}
        user={user}
      />
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
                  <RouteCalculator getDistance={() => getDistance} />
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                  <FlightCalculator
                    fuelCapacity={fuel_capacity}
                    fuelConsumption={cruise_fuel_consumption}
                    cruiseSpeed={cruise_speed}
                    // distance={distance}
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
    </>
  );
}

export default FlightPlanner;
