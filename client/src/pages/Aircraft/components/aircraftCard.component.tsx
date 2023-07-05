import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../features/redux/selectedAircraftSlice";

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
  user: string | undefined;
  editAircraft: (id: string) => void;
  deleteAircraft: (id: string) => void;
};

function AircraftCard({ aircraft, editAircraft, deleteAircraft }: Props) {
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
            <IconButton
              onClick={() => editAircraft(aircraft.registration_number)}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              onClick={() => deleteAircraft(aircraft.registration_number)}
            >
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
