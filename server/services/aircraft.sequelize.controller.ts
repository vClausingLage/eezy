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
    res.send({ message: "created", data: response });
  } catch (error) {
    console.log("error creating aircraft", error); //! send back error message
  }
}

export async function getAircraft(req: Request, res: Response) {
  const user = req.params.id;
  const response = await aircraft.findAll({
    where: {
      user: user,
    },
  });
  if (response.length > 0) {
    res.send({ message: "created", data: response });
  } else {
    res.send({ message: "no aircraft" });
  }
}

export async function deleteAircraft(req: Request, res: Response) {
  try {
    const id = req.params;
    await aircraft.destroy({
      where: {
        registration_number: id.id,
      },
    });
    res.send({ message: "aircraft deleted", id: id.id }); //! send back new AC list
  } catch (error) {
    console.log("error", error);
  }
}

export async function editAircraft(req: Request, res: Response) {
  const id = req.params;
  console.log("id", id);
}
