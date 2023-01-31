import { Typography, Grid, Box, ToggleButton } from "@mui/material";

import DataView from "./DataView";

function MuiTest() {
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={5} md={8}>
          <ToggleButton
            value="toggle calsius fahrenheit"
            selected={tempUnit}
            onChange={() => {
              setTempUnit(!tempUnit);
            }}
          >
            {tempUnit ? "°F" : "°C"}
          </ToggleButton>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <DataView description="TEST" data={1200} />
        </Grid>
      </Grid>
    </>
  );
}

export default MuiTest;
