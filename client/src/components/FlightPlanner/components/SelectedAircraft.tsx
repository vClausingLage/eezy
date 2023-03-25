import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "../CSS/aircraft-selected.css";

type Props = {
  aircraft: {
    manufacturer: string;
    model: string;
    registration_number: string;
  };
};

function SelectedAircraft(props: Props) {
  return (
    <Card className="card-aircraft-selected">
      <CardContent>
        <Typography variant="h5" color="primary.main">
          your Aircraft
        </Typography>
        <Typography>
          {props.aircraft.manufacturer} {props.aircraft.model}
        </Typography>
        <Typography>{props.aircraft.registration_number}</Typography>
      </CardContent>
    </Card>
  );
}

export default SelectedAircraft;
