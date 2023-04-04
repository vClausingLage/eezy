import { useState } from "react";

import { TextField, Box, IconButton } from "@mui/material";
import { Search, Check } from "@mui/icons-material";

type Props = {
  adornment: string;
  submit: (icao: any) => void;
};

function IcaoInput(props: Props) {
  const [icao, setIcao] = useState("");

  const inputPropsSearch = {
    endAdornment: (
      <IconButton
        id="search-button"
        type="submit"
        onClick={handleSubmit}
        disabled={icao.length === 4 ? false : true}
      >
        <Search />
      </IconButton>
    ),
  };
  const inputPropsCheck = {
    endAdornment: <Check color={icao.length === 4 ? "success" : "disabled"} />,
  };

  function handleChange(e: any) {
    setIcao(e.target.value);
    console.log(icao);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          type="search"
          label="enter ICAO Code"
          value={icao}
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
