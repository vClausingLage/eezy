import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

import { getRange, getDuration } from "../helper/fuel-calculator";

import "../CSS/planner-calculator.css";

type Props = {
  distance: number;
  fuelCapacity: number;
  fuelConsumption: number;
  cruiseSpeed: number;
};

function FlightCalculator(props: Props) {
  const [fuelLoaded, setFuelLoaded] = useState<number>(0);
  const [fuelReserve, setFuleReserve] = useState<number>(45);
  const [rangeAlert, setRangeAlert] = useState(false);

  function handleFuelChange(e: any) {
    if (e.target.value !== undefined || e.target.value > 0)
      setFuelLoaded(parseInt(e.target.value));
  }
  function handleReserveChange(e: any) {
    setFuleReserve(e.target.value);
  }

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
          onChange={(e) => handleFuelChange(e)}
        ></TextField>

        <Typography display="inline">
          of {props.fuelCapacity} liters max. Capacity
        </Typography>
      </Box>
      <TextField
        label="Fuel Reserve"
        type="number"
        required
        value={fuelReserve}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
        onChange={(e) => handleReserveChange(e)}
      ></TextField>
      <Box>
        <Typography>
          max Range:{" "}
          {getRange(fuelLoaded, props.fuelCapacity, props.cruiseSpeed)} nautical
          miles
        </Typography>
      </Box>
      <p>expected Taxi Fuel (default 5L)</p>
      <p>headwinds -- use GS for fuel calc!</p>
      <p>absolutly NECCESSARY</p>
      <ul>
        <li>monitor fuel consumption of previous flights</li>
        <li>check fuel LOW indication</li>
        <li>always apply fuel mixture</li>
        <li>
          https://www.simcoders.com/2018/09/07/how-to-calculate-the-fuel-required-for-your-flight/
        </li>
        <li>
          https://www.flight-study.com/2021/05/basic-calculations-cross-country-flight.html
        </li>
      </ul>
    </Box>
  );
}

export default FlightCalculator;
