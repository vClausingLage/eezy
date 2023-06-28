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
};

function AircraftCard({ aircraft }: Props) {
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
            <IconButton>
              <EditIcon color="disabled" />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon color="disabled" />
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
