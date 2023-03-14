import { Request, Response } from "express";

import { metarDecoder } from "./MetarAPI/helper/metar-regex-main.js";

import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
} from "./MetarAPI/helper/metar-regex-helper-functions.js";

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  let metarListObject = splitMetarListRemarks(metarToList(metarString));
  let resultBasicTokens = metarDecoder(metarToString(metarListObject.metar));
  // let preparedMetar = prepareMetar(metarString);
  // let metarObj = mapToMetarObj(preparedMetar);
  res.send({ metarJSON: resultBasicTokens });
}
