import { useState } from "react";

import {
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { IFlightRule } from "./Metar/assets/IMetar";

import Cloud from "./Metar/assets/Cloud";
import Sun from "./Metar/assets/Sun";
import Wind from "./Metar/assets/Wind";
import Search from "@mui/icons-material/Search";

function Metar() {
  const [icao, setIcao] = useState("edds");
  const [metar, setMetar] = useState<any>({}); //! make interface
  const [disabled, toggleDisabled] = useState(true);
  const [alertIcao, setAlertIcao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcao(event.currentTarget.value);
    if (event.currentTarget.value.length === 4) toggleDisabled(false);
    else {
      toggleDisabled(true);
    }
    setAlertIcao(false);
  }

  async function searchMetar(e: any) {
    e.preventDefault();
    fetch(`/api/${icao}`, {
      //! to async/await
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMetar(data));
    if (icao.length !== 4) setAlertIcao(true);
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box
            id="Metar text input ICAO"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2">Metar</Typography>
            <form onSubmit={searchMetar}>
              <TextField
                type="search"
                label="enter ICAO Code"
                value={icao}
                onChange={handleChange}
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
              {alertIcao && (
                <Alert severity="error">Please provide ICAO Code</Alert>
              )}
            </form>
          </Box>
          <Box>{metar[0] && metar[0].elev}</Box>
        </CardContent>
      </Card>
    </>
  );
}

export default Metar;
