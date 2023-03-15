import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  manufacturer: String;
  model: String;
  registration_number: String;
};

function AircraftCard(props: Props) {
  function chooseAircraft() {}

  return (
    <Card>
      <CardContent
        onClick={() => console.log("click", props.registration_number)}
      >
        <Typography>
          {props.manufacturer} {props.model}
        </Typography>
        <Typography>{props.registration_number}</Typography>
      </CardContent>
    </Card>
  );
}

export default AircraftCard;
