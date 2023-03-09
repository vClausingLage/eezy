import { Router } from "express";

import { decodeRawMetar } from "../services/metar_api.controller.js";

export const metar_api_router = Router();

metar_api_router.get("/:metarstring", decodeRawMetar);
// /api/metardecoder/:metarstring
