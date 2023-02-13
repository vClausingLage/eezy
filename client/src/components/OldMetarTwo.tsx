import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import Search from "@mui/icons-material/Search";

import { getFlightRules } from "./Metar/metar-ui-helper";
import { IMetarObject, IFlightRule } from "./Metar/IMetar";

import Cloud from "./Metar/Cloud";
import Sun from "./Metar/Sun";
import Wind from "./Metar/Wind";
import DataView from "./DataView";

import weatherCodes from "./Metar/assets/weatherCodes.json";

import { airportDBKey } from "../config";

function Metar() {
  const [icao, setIcao] = useState("");
  const [metar, setMetar] = useState<any>({}); //! make interface
  // const [flightRule, setFlightRule] = useState({} as IFlightRule);
  const [disabled, setDisabled] = useState(true);
  const [alertIcao, setAlertIcao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airportDB, setAirportData] = useState<any>();
  const [metarObject, setMetarObject] = useState({
    icao: "",
    time: { local: "", utc: "" },
    flightRule: {} as IFlightRule,
    tempUnit: "°C",
    nosig: false,
    userLocation: "",
    visibility: { meters: 0, miles: 0 },
    CAVOK: false,
  } as IMetarObject);

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

  async function searchMetar(e: any) {
    //! remove any
    e.preventDefault();
    if (metarObject.icao.length !== 4) setAlertIcao(true);

    setIsLoading(true);
    const response = await fetch(`/api/${metarObject.icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // setMetar([]);
    // setMetarObject({} as IMetarObject);
    setMetar(data);
    setMetarObject({
      ...metarObject,
      visibility: {
        ...metarObject.visibility,
        meters:
          parseInt(metar.visib) >= 621
            ? 9999
            : Math.round((metar.visib * 16.0934) / 100) * 100,
        miles: parseInt(metar.visib),
      },
      nosig: /NOSIG/gi.test(metar.rawOb) ? true : false,
      CAVOK: /CAVOK/gi.test(metar.rawOb)
        ? true
        : /CLR/gi.test(metar.rawOb)
        ? true
        : /NCD/gi.test(metar.rawOb)
        ? true
        : false,
      time: convertDate(metar.obsTime + "000"),
    });
    const airportDBresponse = await fetch(
      `https://airportdb.io/api/v1/airport/${metarObject.icao}?apiToken=${airportDBKey}`
    );
    const airportDBData = await airportDBresponse.json();
    setAirportData(airportDBData);
    setIsLoading(false);
  }

  useEffect(() => {
    if (metar !== undefined) {
      //   setMetarObject({
      //     ...metarObject,
      //     visibility: {
      //       ...metarObject.visibility,
      //       meters:
      //         parseInt(metar.visib) >= 621
      //           ? 9999
      //           : Math.round((parseInt(metar.visib) * 16.0934) / 100) * 100,
      //       miles: parseInt(metar.visib),
      //     },
      //     nosig: /NOSIG/gi.test(metar.rawOb) ? true : false,
      //     CAVOK: /CAVOK/gi.test(metar.rawOb)
      //       ? true
      //       : /CLR/gi.test(metar.rawOb)
      //       ? true
      //       : /NCD/gi.test(metar.rawOb)
      //       ? true
      //       : false,
      //     time: convertDate(metar.obsTime + "000"),
      //   });
      console.log("fetched Metar", metar);
      console.log("obj", metarObject);
      // console.log("airportDB", airportDB.freqs);
    }
  }, [metar]);

  useEffect(() => {
    const flightRuleColor = getFlightRules(
      metarObject.CAVOK ? "CAVOK" : metarObject.visibility.meters,
      parseInt(metar.cldBas1)
    );
    setMetarObject({ ...metarObject, flightRule: flightRuleColor });
    // setFlightRule(flightRuleColor);
  }, [metar]);

  return (
    <>
      <Box
        id="Metar text input ICAO"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vdh"
      >
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
          {isLoading && loading}
          {alertIcao && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Please provide ICAO Code
            </Alert>
          )}
        </form>
      </Box>
      <Box
        id="Metar Data"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {metar.name && metar !== undefined && (
          <>
            <Typography variant="h3">{metar.name.split(",")[0]}</Typography>
            <Typography
              style={{
                backgroundColor: metarObject.flightRule?.colorCode,
                color: "white",
                textAlign: "center",
                paddingTop: ".7rem",
                paddingBottom: ".7rem",
                paddingLeft: "4rem",
                paddingRight: "4rem",
              }}
            >
              {metarObject.flightRule?.flightRule}
            </Typography>

            <Box
              id="Weather Data"
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {metar.slp !== null && metar.altim === null && (
                <DataView
                  data={[
                    {
                      description: "SLP",
                      value: Math.round(metar.slp / 10),
                    },
                  ]}
                  unit={"hPa"}
                ></DataView>
              )}
              {metar.altim !== null && metar.slp === null && (
                <DataView
                  data={[
                    {
                      description: "QNH",
                      value: Math.round(metar.altim / 10),
                    },
                  ]}
                  unit={"hPa"}
                ></DataView>
              )}
              {metar.slp !== null && metar.altim !== null && (
                <DataView
                  data={[
                    {
                      description: "QNH",
                      value: Math.round(metar.altim / 10),
                    },
                    {
                      description: "SLP",
                      value: Math.round(metar.slp / 10),
                    },
                  ]}
                  unit={"hPa"}
                ></DataView>
              )}
              <DataView
                data={[
                  {
                    description: "Visibility",
                    value: metarObject.visibility.meters,
                  },
                ]}
                unit={"m"}
              ></DataView>
              {metar.wxString && (
                <DataView
                  data={[
                    {
                      description: "Precipitation",
                      value: formatWeatherString(metar.wxString),
                    },
                  ]}
                ></DataView>
              )}
              {metarObject.tempUnit === "°C" ? (
                <>
                  <DataView
                    data={[
                      {
                        description: "Temperature",
                        value: Math.round(metar.temp / 10),
                      },
                      {
                        description: "Dewpoint",
                        value: Math.round(metar.dewp / 10),
                      },
                    ]}
                    unit={metarObject.tempUnit}
                    tempUnitToggle={(unit: string) => tempUnitToggle(unit)}
                  ></DataView>
                </>
              ) : (
                <>
                  <DataView
                    data={[
                      {
                        description: "Temperature",
                        value: Math.round(((metar.temp / 10) * 9) / 5 + 32),
                      },
                      {
                        description: "Dewpoint",
                        value: Math.round(((metar.dewp / 10) * 9) / 5 + 32),
                      },
                    ]}
                    unit={metarObject.tempUnit}
                    tempUnitToggle={(unit: string) => tempUnitToggle(unit)}
                  ></DataView>
                </>
              )}
            </Box>

            <Box sx={{ justifyContent: "center", alignItems: "center" }}>
              <Grid container spacing={4}>
                <Grid item>
                  {metar.cldCvg1 === "CAVOK" && (
                    <Sun date={metarObject.time.utc} />
                  )}
                  {metar.cldCvg1 === "NCD" && (
                    <Sun date={metarObject.time.utc} />
                  )}
                  {metar.cldCvg1 === "CLR" && (
                    <Sun date={metarObject.time.utc} />
                  )}

                  <Box
                    id="clouds"
                    sx={{ display: "flex", flexDirection: "row", mt: 1, mb: 1 }}
                  >
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
                </Grid>
                <Grid item sx={{ alignItems: "center" }}>
                  <Box
                    id="Wind"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    {metar.wdir && (
                      <Wind
                        direction={parseInt(metar.wdir)}
                        speed={parseInt(metar.wspd)}
                        unit="kts"
                        gusts={metar.wgst}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
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

            <Typography id="Raw Metar" sx={{ mt: 1, mb: 1 }}>
              <span style={{ fontWeight: "bold" }}>Raw Metar</span>{" "}
              {metar.rawOb}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
  function convertDate(dateString: string) {
    const date = new Date(parseInt(dateString));
    const localTime = date.toLocaleString(navigator.language, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const utcTime =
      String(date.getUTCHours()) + ":" + String(date.getUTCMinutes());
    return { local: localTime, utc: utcTime };
  }
  function tempUnitToggle(unit: string) {
    // ! add return
    if (unit === "°C") {
      setMetarObject({ ...metarObject, tempUnit: "°F" });
    } else if (unit === "°F") {
      setMetarObject({ ...metarObject, tempUnit: "°C" });
    }
  }
  function formatWeatherString(weatherString: string) {
    let result: any = [];
    let output = [];
    weatherString = weatherString.replace(/\s/gi, "");
    while (weatherString.length > 0) {
      if (weatherString[0] === "-" || weatherString[0] === "+") {
        weatherString[0] === "-"
          ? (result = [
              ...result,
              ["light", weatherString[1] + weatherString[2]],
            ])
          : (result = [
              ...result,
              ["heavy", weatherString[1] + weatherString[2]],
            ]);
        weatherString = weatherString.slice(3);
      } else if (weatherString[0] !== "-" && weatherString[0] !== "+") {
        result = [...result, ["", weatherString[0] + weatherString[1]]];
        weatherString = weatherString.slice(2);
      }
    }
    for (let el of result) {
      for (const [key, value] of Object.entries(weatherCodes.type)) {
        if (el[1] === key) output.push(el[0] + " " + value);
      }
    }
    return output.join(" and ");
  }
  async function checkLocation() {
    //! add return
    let locationCheck = false;
    const response = await fetch("https://ipapi.co/json/");
    const location = await response.json();
    metarObject.userLocation = location;
    //! check for CAN | US | EN -> Statute Miles : -> Meters
    console.log(metarObject.userLocation);

    //! return Miles && Meters --> check in JSX
  }
}

export default Metar;
