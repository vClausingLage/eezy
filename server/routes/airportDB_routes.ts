export const airportDBKey =
  "0d46287852ad25837bf4e3394ff91c6a0f1218856d03f31e77b71dfb1daa696e4ab33ecb68ceb2fbf7ad1a2ab83241f9";

import { Request, Response, Router } from "express";

export const airportDB_router = Router();

airportDB_router.get("/:airportID", async (req: Request, res: Response) => {
  const icao = req.params.metarID;
  try {
    const fetchAirport = await fetch(
      `https://airportdb.io/api/v1/airport/${icao}?apiToken=${airportDBKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await fetchAirport.json();
    if (fetchAirport.status === 200 && data.length > 0) res.send(data[0]);
    else res.send({ message: "error" });
  } catch (error) {
    console.log(error);
  }
});
