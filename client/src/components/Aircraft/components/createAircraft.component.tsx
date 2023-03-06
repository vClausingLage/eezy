import { useState, useEffect } from "react";

import { IAircraft } from "../interfaces/aircraft";

import TextField from "@mui/material/TextField";

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
    fuel_capacityL: 0,
    cruise_fuel_consumptionL: 0,
    magnetic_error: undefined,
    color: undefined,
    IFR: undefined,
    equiptment: undefined,
    characteristics: undefined,
  } as IAircraft);

  useEffect(() => {
    console.log(newAircraft);
  }, [newAircraft]);

  return (
    <form action="">
      <TextField
        label="manufacturer"
        value={newAircraft.manufacturer}
        onChange={(e) =>
          setNewAircraft({ ...newAircraft, manufacturer: e.target.value })
        }
      ></TextField>
    </form>
  );
}

export default CreateAircraftForm;
