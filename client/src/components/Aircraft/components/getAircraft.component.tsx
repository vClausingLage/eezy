import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { savedAircraft } from "../../../features/redux/savedAircraftSlice";

import AircraftCard from "./aircraftCard.component";
import LoadingCircleDescription from "../../General/LoadingCircleDescription";

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
    async function fetchAircraft() {
      const response = await fetch(`/api/aircraft/create/${props.userID}`);
      const result = await response.json();
      console.log("fetching Aircraft from React");
      dispatch(savedAircraft(result));
    }
    if (savedAircraftList.length === 0) {
      fetchAircraft();
    }
  }, [props.userID]);

  return (
    <Box className="aircraft-container">
      {savedAircraftList.length === 0 && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {savedAircraftList.map((el: IAircraft, idx: number) => (
        <AircraftCard key={idx} aircraft={el} />
      ))}
    </Box>
  );
}

export default GetAircraft;
