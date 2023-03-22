import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

type Props = {
  userID: string | undefined;
};

function Aircraft(props: Props) {
  const [report, setReport] = useState(false);

  function reportCreatedAircraft() {
    setReport(!report);
  }

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
