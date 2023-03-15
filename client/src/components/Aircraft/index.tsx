import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

import { IAircraft } from "./interfaces/aircraft";

type Props = {
  userID: string | undefined;
  activeAircraft: IAircraft;
};

function Aircraft(props: Props) {
  return (
    <>
      <Card sx={{ ml: 2, mr: 2, mt: 1, mb: 1 }}>
        <CardContent>
          <GetAircraft userID={props.userID} />
          <CreateAircraftForm userID={props.userID} />
        </CardContent>
      </Card>
    </>
  );
}

export default Aircraft;
