import {
  Card,
  IconButton,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "../CSS/aircraft-get.css";

import { IAircraft } from "../interfaces/aircraft";

type Props = {
  aircraft: IAircraft;
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  user?: string;
};

function AircraftCard({ aircraft, editAircraft, deleteAircraft, user }: Props) {
  return (
    <Card>
      {aircraft && (
        <CardContent>
          <Typography>
            {aircraft.manufacturer} {aircraft.model}
          </Typography>
          <Typography>{aircraft.registration_number}</Typography>
          <Button
            onClick={() => {
              // dispatch(aircraftSelected(aircraft));
            }}
          >
            select Aircraft
          </Button>
          <Typography className="aircraft-selected">
            <IconButton onClick={() => editAircraft(aircraft.id, user)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => deleteAircraft(aircraft.id, user)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
            <CheckIcon
              color={
                aircraft.registration_number === aircraft.registration_number
                  ? "success"
                  : "disabled"
              }
            />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default AircraftCard;
