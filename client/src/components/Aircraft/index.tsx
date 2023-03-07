import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CreateAircraftForm from "./components/createAircraft.component";
import GetAircraft from "./components/getAircraft.component";

type Props = {
  userID: string | undefined;
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
