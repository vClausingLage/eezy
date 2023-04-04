import { useState } from "react";

import IcaoInput from "../../General/TextFields/icaoInput";
import TextFieldContainer from "../../General/TextFields/TextFieldContainer";

import { Typography, Box, Alert, IconButton } from "@mui/material";
import { FlightTakeoff, FlightLand, Search } from "@mui/icons-material";

function InputDestination() {
  const [icao, setIcao] = useState("");

  const textField = (
    <IcaoInput submit={(e) => console.log(e)} adornment="check" />
  );

  const calculateRoute = () => {
    console.log(icao);
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
            textInput={textField}
            submit={(input) => setIcao(input)}
          ></TextFieldContainer>
          <TextFieldContainer
            icon={<FlightLand />}
            textInput={textField}
            submit={(input) => setIcao(input)}
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
