import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
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
  const [tempUnit, setTempUnit] = useState("°F"); //! not really as intended °C <-> °F make it a real toggle
  const [nosig, setNosig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metarObject, setMetarObject] = useState<IMetarObject>({
    icao: "",
    flightRule: { flightRule: "", colorCode: "", color: "" },
    tempUnit: "°C",
    nosig: false,
    userLocation: "",
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
      icao: event.target.value,
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
    setMetar({});
    setIsLoading(true);
    const response = await fetch(`/api/${icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMetar(data);
    //! setMetarObject({ ...metarObject, metar: data[0] });
    setIsLoading(false);
  }

  useEffect(() => {
    if (metar[0] !== undefined && metar[0].obs[0] !== undefined) {
      const flightRuleColor = getFlightRules(
        Math.round(formatVisibility(metar[0].obs[0].visib)),
        metar[0].obs[0].cldBas1 !== null
          ? parseInt(metar[0].obs[0].cldBas1)
          : 9999 //! vis format
      );
      setFlightRule(flightRuleColor);
      if (/NOSIG/i.test(metar[0].obs[0].rawOb)) {
        setNosig(true);
      } else {
        setNosig(false);
      }
    }
  }, [metar[0]]);

  console.log("fetched Metar", metar[0]);

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
          <TextField
            type="search"
            label="enter ICAO Code"
            value={metarObject.icao.toUpperCase()}
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
        {/* {metar[0]?.obs[0] === undefined && (
          <Alert severity="error" sx={{ mt: 3 }}>
            no metar data available
          </Alert>
        )} */}
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
                    description="SLP"
                    data={Math.round(metar[0].obs[0].slp / 10)}
                  ></DataView>
                )}
              {metar[0].obs[0].altim !== null &&
                metar[0].obs[0].slp === null && (
                  <DataView
                    description="QNH"
                    data={Math.round(metar[0].obs[0].altim / 10)}
                  ></DataView>
                )}
              {metar[0].obs[0].slp !== null &&
                metar[0].obs[0].altim !== null && (
                  <DataView
                    description="QNH | SLP"
                    data={
                      <>
                        {Math.round(metar[0].obs[0].altim / 10)} hPa |{" "}
                        {Math.round(metar[0].obs[0].slp / 10)} hPa
                      </>
                    }
                  ></DataView>
                )}
              <DataView
                description="Visibility"
                data={formatVisibility(parseInt(metar[0].obs[0].visib))}
              ></DataView>
              {metar[0].obs[0].wxString && (
                <DataView
                  description="Precipitation"
                  data={formatWeatherString(metar[0].obs[0].wxString)}
                ></DataView>
              )}
              {tempUnit === "°F" ? (
                <>
                  <DataView
                    description="Temperature"
                    data={Math.round(metar[0].obs[0].temp / 10) + "°C"}
                  ></DataView>
                  <DataView
                    description="Dewpoint"
                    data={Math.round(metar[0].obs[0].dewp / 10) + "°C"}
                  ></DataView>
                </>
              ) : (
                <>
                  <DataView
                    description="Temperature"
                    data={
                      Math.round(((metar[0].obs[0].temp / 10) * 9) / 5 + 32) +
                      "°F"
                    }
                  ></DataView>
                  <DataView
                    description="Dewpoint"
                    data={
                      Math.round(((metar[0].obs[0].dewp / 10) * 9) / 5 + 32) +
                      "°F"
                    }
                  ></DataView>
                </>
              )}
              <Button onClick={tempUnitToggle} variant="outlined">
                {tempUnit}
              </Button>
            </Box>

            <Box sx={{ justifyContent: "center", alignItems: "center" }}>
              <Grid container spacing={4}>
                <Grid item>
                  {metar[0].obs[0].cldCvg1 === "CAVOK" && <Sun />}
                  {metar[0].obs[0].cldCvg1 === "NCD" && <Sun />}
                  {metar[0].obs[0].cldCvg1 === "CLR" && <Sun />}

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

            {nosig && (
              <Alert severity="info">
                <Typography>
                  Metar issued at {convertDate(metar[0].obs[0].obsTime + "000")}
                  {"h "}
                  (local time)
                </Typography>
                <Typography sx={{ mt: 1, mb: 1 }}>
                  <span style={{ color: "red" }}>NO SIG</span>nificant changes
                  expected
                </Typography>
              </Alert>
            )}
            <Typography sx={{ mt: 1, mb: 1 }}>
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
    const local = date.toLocaleString(navigator.language, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return local;
  }
  function tempUnitToggle() {
    if (tempUnit === "°C") {
      setTempUnit("°F");
    } else {
      setTempUnit("°C");
    }
  }
  function formatVisibility(visibility: number) {
    //! Button for unit Change OR make dependent on location
    if (visibility >= 621) return 9999;
    else {
      return Math.round((visibility * 16.0934) / 100) * 100; //! UNIT
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
