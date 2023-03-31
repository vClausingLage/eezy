import { Request, Response } from "express";

import { metarDecoder } from "./MetarAPI/helper/metar-regex-main.js";

import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
} from "./MetarAPI/helper/metar-regex-main-helper-functions.js";
// import { IMetarObject } from "./MetarAPI/helper/interfaces/metar-regex-interfaces.js";

type ListRemarks = {
  metar: string[];
  remarks: string[];
  tempo: string[];
  becoming: string[];
};

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  // let metarObject = {} as IMetarObject;
  let metarListObject: ListRemarks = splitMetarListRemarks(
    metarToList(metarString)
  );
  let metarObjectBasic = metarDecoder(metarToString(metarListObject.metar));
  // metarObject.tempo = metarDecoder(metarToString(metarListObject.tempo));
  // metarObject.becoming = metarDecoder(metarToString(metarListObject.becoming));
  // metarObject.remarks = metarDecoder(metarToString(metarListObject.remarks));
  res.send({ metarJSON: metarObjectBasic });
}
