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

import { IMetarApi } from "./Metar/assets/IMetar";

import Cloud from "./Metar/assets/Cloud";
import Sun from "./Metar/assets/Sun";
import Wind from "./Metar/assets/Wind";
import Search from "@mui/icons-material/Search";

function Metar() {
  const [icao, setIcao] = useState("");
  const [metar, setMetar] = useState<any>([]); //! make interface
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

  console.log(metar[0]);

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
          <Box>
            {metar[0] && (
              <>
                <Typography>{metar[0].name}</Typography>{" "}
                <Typography>{metar[0].obs[0].obsTime}</Typography>
                <Typography>Temperature {metar[0].obs[0].temp}</Typography>
                <Typography>Dewpoint {metar[0].obs[0].dewp}</Typography>
                <Typography>Visibility {metar[0].obs[0].visib}</Typography>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default Metar;

const object = {
  icaoId: "EDDS",
  lat: "48.69",
  lon: "9.222",
  elev: "374",
  priority: "3",
  name: "Stuttgart Arpt, BW, DE",
  obs: [
    {
      metar_id: "605298366",
      icaoId: "EDDS",
      receiptTime: "2023-01-26 20:06:06",
      obsTime: "1674762600",
      reportTime: "2023-01-26 20:00:00",
      temp: "-20",
      dewp: "-30",
      wdir: "330",
      wspd: "9",
      wgst: null,
      visib: "373",
      altim: "10190",
      slp: null,
      qcField: "2",
      wxString: null,
      cldCvg1: "BKN",
      cldCvg2: "OVC",
      cldCvg3: null,
      cldCvg4: null,
      cldBas1: "6",
      cldBas2: "9",
      cldBas3: null,
      cldBas4: null,
      presTend: null,
      maxT: null,
      minT: null,
      maxT24: null,
      minT24: null,
      precip: null,
      pcp3hr: null,
      pcp6hr: null,
      pcp24hr: null,
      snow: null,
      vertVis: null,
      metarType: "METAR",
      rawOb:
        "EDDS 261950Z AUTO 33009KT 6000 BKN006 OVC009 M02/M03 Q1019 REFZDZ TEMPO 4000 -FZDZ",
      mostRecent: "1",
    },
  ],
};
