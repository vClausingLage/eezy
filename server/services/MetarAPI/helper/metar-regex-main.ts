import {
  metarToList,
  metarToString,
} from "./metar-regex-main-helper-functions.js";
import { findBasicTokens, findDynamicTokens } from "./metar-regex-functions.js";

import {
  IMetar,
  IResultBasicTokens,
  IResultDynamicTokens,
} from "../interfaces/IMetar.js";

type BasicTokens = {
  regexResults: IResultBasicTokens;
  filteredMetarList: string[];
};
type DynamicTokens = {
  regexResults: IResultDynamicTokens;
  filteredMetarList: string[];
};

export function metarDecoder(metar: string): IMetar {
  let metarList = metarToList(metar);
  let basicTokens: BasicTokens = findBasicTokens(metarList);
  let dynamicTokens: DynamicTokens = findDynamicTokens(
    metarToString(basicTokens.filteredMetarList)
  );
  let completeTokens = {
    ...basicTokens.regexResults,
    ...dynamicTokens.regexResults,
  };
  return completeTokens;
}
