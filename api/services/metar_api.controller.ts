import { Request, Response } from "express";

import { validator } from "./Validation/validator.controller.js";

import { metarDecoder } from "./MetarAPI/helper/metar-regex-main.js";

import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
} from "./MetarAPI/helper/metar-regex-main-helper-functions.js";
import getFlightRule from "../services/MetarAPI/helper/flight-rule-helper-function.js";

type ListRemarks = {
  metar: string[];
  remarks: string[];
  tempo: string[];
  becoming: string[];
};

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = validator(req.params.metarstring);
  let metarListRemarks: ListRemarks = splitMetarListRemarks(
    metarToList(metarString)
  );
  let metarObject = metarDecoder(metarToString(metarListRemarks.metar));
  // metarObject.tempo = metarDecoder(metarToString(metarListRemarks.tempo));
  // metarObject.becoming = metarDecoder(metarToString(metarListRemarks.becoming));
  // metarObject.remarks = metarDecoder(metarToString(metarListRemarks.remarks));
  metarObject.flight_rule = getFlightRule(
    metarObject.visibility,
    metarObject.clouds[0].cloud_base,
    metarObject.visibility.unit
  );
  res.send({ metarJSON: metarObject });
}
