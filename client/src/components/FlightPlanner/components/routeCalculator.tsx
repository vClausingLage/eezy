import { useState } from "react";

import TextFieldContainer from "../../General/TextFields/textFieldContainer";

import { Typography, Box, Alert, IconButton } from "@mui/material";
import { FlightTakeoff, FlightLand, Search } from "@mui/icons-material";

function InputDestination() {
  const [icaoDeparture, setIcaoDeparture] = useState("");
  const [icaoDestination, setIcaoDestination] = useState("");
  const [alertIcao, setAlertIcao] = useState(false);
  const [distance, setDistance] = useState(undefined);

  function handleDepartureInput(input: string): void {
    console.log("departure", input);
    setIcaoDeparture(input.toUpperCase());
  }
  function handleDestinationInput(input: string): void {
    console.log("destination", input);
    setIcaoDestination(input.toUpperCase());
  }

  function calculateRoute() {
    const fetchLatLong = async (
      icaoDeparture: string,
      icaoDestination: string
    ) => {
      setAlertIcao(false);
      const response = await fetch(
        `/api/airport/distance/${icaoDeparture},${icaoDestination}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
    };
    icaoDeparture.length === 4 && icaoDestination.length === 4
      ? fetchLatLong(icaoDeparture, icaoDestination)
      : setAlertIcao(true);
  }

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
            submit={(input) => handleDepartureInput(input)}
          ></TextFieldContainer>
          <TextFieldContainer
            icon={<FlightLand />}
            value={icaoDestination}
            adornment="check"
            submit={(input) => handleDestinationInput(input)}
          ></TextFieldContainer>
        </Box>
        <Box>
          <IconButton onClick={calculateRoute}>
            <Search />
          </IconButton>
        </Box>
      </Box>
      <Box>
        {alertIcao && (
          <Alert severity="error">
            <Typography>
              proper ICAO Codes for Departure and Destination required!
            </Typography>
          </Alert>
        )}
        <Typography>
          {icaoDeparture} | {icaoDestination}
        </Typography>
      </Box>
      <Box>distance: {distance}</Box>
    </Box>
  );
}

export default InputDestination;
