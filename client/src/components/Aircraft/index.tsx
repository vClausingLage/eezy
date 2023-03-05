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

type Props = {
  userID: number | undefined;
};

function Aircraft(props: Props) {
  // const [aircraft, setAircraft] = useState();

  // useEffect(() => {
  //   async function fetchAircraft() {
  //     const response = await fetch("/api/aircraft/models");
  //     const result = await response.json();
  //     setAircraft(result);
  //   }
  //   fetchAircraft();
  // }, []);

  // useEffect(() => {
  //   console.log(aircraft);
  // }, [aircraft]);

  return (
    <>
      <Card>
        <CardContent>
          <CreateAircraftForm userID={props.userID} />
        </CardContent>
      </Card>
    </>
  );
}

export default Aircraft;
