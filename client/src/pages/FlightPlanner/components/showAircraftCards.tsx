import { Box } from "@mui/material";

import AircraftCard from "./aircraftCard";
import LoadingCircleDescription from "../../../general/LoadingCircleDescription";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-card.css";

type Props = {
  aircraft: IAircraft[];
  loading: boolean;
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  selectAircraft: (id: number | null) => void;
  selectedAircraft?: number;
  user?: string;
};

function ShowAircraftCards({
  aircraft,
  loading,
  editAircraft,
  deleteAircraft,
  selectAircraft,
  selectedAircraft,
  user,
}: Props) {
  return (
    <Box className="aircraft-container">
      {aircraft.length === 0 && loading && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {aircraft.length === 0 && <h3>no Aircraft found</h3>}

      <Box className="aircraft-container">
        {aircraft.map((ac: IAircraft) => (
          <AircraftCard
            key={ac.registration_number}
            aircraft={ac}
            editAircraft={editAircraft}
            deleteAircraft={deleteAircraft}
            selectAircraft={(id) => selectAircraft(id)}
            selectedAircraft={selectedAircraft}
            user={user}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ShowAircraftCards;
