import { Router } from "express";

import {
  createAircraft,
  getAircraft,
  deleteAircraft,
} from "../services/aircraft.sequelize.controller.js";

export const ac_router = Router();

ac_router.post("/create", createAircraft);
ac_router.get("/create/:id", getAircraft);
ac_router.delete("/create/:id", deleteAircraft);
