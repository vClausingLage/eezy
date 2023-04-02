import { Request, Response } from "express";

import { metarDecoder } from "./MetarAPI/helper/metar-regex-main.js";

import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
} from "./MetarAPI/helper/metar-regex-main-helper-functions.js";
import { IMetar } from "./MetarAPI/interfaces/IMetar.js";

type ListRemarks = {
  metar: string[];
  remarks: string[];
  tempo: string[];
  becoming: string[];
};

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  let metarObject = {} as IMetar;
  let metarListRemarks: ListRemarks = splitMetarListRemarks(
    metarToList(metarString)
  );
  metarObject = metarDecoder(metarToString(metarListRemarks.metar));
  // metarObject.tempo = metarDecoder(metarToString(metarListRemarks.tempo));
  // metarObject.becoming = metarDecoder(metarToString(metarListRemarks.becoming));
  // metarObject.remarks = metarDecoder(metarToString(metarListRemarks.remarks));
  res.send({ metarJSON: metarObject });
}
