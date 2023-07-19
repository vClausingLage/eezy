import { Box } from "@mui/material";

import AircraftCard from "./aircraftCard";
import LoadingCircleDescription from "../../../general/LoadingCircleDescription";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-card.css";

type Props = {
  aircraftList: IAircraft[];
  loading: boolean;
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  selectAircraft: (aircraft: IAircraft) => void;
  aircraft?: IAircraft;
  user?: string;
};

function ShowAircraftCards({
  aircraftList,
  loading,
  editAircraft,
  deleteAircraft,
  selectAircraft,
  aircraft,
  user,
}: Props) {
  return (
    <Box className="aircraft-container">
      {aircraftList.length === 0 && loading && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {aircraftList.length === 0 && <h3>no Aircraft found</h3>}

      <Box className="aircraft-container">
        {aircraftList.map((ac: IAircraft) => (
          <AircraftCard
            key={ac.registration_number}
            aircraft={ac}
            editAircraft={editAircraft}
            deleteAircraft={deleteAircraft}
            selectAircraft={(id) => selectAircraft(id)}
            selectedAircraft={aircraft}
            user={user}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ShowAircraftCards;
