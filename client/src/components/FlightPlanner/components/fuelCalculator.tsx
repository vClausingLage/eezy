import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
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

      <FuelCalculatorTextInput
        label="Fuel Loaded"
        unit="liters"
        value={fuelLoaded}
        placeholder=""
        helperText={`of aircraftʼs ${props.fuelCapacity} liters max fuel`}
        handleChange={(e) => handleFuelChange(e)}
      />

      <FuelCalculatorTextInput
        label="Fuel Reserve"
        unit="minutes"
        value={fuelReserve}
        placeholder="e.g. 45"
        helperText={`(equals ${Math.round(
          (props.fuelConsumption / 60) * fuelReserve
        )} liters)`}
        handleChange={(e) => handleReserveChange(e)}
      />

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
      <Box className="attention-bar">
        <Stack direction="row" alignItems="center">
          <PriorityHighIcon color="warning" />
          <Typography color="warning.main">ATTENTION</Typography>
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
          <li>
            recommended fuel reserve is 30" (day), 45" (night) [
            <a
              href="https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-135/subpart-D/section-135.209"
              target="_blank"
              rel="noreferrer"
            >
              link
            </a>
            ]
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default FlightCalculator;