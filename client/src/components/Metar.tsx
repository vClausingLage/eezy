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

function Metar() {
  const [icao, setIcao] = useState("");
  const [metar, setMetar] = useState<any>([]); //! make interface
  const [flightRule, setFlightRule] = useState({} as IFlightRule);
  const [disabled, setDisabled] = useState(true);
  const [alertIcao, setAlertIcao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metarObject, setMetarObject] = useState<IMetarObject>({
    icao: "",
    time: { local: "", utc: "" },
    flightRule: { flightRule: "", colorCode: "", color: "" },
    tempUnit: "°C",
    nosig: false,
    userLocation: "",
    visibility: { meters: 0, miles: 0 },
    CAVOK: false,
  });

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
    setIcao(event.currentTarget.value);
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
    setMetar([]);
    setMetarObject({
      //! alternative empty IMetarObject ???
      icao: "",
      time: { local: "", utc: "" },
      flightRule: { flightRule: "", colorCode: "", color: "" },
      tempUnit: "°C",
      nosig: false,
      userLocation: "",
      visibility: { meters: 0, miles: 0 },
      CAVOK: false,
    });
    setIsLoading(true);
    const response = await fetch(`/api/${icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMetar(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (metar[0] !== undefined) {
      setMetarObject({
        ...metarObject,
        visibility: {
          ...metarObject.visibility,
          meters:
            parseInt(metar[0].obs[0].visib) >= 621
              ? 9999
              : Math.round((parseInt(metar[0].obs[0].visib) * 16.0934) / 100) *
                100,
          miles: parseInt(metar[0].obs[0].visib),
        },
        nosig: /NOSIG/gi.test(metar[0].obs[0].rawOb) ? true : false,
        CAVOK: /CAVOK/gi.test(metar[0].obs[0].rawOb)
          ? true
          : /CLR/gi.test(metar[0].obs[0].rawOb)
          ? true
          : /NCD/gi.test(metar[0].obs[0].rawOb)
          ? true
          : false,
        time: convertDate(metar[0].obs[0].obsTime + "000"),
      });
      const flightRuleColor = getFlightRules(
        metarObject.CAVOK ? "CAVOK" : metarObject.visibility.meters,
        parseInt(metar[0].obs[0].cldBas1)
      );
      setFlightRule(flightRuleColor);
      console.log("fetched Metar", metar[0]);
      console.log("obj", metarObject);
    }
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
        {metar[0] && metar[0].obs[0] && (
          <>
            <Typography variant="h3">{metar[0].name.split(",")[0]}</Typography>
            <Typography
              style={{
                backgroundColor: flightRule?.colorCode,
                color: flightRule?.color,
                textAlign: "center",
                paddingTop: ".7rem",
                paddingBottom: ".7rem",
                paddingLeft: "4rem",
                paddingRight: "4rem",
              }}
            >
              {flightRule?.flightRule}
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
              {metar[0].obs[0].slp !== null &&
                metar[0].obs[0].altim === null && (
                  <DataView
                    data={[
                      {
                        description: "SLP",
                        value: Math.round(metar[0].obs[0].slp / 10),
                      },
                    ]}
                    unit={"hPa"}
                  ></DataView>
                )}
              {metar[0].obs[0].altim !== null &&
                metar[0].obs[0].slp === null && (
                  <DataView
                    data={[
                      {
                        description: "QNH",
                        value: Math.round(metar[0].obs[0].altim / 10),
                      },
                    ]}
                    unit={"hPa"}
                  ></DataView>
                )}
              {metar[0].obs[0].slp !== null &&
                metar[0].obs[0].altim !== null && (
                  <DataView
                    data={[
                      {
                        description: "QNH",
                        value: Math.round(metar[0].obs[0].altim / 10),
                      },
                      {
                        description: "SLP",
                        value: Math.round(metar[0].obs[0].slp / 10),
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
              {metar[0].obs[0].wxString && (
                <DataView
                  data={[
                    {
                      description: "Precipitation",
                      value: formatWeatherString(metar[0].obs[0].wxString),
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
                        value: Math.round(metar[0].obs[0].temp / 10),
                      },
                      {
                        description: "Dewpoint",
                        value: Math.round(metar[0].obs[0].dewp / 10),
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
                        value: Math.round(
                          ((metar[0].obs[0].temp / 10) * 9) / 5 + 32
                        ),
                      },
                      {
                        description: "Dewpoint",
                        value: Math.round(
                          ((metar[0].obs[0].dewp / 10) * 9) / 5 + 32
                        ),
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
                  {metar[0].obs[0].cldCvg1 === "CAVOK" && (
                    <Sun date={metarObject.time.utc} />
                  )}
                  {metar[0].obs[0].cldCvg1 === "NCD" && (
                    <Sun date={metarObject.time.utc} />
                  )}
                  {metar[0].obs[0].cldCvg1 === "CLR" && (
                    <Sun date={metarObject.time.utc} />
                  )}

                  <Box
                    id="clouds"
                    sx={{ display: "flex", flexDirection: "row", mt: 1, mb: 1 }}
                  >
                    {metar[0].obs[0].cldBas1 && (
                      <Cloud
                        cloudBase={parseInt(metar[0].obs[0].cldBas1)}
                        cloudLayer={metar[0].obs[0].cldCvg1}
                      ></Cloud>
                    )}
                    {metar[0].obs[0].cldBas2 && (
                      <Cloud
                        cloudBase={parseInt(metar[0].obs[0].cldBas2)}
                        cloudLayer={metar[0].obs[0].cldCvg2}
                      ></Cloud>
                    )}
                    {metar[0].obs[0].cldBas3 && (
                      <Cloud
                        cloudBase={parseInt(metar[0].obs[0].cldBas3)}
                        cloudLayer={metar[0].obs[0].cldCvg3}
                      ></Cloud>
                    )}
                    {metar[0].obs[0].cldBas4 && (
                      <Cloud
                        cloudBase={parseInt(metar[0].obs[0].cldBas4)}
                        cloudLayer={metar[0].obs[0].cldCvg4}
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
                    {metar[0].obs[0].wdir && (
                      <Wind
                        direction={parseInt(metar[0].obs[0].wdir)}
                        speed={parseInt(metar[0].obs[0].wspd)}
                        unit="kts"
                        gusts={metar[0].obs[0].wgst}
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
              {metar[0].obs[0].rawOb}
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
