import { Request, Response } from "express";

import { aircraft } from "../models/aircraft.sequelize.model.js";

import { validator } from "./Validation/validator.controller.js";

export async function createAircraft(req: Request, res: Response) {
  const newAircraft = req.body;
  const jane = await aircraft.create(newAircraft);
}

export async function getAircraft(req: Request, res: Response) {
  const user = req.params.id;
  const aircraftResults = await aircraft.findAll({
    where: {
      user: user,
    },
  });
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

export async function editAircraft(req: Request, res: Response) {}
