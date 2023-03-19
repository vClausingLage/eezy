import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savedAircraft } from "../../../features/redux/savedAircraftSlice";

import AircraftCard from "./aircraftCard.component";
import { IAircraft } from "../interfaces/aircraft";

import Box from "@mui/material/Box";

import "../CSS/aircraft-card.css";

type Props = {
  userID: string | undefined;
};

function GetAircraft(props: Props) {
  const savedAircraftList = useSelector(
    (state: any) => state.savedAircraft.list
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAircraft() {
      const response = await fetch(`/api/aircraft/create/${props.userID}`);
      const result = await response.json();
      console.log("fetching Aircraft from React");
      dispatch(savedAircraft(result));
      console.log(savedAircraftList);
    }
    if (props.userID !== undefined) getAircraft();
  }, [props.userID]);

  return (
    <Box className="aircraft-container">
      {savedAircraftList.map((el: IAircraft, idx: number) => (
        <AircraftCard key={idx} aircraft={el} />
      ))}
    </Box>
  );
}

export default GetAircraft;
