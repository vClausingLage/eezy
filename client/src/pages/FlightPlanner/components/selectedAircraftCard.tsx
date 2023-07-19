import { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "../CSS/planner-card-selected.css";

type Props = {
  aircraft: {
    manufacturer: string;
    model: string;
    registration_number: string;
  };
};

function SelectedAircraftCard({ aircraft }: Props) {
  useEffect(() => {
    console.log(aircraft);
  }, [aircraft]);

  return (
    <Card className="card-aircraft-selected">
      <CardContent>
        <Typography variant="h5" color="primary.main">
          your Aircraft
        </Typography>
        <Typography>
          {aircraft.manufacturer} {aircraft.model}
        </Typography>
        <Typography>{aircraft.registration_number}</Typography>
      </CardContent>
    </Card>
  );
}

export default SelectedAircraftCard;
