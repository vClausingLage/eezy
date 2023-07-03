import { Router } from "express";

import {
  createAircraft,
  getAircraft,
  deleteAircraft,
} from "../services/aircraft.sequelize.controller.js";

export const aircraft_router = Router();

aircraft_router.post("/create", createAircraft);
aircraft_router.get("/create/:id", getAircraft);
aircraft_router.delete("/create/:id", deleteAircraft);
