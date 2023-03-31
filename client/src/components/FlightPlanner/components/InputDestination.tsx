import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import IcaoInput from "../../General/TextFields/icaoInput";

function InputDestination() {
  const [icao, setIcao] = useState({ departure: "", destination: "" });

  function getDistance() {
    console.log("distance");
  }

  function handleDeparture() {
    console.log("Departure");
  }

  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Departure & Destination
      </Typography>
      <Alert severity="error">disabled for DEMO</Alert>
      <IcaoInput submit={(e) => console.log(e)} />
    </Box>
  );
}

export default InputDestination;
