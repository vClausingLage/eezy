import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";

import "../CSS/planner-card-selected.css";

type Props = {
  aircraft: {
    id: number | null;
    manufacturer: string;
    model: string;
    registration_number: string;
  };
  editAircraft: (id: number | null, user?: string) => void;
  deleteAircraft: (id: number | null, user?: string) => void;
  deselectAircraft: () => void;
  user?: string;
};

function SelectedAircraftCard({
  aircraft,
  editAircraft,
  deleteAircraft,
  deselectAircraft,
  user,
}: Props) {
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
        <Typography className="aircraft-selected">
          <IconButton onClick={() => editAircraft(aircraft.id, user)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => deleteAircraft(aircraft.id, user)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
          <IconButton onClick={() => deselectAircraft()}>
            <CloseIcon color="error" />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SelectedAircraftCard;
