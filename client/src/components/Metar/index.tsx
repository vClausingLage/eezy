import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Search from "@mui/icons-material/Search";

import {
  getFlightRules,
  convertDate,
  // checkLocation,
  tempoInformation,
} from "./helper/metar-ui-helper";
import { IMetarObject, IAirportObject } from "./classes/IMetar";

import Cloud from "./components/Cloud.component";
import Sun from "./components/Sun.component";
import Wind from "./components/Wind.component";
import AerodromeFrequencies from "./components/AerodromeFrequencies.component";
import FlightRuleTable from "./components/FlightRuleTable.component";

import "./CSS/index.css";
import DataPanel from "./components/DataPanel.component";

function Metar() {
  const [responseError, setResponse] = useState(false);
  const [metar, setMetar] = useState<any>({}); //! make interface
  const [disabled, setDisabled] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [alertIcao, setAlertIcao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airportObject, setAirportObject] = useState({} as IAirportObject);
  const [metarObject, setMetarObject] = useState({
    icao: "",
    tempUnit: "°C",
  } as IMetarObject);

  function tempUnitToggle(unit: string) {
    // ! add return
    if (unit === "°C") {
      setMetarObject({ ...metarObject, tempUnit: "°F" });
    } else if (unit === "°F") {
      setMetarObject({ ...metarObject, tempUnit: "°C" });
    }
  }

  const loading = (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMetarObject({
      ...metarObject,
      icao: event.target.value.toUpperCase(),
    });
    if (event.target.value.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setAlertIcao(false);
  }

  async function searchMetar(e: React.SyntheticEvent) {
    e.preventDefault();
    if (metarObject.icao.length !== 4) setAlertIcao(true);
    setIsLoading(true);
    const response = await fetch(`/api/metar/${metarObject.icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message && data.message === "error") {
      setResponse(true);
      setIsLoading(false);
    } else {
      setResponse(false);
      setMetar(data);
      setMetarObject({
        ...metarObject,
        visibility: {
          ...metarObject.visibility,
          meters:
            parseInt(data.visib) >= 621
              ? 9999
              : Math.round((parseInt(data.visib) * 16.0934) / 100) * 100,
          miles: parseInt(data.visib),
        },
        nosig: /NOSIG/gi.test(data.rawOb) ? true : false,
        CAVOK: /CAVOK/gi.test(data.rawOb)
          ? true
          : /CLR/gi.test(data.rawOb)
          ? true
          : /NCD/gi.test(data.rawOb)
          ? true
          : false,
        time: convertDate(data.obsTime + "000"),
        tempoInformation: tempoInformation(data.rawOb),
      });
    }
    if (data.message && data.message === "error") {
      setResponse(true);
      setIsLoading(false);
    } else {
      const airportDBresponse = await fetch(`/api/airport/${metarObject.icao}`);
      const airportDBData = await airportDBresponse.json();
      setAirportObject({
        frequencies: airportDBData.freqs,
        runways: airportDBData.runways,
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (metar !== undefined && metarObject.visibility !== undefined) {
      const flightRuleColor = getFlightRules(
        metarObject.CAVOK ? "CAVOK" : metarObject.visibility.meters,
        parseInt(metar.cldBas1)
      );
      setMetarObject({ ...metarObject, flightRule: flightRuleColor });
    }
    // console.log(metarObject.tempoInformation);
  }, [metar]);

  return (
    <Box>
      <Box id="metar-text-input-ICAO">
        <Typography variant="h2">Metar</Typography>
        <form onSubmit={searchMetar}>
          <TextField //! error handling here => https://mui.com/material-ui/react-text-field/#validation
            type="search"
            label="enter ICAO Code"
            value={metarObject.icao}
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
        </form>
      </Box>
      {isLoading && loading}
      {alertIcao && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Please provide ICAO Code
        </Alert>
      )}
      {responseError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          No Data Received. <br />
          Check if a correct ICAO Code was provided or try again a little later.
        </Alert>
      )}
      <Box id="metar-data">
        {!isLoading &&
          metar.name &&
          metar !== undefined && ( // ! move name to object
            <>
              <Typography variant="h3">
                {metar.name.split(",")[0].replace("/", " ")}
              </Typography>
              <Typography
                id="type-flight-rule"
                style={{
                  backgroundColor: metarObject.flightRule?.colorCode,
                }}
              >
                {metarObject.flightRule?.flightRule}
              </Typography>

              <DataPanel
                props={{
                  altim: metar.altim,
                  slp: metar.slp,
                  temp: metar.temp,
                  dewp: metar.dewp,
                  tempUnit: metarObject.tempUnit,
                  tempUnitToggle: tempUnitToggle,
                  wxString: metar.wxString,
                  visibilityMeters: metarObject.visibility.meters,
                }}
              />

              <Box id="grid_container_Clouds_Wind">
                <Box>
                  <Box id="sun-box">
                    {metar.cldCvg1 === "CAVOK" && (
                      <Sun date={metarObject.time.local} />
                    )}
                    {metar.cldCvg1 === "NCD" && (
                      <Sun date={metarObject.time.local} />
                    )}
                    {metar.cldCvg1 === "CLR" && (
                      <Sun date={metarObject.time.local} />
                    )}
                  </Box>

                  <Box id="cloud-box">
                    {metar.cldBas1 && (
                      <Cloud
                        cloudBase={parseInt(metar.cldBas1)}
                        cloudLayer={metar.cldCvg1}
                      ></Cloud>
                    )}
                    {metar.cldBas2 && (
                      <Cloud
                        cloudBase={parseInt(metar.cldBas2)}
                        cloudLayer={metar.cldCvg2}
                      ></Cloud>
                    )}
                    {metar.cldBas3 && (
                      <Cloud
                        cloudBase={parseInt(metar.cldBas3)}
                        cloudLayer={metar.cldCvg3}
                      ></Cloud>
                    )}
                    {metar.cldBas4 && (
                      <Cloud
                        cloudBase={parseInt(metar.cldBas4)}
                        cloudLayer={metar.cldCvg4}
                      ></Cloud>
                    )}
                  </Box>
                </Box>
                <Box>
                  {metar.wdir && (
                    <Wind
                      direction={parseInt(metar.wdir)}
                      speed={parseInt(metar.wspd)}
                      unit="kts"
                      gusts={metar.wgst}
                      runways={airportObject.runways}
                    />
                  )}
                </Box>
              </Box>

              <Alert severity="info">
                <Typography>
                  Metar issued at {metarObject.time.local}h (local time)
                </Typography>
                {metarObject.nosig && (
                  <Typography id="NOSIG" sx={{ mt: 1, mb: 1 }}>
                    <span style={{ color: "red" }}>NO SIG</span>nificant changes
                    expected
                  </Typography>
                )}
              </Alert>

              <Typography id="RawMetar" sx={{ mt: 1, mb: 1 }}>
                <span style={{ fontWeight: "bold" }}>Raw Metar</span>{" "}
                {metar.rawOb}
              </Typography>
              {airportObject.frequencies && !isLoading && (
                <AerodromeFrequencies props={airportObject.frequencies} />
              )}
              <Button
                sx={{ mt: 10 }}
                onClick={() => setShowTable(!showTable)}
                variant="outlined"
              >
                show flight rule table
              </Button>
              {showTable && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    mt: 2,
                  }}
                >
                  <FlightRuleTable />
                </Box>
              )}
            </>
          )}
      </Box>
    </Box>
  );
}

export default Metar;
