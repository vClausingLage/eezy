import { Request, Response } from "express";

import {
  prepareMetar,
  reduceTempo,
  maptoMetarObj,
} from "./MetarAPI/helper/metar-regex.js";

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  let preparedMetar = prepareMetar(metarString);
  let reducedMetar = reduceTempo(preparedMetar);
  let metarObj = maptoMetarObj(reducedMetar[0]);
  res.send({ metarJSON: metarObj });
}
