import {
  metarToList,
  metarToString,
  splitMetarListRemarks,
  removeEndCharFromString,
} from "./metar-regex-main-helper-functions.js";
import { findBasicTokens } from "./metar-regex-main-regex-functions.js";

import { IResultBasicTokens } from "./interfaces/metar-regex-interfaces.js";

type BasicTokens = {
  regexResults: IResultBasicTokens;
  filteredMetarList: string[];
};

export function metarDecoder(metar: string) {
  let metarList = metarToList(metar);
  let basicTokens: BasicTokens = findBasicTokens(metarList);
  return basicTokens;
}
