import { useSelector, useDispatch } from "react-redux";
import { select } from "../../../redux/aircraft";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { IAircraft } from "../interfaces/aircraft";

type Props = {
  aircraft: IAircraft;
};

function AircraftCard(props: Props) {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardContent
        onClick={() => {
          dispatch(select());
        }}
      >
        {count}
        <Typography>
          {props.aircraft.manufacturer} {props.aircraft.model}
        </Typography>
        <Typography>{props.aircraft.registration_number}</Typography>
      </CardContent>
    </Card>
  );
}

export default AircraftCard;
