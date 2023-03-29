import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
      <IcaoInput submit={(e) => console.log(e)} />
    </Box>
  );
}

export default InputDestination;
