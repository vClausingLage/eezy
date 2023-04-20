import { Router } from "express";

import {
  createAircraft,
  getAircraft,
  // queryAircraftManufacturer,
  // insertModelAC,
  // queryAircraftAll,
} from "../services/aircraft.sequelize.controller.js";

export const ac_router = Router();

ac_router.post("/create", createAircraft);
ac_router.get("/create/:id", getAircraft);
// ac_router.get("/models", queryAircraftAll);
// ac_router.get("/manufacturer/:manufacturer", queryAircraftManufacturer);
// ac_router.post("/modelinsert", insertModelAC);
