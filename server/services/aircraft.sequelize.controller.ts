import { Request, Response } from "express";

import { aircraft } from "../models/aircraft.sequelize.model.js";

export function createAircraft() {
  console.log("create");
}

export async function getAircraft(req: Request, res: Response) {
  const aircraftResults = await aircraft.findAll({
    where: {
      user: "default",
    },
  });
  res.send(aircraftResults);
}
