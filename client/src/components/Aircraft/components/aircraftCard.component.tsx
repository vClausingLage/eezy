import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../features/redux/selectedAircraftSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-get.css";

type Props = {
  aircraft: IAircraft;
};

function AircraftCard(props: Props) {
  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );
  const dispatch = useDispatch();

  return (
    <Card>
      {selectedAircraft && (
        <CardContent>
          <Typography>
            {props.aircraft.manufacturer} {props.aircraft.model}
          </Typography>
          <Typography>{props.aircraft.registration_number}</Typography>
          <Button
            onClick={() => {
              dispatch(aircraftSelected(props.aircraft));
            }}
          >
            select Aircraft
          </Button>
          {props.aircraft.registration_number ===
            selectedAircraft.registration_number && (
            <Typography className="aircraft-selected">
              <CheckIcon />
            </Typography>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default AircraftCard;
