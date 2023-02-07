import { useState, useEffect } from "react";

import { Box, Typography, TextField, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";

import { IMetar } from "./Metar/IMetar";

function RawMetar() {
  const [metarObject, setMetarObject] = useState({} as IMetar);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMetarObject({
      ...metarObject,
      ICAO: event.target.value,
    });
  }

  async function searchMetar(e: any) {
    //! remove any
    e.preventDefault();
    const response = await fetch(`/api/${metarObject.ICAO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMetarObject({ ...metarObject, RawMetar: data[0].obs[0].rawOb });
  }

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
            value={metarObject.ICAO.toUpperCase()}
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
    </>
  );
}

export default RawMetar;
