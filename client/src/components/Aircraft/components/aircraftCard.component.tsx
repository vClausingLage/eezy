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
  const selection = "moin";
  const count = useSelector((state: any) => state.selectedAircraft.value);
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
            dispatch(aircraftSelected(selection));
          }}
        >
          select Aircraft
        </Button>
        {count}
      </CardContent>
    </Card>
  );
}

export default AircraftCard;
