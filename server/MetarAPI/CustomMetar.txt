import { useState } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Zoom,
  IconButton,
  Alert,
} from "@mui/material";

import {
  prepareMetar,
  checkMetarIntegr,
  reduceTempo,
  maptoMetarObj,
} from "./Metar/metar-regex";
import { precipitation, getFlightRules } from "./Metar/metar-ui-helper";
import { IMetar, IFlightRule } from "./Metar/assets/IMetar";

import Cloud from "./Metar/assets/Cloud";
import Sun from "./Metar/assets/Sun";
import Wind from "./Metar/assets/Wind";
import Search from "@mui/icons-material/Search";

function Metar() {
  const [icao, setIcao] = useState("");
  const [metarCode, setMetarCode] = useState<IMetar>();
  const [flightRule, setFlightRule] = useState<IFlightRule>();
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
  function handleSubmit(e: any) {
    e.preventDefault();
    if (icao.length === 4) searchIcao();
    if (icao.length !== 4) setAlertIcao(true);
  }
  function sendLogs() {
    fetch("http://localhost:4000/api/logs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metarCode),
    });
  }

  async function searchIcao() {
    setIsLoading(true);
    const fetchMetar = await fetch(
      "https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=" + icao
    );
    const data = await fetchMetar.text();
    const response = fetchMetar.headers;
    if (
      response.get("content-length") === null ||
      response.get("content-length") === "0"
    ) {
      setAlertIcao(true);
      setIsLoading(false);
      return;
    }
    let metarList = prepareMetar(data);
    checkMetarIntegr(metarList);
    let metarListReduced: string[][] = reduceTempo(metarList);
    let metarObj = maptoMetarObj(metarListReduced[0]);
    setMetarCode(metarObj);
    let flightRules = getFlightRules(
      metarObj.Visibility,
      metarObj.Cloud_Layer[0]?.cloudBase !== null
        ? metarObj.Cloud_Layer[0]?.cloudBase
        : 9999
    );
    setFlightRule(flightRules);
    // sendLogs()                           //! make it work!
    console.log(metarObj);
    setIsLoading(false);
  }

  function precipitation() {
    if (metarCode?.Precipitation?.elements) {
      metarCode?.Precipitation?.elements.map((el) => {
        return <span>{el}</span>;
      });
    }
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
            <form onSubmit={handleSubmit}>
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
                      onClick={handleSubmit}
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
          {isLoading && loading}
          {metarCode && (
            <Box
              id="Metar Data"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1">
                METAR submitted for {metarCode.Date.toUTCString()}
              </Typography>
              <Tooltip
                title=<div>
                  Color Codes for Flight Rules,
                  <br /> see bottom of page
                </div>
                arrow
                placement="right"
                TransitionComponent={Zoom}
              >
                <Typography
                  style={{
                    backgroundColor: flightRule?.colorCode,
                    textAlign: "center",
                    padding: "0.3rem",
                  }}
                >
                  {flightRule?.flightRule}
                </Typography>
              </Tooltip>
              <Typography>QNH {metarCode.QNH} hPa</Typography>
              <Typography>
                Temperature {metarCode.Temperature[0]} °C <br />
                Dewpoint {metarCode.Temperature[1]} °C
              </Typography>
              <Box display="flex" flexDirection="column">
                {(metarCode.Visibility === "CAVOK" ||
                  metarCode.Visibility === 9999) &&
                  (metarCode.Cloud_Layer[0]?.cloudLayer === "NCD" ||
                    metarCode.Cloud_Layer[0]?.cloudLayer === "CLR") && <Sun />}
                {metarCode.Cloud_Layer !== undefined &&
                  metarCode.Cloud_Layer.map((el, key) => {
                    return (
                      <Cloud
                        key={key}
                        visibility={metarCode.Visibility}
                        cloudBase={el.cloudBase}
                        cloudLayer={el.cloudLayer}
                      />
                    );
                  })}
              </Box>
              <Typography>precipitation</Typography>
              <Box style={{ maxWidth: "250px" }}>
                <Wind {...metarCode?.Winds} />
              </Box>
              {metarCode.NOSIG && (
                <Typography>
                  <span style={{ color: "red" }}>NO SIG</span>nificant changes
                  expected
                </Typography>
              )}
              <Typography>{metarCode.RawMetar}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Metar;
