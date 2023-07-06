import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { savedAircraft } from "../../../features/redux/savedAircraftSlice";

import AircraftCard from "./aircraftCard.component";
import LoadingCircleDescription from "../../General/LoadingCircleDescription";

import { IAircraft } from "../interfaces/aircraft";

import Box from "@mui/material/Box";

import "../CSS/aircraft-card.css";

type Props = {
  user: string | undefined;
  isAuthenticated: boolean;
};

function GetAircraft({ user, isAuthenticated }: Props) {
  const [loading, setLoading] = useState(false);
  const savedAircraftList = useSelector(
    (state: any) => state.savedAircraft.list
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAircraft = async () => {
        const response = await fetch(`/api/aircraft/create/${user}`);
        const result = await response.json();
        if (!result.message) {
          dispatch(savedAircraft(result));
          setLoading(false);
        } else if (result.message === "no aircraft") {
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      if (savedAircraftList.length === 0 && isAuthenticated) {
        setLoading(true);
        fetchAircraft();
      }
    }
  }, [user, dispatch]);

  const editAircraft = async (id: number | null) => {
    if (id) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "update",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log("edited", result.data);
    }
  };

  const deleteAircraft = async (id: number | null) => {
    console.log("delete");
    if (id) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.message === "created") {
        console.log("deleted", result.data);
        // dispatch(savedAircraft(result.data));
      }
    }
  };

  return (
    <Box className="aircraft-container">
      {savedAircraftList.length === 0 && loading && (
        <LoadingCircleDescription description="Looking up Saved Aircraft" />
      )}

      {savedAircraftList.length === 0 && <h3>no Aircraft found</h3>}

      {savedAircraftList.map((ac: IAircraft) => (
        <AircraftCard
          key={ac.registration_number}
          aircraft={ac}
          editAircraft={editAircraft}
          deleteAircraft={deleteAircraft}
        />
      ))}
    </Box>
  );
}

export default GetAircraft;
