import { Request, Response } from "express";

import { aircraft } from "../models/aircraft.sequelize.model.js";

import { validator } from "./Validation/validator.controller.js";

export async function createAircraft(req: Request, res: Response) {
  try {
    const newAircraft = req.body;
    await aircraft.create(newAircraft);
    const response = await aircraft.findAll({
      where: {
        user: newAircraft.user,
      },
    });
    res.send({ message: "created" });
  } catch (error) {
    console.log("error creating aircraft", error);
  }
}

export async function getAircraft(req: Request, res: Response) {
  const user = req.params.id;
  const response = await aircraft.findAll({
    where: {
      user: user,
    },
  });
  res.send(response);
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
