import { useState, useEffect } from "react";

type Props = {
  userID: string | undefined;
};

function GetAircraft(props: Props) {
  useEffect(() => {
    async function getAircraft() {
      const response = await fetch(`/api/aircraft/create/${props.userID}`);
      const result = await response.json();
    }
    getAircraft();
  }, []);

  return <>{}</>;
}

export default GetAircraft;
