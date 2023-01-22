import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Zoom,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  const [isLoading, setIsLoading] = useState(false);

  const loading = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIcao(event.currentTarget.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const sendLogs = () => {
    fetch("http://localhost:4000/api/logs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metarCode),
    });
  };

  const searchIcao = async () => {
    setIsLoading(true);
    const fetchMetar = await fetch(
      "https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=" + icao
    );
    const data = await fetchMetar.text();
    let metarList = prepareMetar(data);
    checkMetarIntegr(metarList);
    let metarListReduced: string[][] = reduceTempo(metarList);
    let metarObj = maptoMetarObj(metarListReduced[0]);
    setMetarCode(metarObj);
    let flightRules = getFlightRules(
      metarObj.Visibility,
      metarObj.Cloud_Layer[0]?.cloudBase
    );
    setFlightRule(flightRules);
    // sendLogs()                           //! make it work!
    console.log(metarObj);
    setIsLoading(false);
  };

  const precipitation = () => {
    if (metarCode?.Precipitation?.elements) {
      metarCode?.Precipitation?.elements.map((el) => {
        return <span>{el}</span>;
      });
    }
  };

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
                    <IconButton type="submit" onClick={searchIcao}>
                      <Search />
                    </IconButton>
                  ),
                }}
              ></TextField>
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
                {metarCode.Visibility === "CAVOK" ||
                  (metarCode.Visibility === 9999 &&
                    metarCode.Cloud_Layer[0].cloudLayer === "NCD" && <Sun />)}
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
              <Typography>{metarCode?.RawMetar}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Metar;
