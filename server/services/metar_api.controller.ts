import { Request, Response } from "express";

import { metarDecoder } from "./MetarAPI/helper/metar-regex-main.js";

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  let result = metarDecoder(metarString);
  // let preparedMetar = prepareMetar(metarString);
  // let metarObj = mapToMetarObj(preparedMetar);
  res.send({ metarJSON: result });
}
