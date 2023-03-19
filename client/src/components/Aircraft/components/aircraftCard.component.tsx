import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../features/redux/selectedAircraftSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { IAircraft } from "../interfaces/aircraft";

type Props = {
  aircraft: IAircraft;
};

function AircraftCard(props: Props) {
  const selectionNew = props.aircraft;
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
              dispatch(aircraftSelected(selectionNew));
            }}
          >
            select Aircraft
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default AircraftCard;
