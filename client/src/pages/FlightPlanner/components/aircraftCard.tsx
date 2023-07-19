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
  selectAircraft: (id: number | null) => void;
  selectedAircraft?: number;
  user?: string;
};

function AircraftCard({
  aircraft,
  editAircraft,
  deleteAircraft,
  selectAircraft,
  selectedAircraft,
  user,
}: Props) {
  return (
    <Card>
      {aircraft && (
        <CardContent>
          <Typography>
            {aircraft.manufacturer} {aircraft.model}
          </Typography>
          <Typography>{aircraft.registration_number}</Typography>
          <Button onClick={() => selectAircraft(aircraft.id)}>
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
              color={aircraft.id === selectedAircraft ? "success" : "disabled"}
            />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default AircraftCard;
