import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Alert,
  TextField,
  IconButton,
  CircularProgress,
  ToggleButton,
} from "@mui/material";

import { getFlightRules } from "./Metar/metar-ui-helper";
import { IMetarApi, IFlightRule } from "./Metar/IMetar";

import Cloud from "./Metar/Cloud";
import Sun from "./Metar/Sun";
import Wind from "./Metar/Wind";
import Search from "@mui/icons-material/Search";
import DataView from "./DataView";

function Metar() {
  const [icao, setIcao] = useState("");
  const [metar, setMetar] = useState<any>([]); //! make interface
  const [flightRule, setFlightRule] = useState<IFlightRule>();
  const [disabled, toggleDisabled] = useState(true);
  const [alertIcao, setAlertIcao] = useState(false);
  const [tempUnit, setTempUnit] = useState(true);
  const [nosig, setNosig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metarObject, setMetarObject] = useState({
    icao: "",
    metar: {},
    flightRule: {},
    tempUnit: true, //! to 'celsius'/'fahrenheit'
    location: "",
    nosig: false,
    isLoading: false,
    disabled: true,
    alertIcao: false,
  });
  //! use State object
  // setState({
  //   ...state,
  //   ip: data.ip,
  //   countryName: data.country_name,
  //   countryCode: data.country_calling_code,
  //   city: data.city,
  //   timezone: data.timezone
  // });
  // const [state, setState] = useState({
  //   ip: "",
  //   countryName: "",
  //   countryCode: "",
  //   city: "",
  //   timezone: ""
  // });

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
    // setIcao(event.currentTarget.value);
    // if (event.currentTarget.value.length === 4) toggleDisabled(false);
    // else {
    //   toggleDisabled(true);
    // }
    // setAlertIcao(false);
    console.log(metarObject.icao);
    setMetarObject((metarObject) => ({
      ...metarObject,
      icao: event.currentTarget.value,
    }));
    console.log(metarObject.icao);

    if (event.currentTarget.value.length === 4) {
      setMetarObject({ ...metarObject, disabled: false });
    } else {
      setMetarObject({ ...metarObject, disabled: true });
    }
    setMetarObject({ ...metarObject, alertIcao: false });
  }

  function convertDate(dateString: string) {
    const date = new Date(parseInt(dateString));
    const local = date.toLocaleString(navigator.language, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return local;
  }
  function formatVisibility() {
    return metar[0].obs[0].visib;
  }
  async function checkLocation() {
    let locationCheck = false;
    const response = await fetch("https://ipapi.co/json/");
    const location = await response.json();
    console.log(location);
    //! check for CAN | US | EN -> Statute Miles : -> Meters

    //! return Miles && Meters --> check in JSX
  }

  async function searchMetar(e: any) {
    e.preventDefault();
    if (icao.length !== 4) setAlertIcao(true);
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
      const flightRuleColor = getFlightRules(
        Math.round(metar[0].obs[0].visib * 16.101), //! if >= 9999 -> 9999
        metar[0].obs[0].cldBas1 !== null
          ? parseInt(metar[0].obs[0].cldBas1)
          : 9999
      );
      setFlightRule(flightRuleColor);
      if (/NOSIG/i.test(metar[0].obs[0].rawOb)) {
        setNosig(true);
      } else {
        setNosig(false);
      }
    }
  }, [metar[0]]);

  console.log(metar[0]);

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
            <Alert severity="error">Please provide ICAO Code</Alert>
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
        {metar[0] && (
          <>
            <Typography color="red">
              wxString {metar[0].obs[0].wxString}
            </Typography>
            <Typography color="red">precip {metar[0].obs[0].precip}</Typography>
            <Typography>-------------------------------</Typography>
            <Typography variant="h3">{metar[0].name.split(",")[0]}</Typography>
            <Typography>
              Metar issued at {convertDate(metar[0].obs[0].obsTime + "000")}
            </Typography>
            <Typography
              style={{
                backgroundColor: flightRule?.colorCode,
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
                data={formatVisibility()}
              ></DataView>
              {tempUnit ? (
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
              <ToggleButton
                value="toggle calsius fahrenheit"
                selected={tempUnit}
                onChange={() => {
                  setTempUnit(!tempUnit);
                }}
              >
                {tempUnit ? "°F" : "°C"}
              </ToggleButton>
              {metar[0].obs[0].wxString && (
                <DataView
                  description="Precipitation"
                  data={metar[0].obs[0].wxString}
                ></DataView>
              )}
            </Box>

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
            {metar[0].obs[0].wdir && (
              <Wind
                direction={parseInt(metar[0].obs[0].wdir)}
                speed={parseInt(metar[0].obs[0].wspd)}
                unit="kts"
                gusts={metar[0].obs[0].wgst}
              />
            )}

            {nosig && (
              <Typography sx={{ mt: 1, mb: 1 }}>
                <span style={{ color: "red" }}>NO SIG</span>nificant changes
                expected
              </Typography>
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
