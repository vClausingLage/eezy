import { metarToList, metarToString } from './metar-regex-main-helper-functions.js';
import { findBasicTokens, findDynamicTokens } from './metar-regex-functions.js';
export function metarDecoder(metar) {
    const metarList = metarToList(metar);
    const basicTokens = findBasicTokens(metarList);
    const dynamicTokens = findDynamicTokens(metarToString(basicTokens.filteredMetarList));
    return { ...basicTokens.regexResults, ...dynamicTokens.regexResults };
}
