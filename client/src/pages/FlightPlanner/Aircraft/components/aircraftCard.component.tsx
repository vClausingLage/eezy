import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../../features/redux/selectedAircraftSlice";

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

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-get.css";

type Props = {
  aircraft: IAircraft;
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  user?: string;
};

function AircraftCard({ aircraft, editAircraft, deleteAircraft, user }: Props) {
  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );
  const dispatch = useDispatch();

  return (
    <Card>
      {selectedAircraft && (
        <CardContent>
          <Typography>
            {aircraft.manufacturer} {aircraft.model}
          </Typography>
          <Typography>{aircraft.registration_number}</Typography>
          <Button
            onClick={() => {
              dispatch(aircraftSelected(aircraft));
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
                aircraft.registration_number ===
                selectedAircraft.registration_number
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
