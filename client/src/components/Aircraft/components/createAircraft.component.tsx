import { useState, useEffect } from "react";

import "../CSS/aircraft-form.css";

import { IAircraft } from "../interfaces/aircraft";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  userID: number | undefined;
};

function CreateAircraftForm(props: Props) {
  const [newAircraft, setNewAircraft] = useState({
    user: props.userID,
    manufacturer: "",
    model: "",
    type: "",
    registration_number: "",
    fuel_type: "",
    fuel_capacityL: null,
    cruise_fuel_consumptionL: null,
    cruise_speedKTS: null,
    magnetic_error: undefined,
    color: undefined,
    IFR: undefined,
    equiptment: undefined,
  } as IAircraft);

  useEffect(() => {
    console.log(newAircraft);
  }, [newAircraft]);

  return (
    <form action="" id="aircraft-form">
      <TextField
        label="manufacturer"
        required
        value={newAircraft.manufacturer}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, manufacturer: e.target.value })
        }
      ></TextField>
      <TextField
        label="model"
        required
        value={newAircraft.model}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, model: e.target.value })
        }
      ></TextField>
      <TextField
        label="type"
        required
        value={newAircraft.type}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, type: e.target.value })
        }
      ></TextField>
      <TextField
        label="registration number"
        required
        value={newAircraft.registration_number}
        onChange={(e) =>
          setNewAircraft({
            ...newAircraft,
            registration_number: e.target.value,
          })
        }
      ></TextField>
      <TextField
        label="fuel type"
        required
        value={newAircraft.fuel_type}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, fuel_type: e.target.value })
        }
      ></TextField>
      <TextField
        label="fuel capacity (L)"
        type="number"
        required
        value={newAircraft.fuel_capacityL}
        onChange={(e) =>
          setNewAircraft({
            ...newAircraft,
            fuel_capacityL: parseInt(e.target.value),
          })
        }
      ></TextField>
      <TextField
        label="cruise speed (KTS)"
        type="number"
        required
        value={newAircraft.cruise_speedKTS}
        onChange={(e) =>
          setNewAircraft({
            ...newAircraft,
            cruise_speedKTS: parseInt(e.target.value),
          })
        }
      ></TextField>
      <TextField
        label="cruise fuel consumption (L)"
        required
        value={newAircraft.cruise_fuel_consumptionL}
        onChange={(e) =>
          setNewAircraft({
            ...newAircraft,
            cruise_fuel_consumptionL: parseInt(e.target.value),
          })
        }
      ></TextField>
      <TextField
        label="magnetic error (deg)"
        required
        value={newAircraft.magnetic_error}
        inputProps={{
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
        label="color"
        value={newAircraft.color}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, color: e.target.value })
        }
      ></TextField>
      <Box sx={{ display: "flex", flexFlow: "row nowrap" }}>
        <Typography>IFR rated?</Typography>
        <Switch
          checked={newAircraft.IFR}
          onChange={(e) =>
            setNewAircraft({ ...newAircraft, IFR: e.target.checked })
          }
          inputProps={{ "aria-label": "IFR rated" }}
        />
      </Box>

      <TextField
        label="equipment"
        value={newAircraft.equiptment}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, equiptment: e.target.value })
        }
      ></TextField>
    </form>
  );
}

export default CreateAircraftForm;
