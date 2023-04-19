import { Request, Response } from "express";
import { airportApi } from "../config/config.js";

export async function getAirport(req: Request, res: Response) {
  const icao = req.params.airportID;
  try {
    const fetchAirport = await fetch(
      `https://airportdb.io/api/v1/airport/${icao}?apiToken=${airportApi}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await fetchAirport.json();
    if (fetchAirport.status === 200) res.send(data);
    else res.send({ message: "error" });
  } catch (error) {
    console.log(error);
  }
}

export async function getDistance(req: Request, res: Response) {
  const icao = req.params.icao;
  res.send({ message: icao + " ok" });
}
