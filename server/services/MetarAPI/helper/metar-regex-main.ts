import {
  metarToList,
  metarToString,
} from "./metar-regex-main-helper-functions.js";
import { findBasicTokens, findDynamicTokens } from "./metar-regex-functions.js";

import { IResultBasicTokens } from "./interfaces/metar-regex-interfaces.js";

type BasicTokens = {
  regexResults: IResultBasicTokens;
  filteredMetarList: string[];
};

export function metarDecoder(metar: string) {
  let metarList = metarToList(metar);
  let basicTokens: BasicTokens = findBasicTokens(metarList);
  let dynamicTokens = findDynamicTokens(
    metarToString(basicTokens.filteredMetarList)
  );
  let completeTokens = { ...basicTokens.regexResults, ...dynamicTokens };
  return completeTokens;
}
