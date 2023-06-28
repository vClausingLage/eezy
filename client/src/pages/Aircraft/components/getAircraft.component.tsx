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

function GetAircraft({ userID }: Props) {
  const savedAircraftList = useSelector(
    (state: any) => state.savedAircraft.list
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAircraft = async () => {
      const response = await fetch(`/api/aircraft/create/${userID}`);
      const result = await response.json();
      console.log(result);
      dispatch(savedAircraft(result));
    };
    if (savedAircraftList.length === 0) {
      fetchAircraft();
    }
  }, [userID]);

  return (
    <Box className="aircraft-container">
      {savedAircraftList.length === 0 && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {savedAircraftList.map((el: IAircraft) => (
        <AircraftCard key={el.registration_number} aircraft={el} />
      ))}
    </Box>
  );
}

export default GetAircraft;
