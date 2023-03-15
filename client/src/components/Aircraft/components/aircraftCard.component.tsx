import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { IAircraft } from "../interfaces/aircraft";

type Props = {
  aircraft: IAircraft;
  getActiveAircraft: (e: React.MouseEvent, aircraft: IAircraft) => void;
};

function AircraftCard(props: Props) {
  return (
    <Card>
      <CardContent onClick={(e) => props.getActiveAircraft(e, props.aircraft)}>
        <Typography>
          {props.aircraft.manufacturer} {props.aircraft.model}
        </Typography>
        <Typography>{props.aircraft.registration_number}</Typography>
      </CardContent>
    </Card>
  );
}

export default AircraftCard;
