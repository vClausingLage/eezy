import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
  removeEndCharFromString,
} from "./metar-regex-main-helper-functions.js";
import { findBasicTokens } from "./metar-regex-main-regex-functions.js";

export function metarDecoder(metar: string) {
  let metarList = metarToList(metar);
  let basicTokens = findBasicTokens(metarList);
  return basicTokens;
}
