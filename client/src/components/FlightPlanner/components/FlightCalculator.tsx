import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import Stack from "@mui/material/Stack";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import FuelCalculatorTextInput from "./fuelCalculatorTextInput";

import { getRange } from "../helper/fuel-calculator";

import "../CSS/planner-calculator.css";

type Props = {
  distance: number;
  fuelCapacity: number;
  fuelConsumption: number;
  cruiseSpeed: number;
};

function FlightCalculator(props: Props) {
  const [fuelLoaded, setFuelLoaded] = useState<number>(0);
  const [fuelReserve, setFuleReserve] = useState<number>(0);
  const [fuelMaxAlert, setFuelMaxAlert] = useState(false);
  const [rangeAlert, setRangeAlert] = useState(false);

  function handleFuelChange(e: any) {
    if (e.target.value !== undefined && e.target.value >= 0) {
      setFuelLoaded(parseInt(e.target.value));
      setFuelMaxAlert(false);
    }
    if (e.target.value > props.fuelCapacity) setFuelMaxAlert(true);
  }
  function handleReserveChange(e: any) {
    setFuleReserve(e.target.value);
  }

  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Fuel Calculator
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        className="fuel-selection"
      >
        <FuelCalculatorTextInput
          label="Fuel Loaded"
          unit="liters"
          value={fuelLoaded}
          handleChange={(e) => handleFuelChange(e)}
        />
        <Typography display="inline">
          of {props.fuelCapacity} liters max. Capacity
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <FuelCalculatorTextInput
          label="Fuel Reserve"
          unit="minutes"
          value={fuelReserve}
          handleChange={(e) => handleReserveChange(e)}
        />
        <Typography display="inline">
          (equals {(props.fuelConsumption / 60) * fuelReserve} liters)
        </Typography>
      </Stack>
      <Box>
        {fuelMaxAlert && (
          <Alert severity="error">
            Fuel Load exceeds your Aircraft&#700;s max. Capacity!
          </Alert>
        )}
        <Typography>
          max Range:{" "}
          {getRange(fuelLoaded, props.fuelConsumption, props.cruiseSpeed)}{" "}
          nautical miles
        </Typography>
      </Box>
      <Typography className="attention-bar">
        <Stack direction="row" alignItems="center" gap={1}>
          <PriorityHighIcon /> ATTENTION
        </Stack>
        <ul>
          <li>fuel calculations are guidelines not exact values</li>
          <li>
            always check your aircraft&#700;s flight manual, fuel consumption
            may vary for individual aircraft
          </li>
          <li>
            monitor your aircraft&#700;s fuel consumption of previous flights
          </li>
          <li>
            note that most GA aircraft&#700;s fuel inidcators are vague and do
            not indicate exact fuel amounts
          </li>
          <li>
            apply mixture according to altitude and fly at the
            manufacturer&#700;s recommended cruise RPM
          </li>
          <li>double check with your own calculations</li>
        </ul>
      </Typography>
    </Box>
  );
}

export default FlightCalculator;
