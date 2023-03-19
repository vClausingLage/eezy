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
      console.log("fetching Aircraft from React");
      setAircraft(result);
    }
    if (props.userID !== undefined) getAircraft();
  }, [props.userID]);

  return (
    <Box className="aircraft-container">
      {aircraft.map((el: IAircraft) => (
        <AircraftCard key={el.registration_number} aircraft={el} />
      ))}
    </Box>
  );
}

export default GetAircraft;
