import { useState, useEffect } from "react";

import AircraftCard from "./aircraftCard.component";
import { IAircraft } from "../interfaces/aircraft";

import Box from "@mui/material/Box";

import "../CSS/aircraft-card.css";

type Props = {
  userID: string | undefined;
};

function GetAircraft(props: Props) {
  const [aircraft, setAircraft] = useState([]);
  useEffect(() => {
    async function getAircraft() {
      const response = await fetch(`/api/aircraft/create/${props.userID}`);
      const result = await response.json();
      setAircraft(result);
    }
    getAircraft();
  }, [props.userID]);

  useEffect(() => {
    console.log("aircraft get", aircraft);
  }, [aircraft]);

  return (
    <Box id="aircraft-container">
      {aircraft.map((el: IAircraft) => (
        <AircraftCard
          key={el.registration_number}
          manufacturer={el.manufacturer}
          model={el.model}
          registration_number={el.registration_number}
        />
      ))}
    </Box>
  );
}

export default GetAircraft;
