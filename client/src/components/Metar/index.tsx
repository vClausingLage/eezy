import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  TextField,
  IconButton,
  Alert,
  Button,
  Card,
} from "@mui/material";
import Search from "@mui/icons-material/Search";

import {
  getFlightRules,
  convertDate,
  qnhRegex,
  // checkLocation,
  tempoInformation,
} from "./helper/metar-ui-helper";
import {
  IMetarObject,
  IAirportObject,
  IMetarAPIObject,
} from "./classes/IMetar";

import LoadingCircle from "../General/LoadingCircle";
import DataPanel from "./components/DataPanel";
import SVGPanel from "./components/SVGPanel";
import AerodromeFrequencies from "./components/AerodromeFrequencies";
import FlightRuleTable from "./components/FlightRuleTable";
import WordCloudICAO from "./assets/WordCloudICAO.png";

import "./CSS/index.css";

function Metar() {
  const [responseError, setResponse] = useState(false);
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
    if (unit === "°C") {
      setMetarObject({ ...metarObject, tempUnit: "°F" });
    } else if (unit === "°F") {
      setMetarObject({ ...metarObject, tempUnit: "°C" });
    }
  }

  const loading = <LoadingCircle />;

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
    const data: IMetarAPIObject = await response.json();
    console.log("API data", data);
    if (data.message && data.message === "error") {
      setResponse(true);
      setIsLoading(false);
    } else {
      setResponse(false);
      setMetarObject({
        ...metarObject,
        altim: {
          altim: data.altim,
          qnh: qnhRegex(data.rawOb),
        },
        CAVOK: /CAVOK/gi.test(data.rawOb)
          ? true
          : /CLR/gi.test(data.rawOb)
          ? true
          : /NCD/gi.test(data.rawOb)
          ? true
          : false,
        clouds: data.clouds,
        dewp: data.dewp,
        name: data.name,
        nosig: /NOSIG/gi.test(data.rawOb) ? true : false,
        rawMetar: data.rawOb,
        slp: data.slp,
        tempoInformation: tempoInformation(data.rawOb),
        temp: data.temp,
        time: convertDate(data.obsTime + "000"),
        visibility: {
          ...metarObject.visibility,
          meters:
            data.visib === "6+"
              ? 9999
              : Math.round((parseInt(data.visib) * 1852) / 100) * 100,
          nm: parseInt(data.visib),
        },
        wspd: data.wspd,
        wdir: data.wdir,
        wgst: data.wgst,
        wxString: data.wxString,
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
    if (metarObject.visibility !== undefined) {
      const flightRuleColor = getFlightRules(
        metarObject.CAVOK ? "CAVOK" : metarObject.visibility.meters,
        metarObject.clouds[0].base
      );
      setMetarObject({ ...metarObject, flightRule: flightRuleColor });
    }
    console.log("tempo information", metarObject.tempoInformation);
  }, [metarObject.name]);

  return (
    <Card className="root">
      <Box className="metar-text-input-ICAO">
        <Typography variant="h2">Metar</Typography>
        <form onSubmit={searchMetar}>
          <TextField
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
      {!isLoading && metarObject.name === undefined && (
        <Box className="wordcloud">
          <img src={WordCloudICAO} alt="wordcloud" />
        </Box>
      )}
      <Box className="metar-data">
        {!isLoading && metarObject.name && (
          <>
            <Typography variant="h3">
              {metarObject.name.split(",")[0].replace("/", " ")}
            </Typography>
            <Typography
              className="type-flight-rule"
              style={{
                backgroundColor: metarObject.flightRule?.colorCode,
              }}
            >
              {metarObject.flightRule?.flightRule}
            </Typography>

            <DataPanel
              props={{
                altim: metarObject.altim.qnh,
                slp: metarObject.slp,
                temp: metarObject.temp,
                dewp: metarObject.dewp,
                tempUnit: metarObject.tempUnit,
                tempUnitToggle: tempUnitToggle,
                wxString: metarObject.wxString,
                visibilityMeters: metarObject.visibility.meters,
              }}
            />

            <SVGPanel
              props={{
                clouds: metarObject.clouds,
                wspd: metarObject.wspd,
                wdir: metarObject.wdir,
                wgst: metarObject.wgst,
                runways: airportObject.runways,
                timeLocal: metarObject.time.local,
              }}
            />

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
              {metarObject.rawMetar}
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
              <Box className="table-flight-rule">
                <FlightRuleTable />
              </Box>
            )}
          </>
        )}
      </Box>
    </Card>
  );
}

export default Metar;
