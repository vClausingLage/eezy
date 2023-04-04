import { useState } from "react";

import { TextField, Box, IconButton } from "@mui/material";
import { Search, Check } from "@mui/icons-material";

type Props = {
  value: string;
  adornment: string;
  submit: (icao: string) => void;
};

function IcaoInput(props: Props) {
  const inputPropsSearch = {
    endAdornment: (
      <IconButton
        id="search-button"
        type="submit"
        onClick={handleSubmit}
        disabled={props.value.length === 4 ? false : true}
      >
        <Search />
      </IconButton>
    ),
  };
  const inputPropsCheck = {
    endAdornment: (
      <Check color={props.value.length === 4 ? "success" : "disabled"} />
    ),
  };

  function handleChange(e: any) {
    props.submit(e.target.value);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    props.submit(e.target.value);
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          type="search"
          label="enter ICAO Code"
          value={props.value}
          onChange={(e) => handleChange(e)}
          InputProps={
            props.adornment === "search" ? inputPropsSearch : inputPropsCheck
          }
        ></TextField>
      </form>
    </Box>
  );
}

export default IcaoInput;
