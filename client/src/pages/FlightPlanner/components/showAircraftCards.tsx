import { IAircraft } from "../interfaces/aircraft";

import { Box } from "@mui/material";

import AircraftCard from "./aircraftCard";
import LoadingCircleDescription from "../../../General/LoadingCircleDescription";

type Props = {
  aircraft: IAircraft[];
  loading: boolean;
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  user?: string;
};

function ShowAircraftCards({
  aircraft,
  loading,
  editAircraft,
  deleteAircraft,
  user,
}: Props) {
  console.log(aircraft);

  return (
    <Box className="aircraft-container">
      {aircraft.length === 0 && loading && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {aircraft.length === 0 && <h3>no Aircraft found</h3>}

      {aircraft.map((ac: IAircraft) => (
        <AircraftCard
          key={ac.registration_number}
          aircraft={ac}
          editAircraft={editAircraft}
          deleteAircraft={deleteAircraft}
          user={user}
        />
      ))}
    </Box>
  );
}

export default ShowAircraftCards;
