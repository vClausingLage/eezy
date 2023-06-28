import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

import "./CSS/aircraft-index.css";

type Props = {
  userID: string | undefined;
};

function Aircraft({ userID }: Props) {
  return (
    <>
      <Card className="root">
        <CardContent>
          <Typography variant="h4" color="primary.main">
            your Aircraft
          </Typography>
          <GetAircraft userID={userID} />
          <Typography variant="h4" color="primary.main">
            add your own Aircraft
          </Typography>
          <CreateAircraftForm userID={userID} />
        </CardContent>
      </Card>
    </>
  );
}

export default Aircraft;
