import { useState } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Search from "@mui/icons-material/Search";

type Props = {
  submit: (icao: any) => void;
};

function IcaoInput(props: Props) {
  const [icao, setIcao] = useState("");

  function handleChange(e: any) {
    setIcao(e.target.value);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("hi");
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          type="search"
          label="enter ICAO Code"
          value={icao}
          onChange={(e) => handleChange(e)}
          InputProps={{
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
          }}
        ></TextField>
      </form>
    </Box>
  );
}

export default IcaoInput;
