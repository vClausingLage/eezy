import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



function InputDestination() {
  const [icao, setIcao] = useState({icao.departure: "", icao.destination: ""});

  function getDistance() {
    console.log("distance")
  }

  function handleDeparture() {
    console.log("Departure")
  }

  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Departure & Destination
      </Typography>
      <Box>
        <form onSubmit={getDistance}>
          <TextField
            type="departure"
            label="enter ICAO Code"
            value={departure.icao}
            onChange={handleDeparture}
            InputProps={{
              endAdornment: (
                <IconButton
                  id="searchButton"
                  type="submit"
                  onClick={searchMetar}
                  disabled={disabled}
                >
                  <Search />
                </IconButton>
              ),
            }}
          ></TextField>
        </form>
      </Box>
    </Box>
  );
}

export default InputDestination;
