import { Box, Alert } from "@mui/material";

import AircraftCard from "./aircraftCard";
import LoadingCircleDescription from "../../../general/LoadingCircleDescription";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-card.css";

type Props = {
  aircraftList: IAircraft[];
  loading: boolean;
  selectAircraft: (aircraft: IAircraft) => void;
  aircraft?: IAircraft;
  user?: string;
};

function ShowAircraftCards({
  aircraftList,
  loading,
  selectAircraft,
  aircraft,
  user,
}: Props) {
  return (
    <Box>
      {aircraftList.length === 0 && loading && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {!user && (
        <Alert severity="info">
          You must be logged in to create and choose your aircraft.
        </Alert>
      )}

      <Box>{aircraftList.length === 0 && <h3>no Aircraft found</h3>}</Box>

      <Box className="aircraft-container">
        {aircraftList.map((ac: IAircraft) => (
          <AircraftCard
            key={ac.id}
            aircraft={ac}
            selectAircraft={(id) => selectAircraft(id)}
            selectedAircraft={aircraft}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ShowAircraftCards;
