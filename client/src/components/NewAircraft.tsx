import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Aircraft() {
  // fetch("/aircraft/aircraft", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const [aircraftSelect, setAircraftSelect] = useState("");
  const [aircraftModelSelect, setAircraftModelSelect] = useState("");

  const handleACChange = (event: any) => {
    // ! remove any
    setAircraftSelect(event.currentTarget.value);
  };
  const handleModelChange = (event: any) => {
    // ! remove any
    setAircraftModelSelect(event.currentTarget.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Aircraft</Typography>
        <Box sx={{ margin: "auto", minWidth: 120, maxWidth: "80%" }}>
          <FormControl fullWidth>
            <InputLabel id="ac-select-label">Manufacturer</InputLabel>
            <Select
              labelId="ac-select-label"
              id="ac-select"
              value={aircraftSelect}
              label="Select Aircraft"
              onChange={handleACChange}
            >
              <MenuItem value={10}>Cessna</MenuItem>
              <MenuItem value={20}>Beechcraft</MenuItem>
              <MenuItem value={30}>Piper</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="ac-model-select-label">Model</InputLabel>
            <Select
              labelId="ac-model-select-label"
              id="ac-model-select"
              value={aircraftModelSelect}
              label="Select Aircraft Model"
              onChange={handleModelChange}
            >
              <MenuItem value={10}>Cessna</MenuItem>
              <MenuItem value={20}>Beechcraft</MenuItem>
              <MenuItem value={30}>Piper</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Aircraft;
