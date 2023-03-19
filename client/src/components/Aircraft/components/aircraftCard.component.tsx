import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../features/redux/aircraft";

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
  const selectedAircraft = useSelector((state: any) => state.aircraft.object);
  const dispatch = useDispatch();

  return (
    <Card>
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
        {selectedAircraft.model}
      </CardContent>
    </Card>
  );
}

export default AircraftCard;
