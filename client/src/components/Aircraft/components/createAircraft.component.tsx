import { useState, useEffect } from "react";

import "../CSS/aircraft-form.css";

import { IAircraft } from "../interfaces/aircraft";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import { MenuItem } from "@mui/material";

type Props = {
  userID: string | undefined;
};

function CreateAircraftForm(props: Props) {
  const [newAircraft, setNewAircraft] = useState({
    user: props.userID,
    manufacturer: "",
    model: "",
    type: "",
    registration_number: "",
    fuel_type: "",
    fuel_capacityL: 0,
    cruise_fuel_consumptionL: 0,
    cruise_speedKTS: 0,
    magnetic_error: 0,
    color: "",
    IFR: false,
    equiptment: "",
  } as IAircraft);
  const [success, setSuccess] = useState(false);

  const fuelTypes = ["AvGas", "MoGas", "JetA1"];

  function submitAircraft() {
    fetch("/api/aircraft/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAircraft),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "created") setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    console.log(newAircraft);
  }, [newAircraft]);

  function inputValidation() {}

  return (
    <>
      {!props.userID && (
        <Alert severity="info">
          You must be logged in to create and choose your aircraft.
        </Alert>
      )}
      {props.userID && (
        <form onSubmit={submitAircraft} id="aircraft-form">
          <Box id="aircraft-form-column">
            <TextField
              label="Manufacturer"
              required
              value={newAircraft.manufacturer}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, manufacturer: e.target.value })
              }
            ></TextField>
            <TextField
              label="Model"
              required
              value={newAircraft.model}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, model: e.target.value })
              }
            ></TextField>
            <TextField
              label="Type"
              value={newAircraft.type}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, type: e.target.value })
              }
            ></TextField>
            <TextField
              label="Registration Number"
              required
              value={newAircraft.registration_number}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  registration_number: e.target.value.toUpperCase(),
                })
              }
            ></TextField>
            <TextField
              select
              label="Fuel Type"
              defaultValue=""
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_type: e.target.value,
                })
              }
            >
              {fuelTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Fuel Capacity (L)"
              type="number"
              required
              value={newAircraft.fuel_capacityL}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">liters</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_capacityL: parseInt(e.target.value),
                })
              }
            ></TextField>
          </Box>
          <Box id="aircraft-form-column">
            <TextField
              label="Cruise Speed (KTS)"
              type="number"
              required
              value={newAircraft.cruise_speedKTS}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kts</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_speedKTS: parseInt(e.target.value),
                })
              }
            ></TextField>
            <TextField
              label="Cruise Fuel Consumption (L)"
              type="number"
              required
              value={newAircraft.cruise_fuel_consumptionL}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">liters</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_fuel_consumptionL: parseInt(e.target.value),
                })
              }
            ></TextField>
            <TextField
              label="Magnetic Error (deg)"
              type="number"
              required
              value={newAircraft.magnetic_error}
              InputProps={{
                endAdornment: <InputAdornment position="end">°</InputAdornment>,
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  magnetic_error: parseInt(e.target.value),
                })
              }
            ></TextField>
            <TextField
              label="Color"
              value={newAircraft.color}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, color: e.target.value })
              }
            ></TextField>
            <Box
              sx={{ display: "flex", flexFlow: "row nowrap", color: "gray" }}
            >
              <Typography>IFR rated?</Typography>
              <Switch
                onChange={(e) =>
                  setNewAircraft({ ...newAircraft, IFR: e.target.checked })
                }
                inputProps={{ "aria-label": "IFR rated" }}
              />
            </Box>
            <TextField
              label="Equipment"
              value={newAircraft.equiptment}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, equiptment: e.target.value })
              }
            ></TextField>
          </Box>
          <Box id="submit-box">
            <Button
              onClick={submitAircraft}
              sx={{ maxWidth: "100px" }}
              variant="outlined"
            >
              save
            </Button>
            <Typography sx={{ color: "gray" }}>
              fields with{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>*</span> are
              required
            </Typography>
          </Box>
          {success && <Alert severity="info">created!</Alert>}
        </form>
      )}
    </>
  );
}

export default CreateAircraftForm;
