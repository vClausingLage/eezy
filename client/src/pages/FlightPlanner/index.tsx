import React, { useState, useEffect } from "react";

import ShowAircraftCards from "./components/showAircraftCards";

import { IAircraft } from "./interfaces/aircraft";

type Props = {
  user?: string;
  isAuthenticated: boolean;
};

function FlightPlanner({ user, isAuthenticated }: Props) {
  const [aircraft, setAircraft] = useState([] as IAircraft[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchAircraft = async () => {
        const response = await fetch(`/api/aircraft/create/${user}`);
        const result = await response.json();
        if (result.message === "fetched") {
          setAircraft(result.data);
          setLoading(false);
        } else if (result.message === "no aircraft") {
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      if (aircraft.length === 0 && isAuthenticated) {
        setLoading(true);
        fetchAircraft();
      }
    }
  }, [user]);

  const editAircraft = async (id: number | null, user?: string) => {
    if (id && user) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "update",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log("edited", result.data);
    }
  };

  const deleteAircraft = async (id: number | null, user?: string) => {
    if (id && user) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.message === "created") {
        console.log("deleted", result.data);
      }
    }
  };

  return (
    <ShowAircraftCards
      aircraft={aircraft}
      loading={loading}
      editAircraft={editAircraft}
      deleteAircraft={deleteAircraft}
      user={user}
    />
  );
}

export default FlightPlanner;
