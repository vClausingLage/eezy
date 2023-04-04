import { useState } from "react";

import TextFieldContainer from "../../General/TextFields/textFieldContainer";

import { Typography, Box, Alert, IconButton } from "@mui/material";
import { FlightTakeoff, FlightLand, Search } from "@mui/icons-material";

function InputDestination() {
  const [icaoDeparture, setIcaoDeparture] = useState("");
  const [icaoDestination, setIcaoDestination] = useState("");

  const calculateRoute = () => {
    console.log("dep", icaoDeparture);
    console.log("dest", icaoDestination);
  };

  return (
    <Box>
      <Typography variant="h5" color="primary">
        Departure & Destination
      </Typography>
      <Alert severity="error">disabled for DEMO</Alert>
      <Box display="flex" alignItems="center">
        <Box>
          <TextFieldContainer
            icon={<FlightTakeoff />}
            adornment="check"
            value={icaoDeparture}
            submit={(input) => setIcaoDeparture(input)}
          ></TextFieldContainer>
          <TextFieldContainer
            icon={<FlightLand />}
            value={icaoDestination}
            adornment="check"
            submit={(input) => setIcaoDestination(input)}
          ></TextFieldContainer>
        </Box>
        <Box>
          <IconButton onClick={calculateRoute}>
            <Search />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default InputDestination;
