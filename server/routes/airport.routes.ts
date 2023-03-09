import { Router } from "express";

import { getAirport } from "../services/airport.controller.js";

export const airportDB_router = Router();

airportDB_router.get("/:airportID", getAirport);
