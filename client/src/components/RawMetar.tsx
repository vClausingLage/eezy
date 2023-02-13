import { useState, useEffect } from "react";

import { Box, Typography, TextField, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";

import { prepareMetar, maptoMetarObj } from "./Metar/metar-regex";

function RawMetar() {
  const [metarObject, setMetarObject] = useState({});
  const [icao, setIcao] = useState("");
  const [rawMetar, setRawMetar] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcao(event.target.value);
  }

  async function searchMetar(e: any) {
    //! remove any
    e.preventDefault();
    const response = await fetch(`/api/raw/${icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/text",
      },
    });
    const data = await response.text();
    setRawMetar(data);
  }

  useEffect(() => {
    const metarList = prepareMetar(rawMetar);
    setMetarObject(maptoMetarObj(metarList));
  }, [rawMetar]);

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
            value={icao.toUpperCase()}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  id="searchButton"
                  type="submit"
                  onClick={searchMetar}
                  disabled={false}
                >
                  <Search />
                </IconButton>
              ),
            }}
          ></TextField>
        </form>
      </Box>
      <Box></Box>
    </>
  );
}

export default RawMetar;
