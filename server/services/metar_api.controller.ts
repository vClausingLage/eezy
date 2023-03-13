import { Request, Response } from "express";

import { prepareMetar } from "./MetarAPI/helper/metar-regex-helper-functions.js";
import { mapToMetarObj } from "./MetarAPI/helper/metar-regex.js";

// import MetarDecoder from "./MetarAPI/metar-decoderOOP.js";

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  // let m = new MetarDecoder(metarString);
  // console.log(m.getWind());
  let preparedMetar = prepareMetar(metarString);
  let metarObj = mapToMetarObj(preparedMetar);
  res.send({ metarJSON: metarObj });
}
