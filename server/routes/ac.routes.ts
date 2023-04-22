import { Router } from "express";

import {
  createAircraft,
  getAircraft,
} from "../services/aircraft.sequelize.controller.js";

export const ac_router = Router();

ac_router.post("/create", createAircraft);
ac_router.get("/create/:id", getAircraft);
