import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

import "../CSS/flight-calculator.css";

type Props = {
  distance: number;
  fuelCapacity: number;
  fuelConsumption: number;
  cruiseSpeed: number;
};

function FlightCalculator(props: Props) {
  const [fuelLoaded, setFuelLoaded] = useState<number>(0);
  const [rangeAlert, setRangeAlert] = useState(false);

  function handleChange(e: any) {
    if (e.target.value !== undefined || e.target.value > 0)
      setFuelLoaded(parseInt(e.target.value));
  }

  const calculateFuel = (
    distance: number,
    fuelCapacity: number,
    fuelConsumption: number,
    cruiseSpeed: number
  ): number => {
    console.log(distance, fuelLoaded, fuelConsumption, cruiseSpeed);
    let duration = fuelLoaded / fuelConsumption;
    console.log(duration);
    let range = Math.round(duration * cruiseSpeed);
    return range;
  };

  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Fuel Calculator
      </Typography>
      <Box className="fuel-selection">
        <TextField
          label="Fuel Loaded"
          type="number"
          required
          value={fuelLoaded}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">liters</InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>
        <Typography display="inline">
          of {props.fuelCapacity} liters max. Capacity
        </Typography>
      </Box>
      <Box>
        <Typography>
          max Range (reserve 45"):{" "}
          {calculateFuel(
            props.distance,
            fuelLoaded,
            props.fuelConsumption,
            props.cruiseSpeed
          )}{" "}
          nautical miles
        </Typography>
      </Box>
    </Box>
  );
}

export default FlightCalculator;
