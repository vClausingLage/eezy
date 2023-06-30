import { Request, Response } from "express";

import { aircraft } from "../models/aircraft.sequelize.model.js";

import { validator } from "./Validation/validator.controller.js";

export function createAircraft() {
  console.log("aircraft created");
}

export async function getAircraft(req: Request, res: Response) {
  const aircraftResults = await aircraft.findAll({
    where: {
      user: "default",
    },
  });
  console.log("aircraftResults", aircraftResults);
  res.send(aircraftResults);
}

export async function deleteAircraft(req: Request, res: Response) {
  const id = req.params;
  await aircraft.destroy({
    where: {
      registration_number: id.id,
    },
  });
  res.send({ message: "aircraft deleted", id: id.id });
}
