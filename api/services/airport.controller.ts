import { Request, Response } from "express";
import { airportApi } from "../config/config.js";

export async function getAirport(req: Request, res: Response) {
  const icao = req.params.airportID;
  try {
    const fetchAirport = await fetch(
      `https://airportdb.io/api/v1/airport/${icao}?apiToken=${airportApi}`,
      {
        method: "get",
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

// SEQUELIZE INIT
//! refactor when finished
import { latLong } from "../models/latLong.sequelize.model.js";

export async function getDistance(req: Request, res: Response) {
  const icao = req.params.icao;

  let icaoArr = icao.split(",");

  try {
    const latLongResults = await latLong.findAll({
      attributes: ["icao", "latitude", "longitude"],
      where: {
        icao: [icaoArr[0], icaoArr[1]],
      },
    });
    console.log("icao latLong", icao);
    res.send(latLongResults);
  } catch {
    res.send({ type: "error", message: "Error fetching data from Database." });
  }
  //! test for working connections with multiple queries
  // sequelize.close();
}
