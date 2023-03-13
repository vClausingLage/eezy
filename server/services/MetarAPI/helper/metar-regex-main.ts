import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
} from "./metar-regex-main-helper-functions.js";
import { findBasicTokens } from "./metar-regex-main-regex-functions.js";

export function metarDecoder(metar: string) {
  let metarList = metarToList(metar);
  let basicTokens = findBasicTokens(metarList);
  console.log(basicTokens);
}
