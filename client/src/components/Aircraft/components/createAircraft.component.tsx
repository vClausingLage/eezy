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
