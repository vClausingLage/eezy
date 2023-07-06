import { Request, Response } from "express";

import { aircraft } from "../models/aircraft.sequelize.model.js";

import { validator } from "./Validation/validator.controller.js";

export async function getAircraft(req: Request, res: Response) {
  const user = req.params.user;
  const response = await aircraft.findAll({
    where: {
      user,
    },
  });
  if (response.length > 0) {
    res.send({ message: "fetched", data: response });
  } else {
    res.send({ message: "no aircraft" });
  }
}

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

export async function editAircraft(req: Request, res: Response) {
  const id = req.params.id;
  const user = req.params.user;
  console.log("id", id, "user", user);
  res.send({ id, user }); //! change to AC list
}

export async function deleteAircraft(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = req.params.user;
    await aircraft.destroy({
      where: {
        registration_number: id,
      },
    });
    const response = await aircraft.findAll({
      where: {
        user: user,
      },
    });
    res.send({ message: "aircraft deleted", data: response });
  } catch (error) {
    console.log("error", error);
  }
}
