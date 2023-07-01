import { useAuth0 } from "@auth0/auth0-react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

import "./CSS/aircraft-index.css";

function Aircraft() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <Card className="root">
        <CardContent>
          <Typography variant="h4" color="primary.main">
            your Aircraft
          </Typography>
          <GetAircraft
            user={user?.sub?.replace("|", "")}
            isAuthenticated={isAuthenticated}
          />
          <Typography variant="h4" color="primary.main">
            add your own Aircraft
          </Typography>
          <CreateAircraftForm
            user={user?.sub?.replace("|", "")}
            isAuthenticated={isAuthenticated}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default Aircraft;
