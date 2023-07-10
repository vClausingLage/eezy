import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

import "./CSS/aircraft-index.css";

type Props = {
  user?: string;
  isAuthenticated: boolean;
};

function Aircraft({ user, isAuthenticated }: Props) {
  return (
    <>
      <Card className="root">
        <CardContent>
          <Typography variant="h4" color="primary.main">
            your Aircraft
          </Typography>
          <GetAircraft user={user} isAuthenticated={isAuthenticated} />
          <Typography variant="h4" color="primary.main">
            add your own Aircraft
          </Typography>
          <CreateAircraftForm user={user} isAuthenticated={isAuthenticated} />
        </CardContent>
      </Card>
    </>
  );
}

export default Aircraft;
