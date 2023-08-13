import React, { useState, useEffect } from "react";

import ShowAircraftCards from "./components/showAircraftCards";
import SelectedAircraftCard from "./components/selectedAircraftCard";
import FlightCalculator from "./components/fuelCalculator";
import RouteCalculator from "./components/routeCalculator";
import CreateAircraftForm from "./components/createAircraftForm";

import { Box, Card, CardContent, Alert, Typography, Grid } from "@mui/material";

import { IAircraft, ICreateAircraft } from "./interfaces/IAaircraft";

type Props = {
  user?: string;
  isAuthenticated: boolean;
};

function FlightPlanner({ user, isAuthenticated }: Props) {
  const [aircraftList, setAircraftList] = useState([] as IAircraft[]);
  const [aircraft, setAircraft] = useState({} as IAircraft);
  const [loading, setLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const isAircraftSelected = () => Object.keys(aircraft).length > 0;

  const {
    id,
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

  async function createAircraft(newAircraft: ICreateAircraft): Promise<any> {
    console.log(newAircraft);
    if (isAuthenticated) {
      try {
        const response = await fetch("/api/aircraft/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAircraft),
        });
        const result = await response.json();
        if (result.message === "created") {
          setAircraft(result);
          setCreateSuccess(true);
          setTimeout(() => {
            setCreateSuccess(false);
          }, 2000);
        }
      } catch (error) {
        console.log("error getAircarft", error);
      }
    }
  }

  const editAircraft = async (
    id: number | null,
    user?: string
  ): Promise<any> => {
    try {
      if (id && user) {
        const response = await fetch(`/api/aircraft/create/${id}`, {
          method: "update",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        console.log("edited", result.data);
      }
    } catch (error) {
      console.log("error editAircraft", error);
    }
  };

  const deleteAircraft = async (
    id: number | null,
    user?: string
  ): Promise<any> => {
    try {
      if (id && user) {
        const response = await fetch(`/api/aircraft/create/${id}${user}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.message === "deleted") {
          setAircraftList(result.data);
        }
      }
    } catch (error) {
      console.log("error deleteAircraft", error);
    }
  };

  const selectAircraft = (aircraft: IAircraft): void => {
    if (aircraft) setAircraft(aircraft);
  };

  const deselectAircraft = (): void => {
    setAircraft({} as IAircraft);
  };

  const getDistance = (distance: number) => {
    console.log(distance);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h2">Flight Planner</Typography>
          {!isAircraftSelected() && (
            <Box>
              <Alert severity="info">select your Aircraft</Alert>
              <ShowAircraftCards
                aircraftList={aircraftList}
                loading={loading}
                selectAircraft={(id) => selectAircraft(id)}
                user={user}
              />
            </Box>
          )}
          {isAircraftSelected() && (
            <Box>
              <SelectedAircraftCard
                aircraft={{
                  id,
                  manufacturer,
                  model,
                  registration_number,
                }}
                editAircraft={editAircraft}
                deleteAircraft={deleteAircraft}
                deselectAircraft={deselectAircraft}
                user={user}
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
                    //! distance={distance}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>

        <CardContent>
          <CreateAircraftForm
            user={user}
            isAuthenticated={isAuthenticated}
            createAircraft={createAircraft}
            createSuccess={createSuccess}
            aircraft={aircraft}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default FlightPlanner;
