import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { savedAircraft } from "../../../features/redux/savedAircraftSlice";

import { fuelTypes } from "./assets/fuelTypes";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-form.css";

import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  InputAdornment,
  MenuItem,
} from "@mui/material";

type Props = {
  userID: string | undefined;
};

function CreateAircraftForm({ userID }: Props) {
  const [newAircraft, setNewAircraft] = useState({
    user: userID,
    manufacturer: "",
    model: "",
    type: "",
    registration_number: "",
    fuel_type: "",
    fuel_capacity: undefined,
    cruise_fuel_consumption: undefined,
    cruise_speed: undefined,
    magnetic_error: undefined,
    color: "",
    IFR: false,
    equiptment: "",
  } as IAircraft);
  const [success, setSuccess] = useState(false);

  const savedAircraftList = useSelector(
    (state: any) => state.savedAircraft.list
  );
  const dispatch = useDispatch();

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
        if (data.message === "created") {
          setSuccess(true);
          dispatch(savedAircraft([...savedAircraftList, newAircraft]));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {!userID && ( //! change with LOGIN
        <Alert severity="info">
          You must be logged in to create and choose your aircraft.
        </Alert>
      )}
      {userID && ( //! change with LOGIN
        <form onSubmit={submitAircraft} className="aircraft-form">
          <Box className="aircraft-form-column">
            <TextField
              label="Manufacturer"
              placeholder="e.g. Cessna"
              required
              value={newAircraft.manufacturer}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, manufacturer: e.target.value })
              }
            ></TextField>
            <TextField
              label="Model"
              placeholder="e.g. C172"
              required
              value={newAircraft.model}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, model: e.target.value })
              }
            ></TextField>
            <TextField
              label="Type"
              placeholder="e.g. SP"
              value={newAircraft.type}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, type: e.target.value })
              }
            ></TextField>
            <TextField
              label="Registration Number"
              placeholder="e.g. DKIFF"
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
              placeholder="Fuel Type"
              value={newAircraft.fuel_type}
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
              placeholder="Fuel Capacity"
              type="number"
              required
              value={String(newAircraft.fuel_capacity)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">liters</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  fuel_capacity: Number(e.target.value),
                })
              }
            ></TextField>
          </Box>
          <Box className="aircraft-form-column">
            <TextField
              label="Cruise Speed (KTS)"
              type="number"
              required
              value={String(newAircraft.cruise_speed)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kts</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_speed: Number(e.target.value),
                })
              }
            ></TextField>
            <TextField
              label="Cruise Fuel Consumption (L)"
              type="number"
              required
              value={String(newAircraft.cruise_fuel_consumption)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">liters</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setNewAircraft({
                  ...newAircraft,
                  cruise_fuel_consumption: Number(e.target.value),
                })
              }
            ></TextField>
            <TextField
              label="Magnetic Error (deg)"
              type="number"
              required
              value={String(newAircraft.magnetic_error)}
              InputProps={{
                endAdornment: <InputAdornment position="end">°</InputAdornment>,
              }}
              onChange={(e) => {
                setNewAircraft({
                  ...newAircraft,
                  magnetic_error: Number(e.target.value),
                });
              }}
            ></TextField>
            <TextField
              label="Color"
              placeholder="e.g. blue white"
              value={newAircraft.color}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, color: e.target.value })
              }
            ></TextField>
            <FormGroup className="ifr-box">
              <FormControlLabel
                control={
                  <Switch
                    onChange={(e) =>
                      setNewAircraft({
                        ...newAircraft,
                        IFR: e.target.checked,
                      })
                    }
                  />
                }
                label="IFR rated?"
              />
            </FormGroup>

            <TextField
              label="Equipment"
              placeholder="e.g. VFR, G1000, Flarm..."
              value={newAircraft.equiptment}
              onChange={(e) =>
                setNewAircraft({ ...newAircraft, equiptment: e.target.value })
              }
            ></TextField>
          </Box>
          <Box className="submit-box">
            <Button
              onClick={submitAircraft}
              style={{ maxWidth: "100px" }}
              variant="contained"
            >
              save
            </Button>
            <Typography
              style={{
                color: "gray",
                textAlign: "left",
                alignSelf: "center",
              }}
            >
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
