import {
  metarToList,
  metarToString
} from './helper/metarRegexMainHelper.js'
import { findBasicTokens, findDynamicTokens } from './metarRegex.js'

import {
  Metar,
  BasicTokens,
  DynamicTokens,
  ResultBasicTokens,
  ResultDynamicTokens
} from './types/index.js'

export function metarDecoder(metar: string): Metar {
  const metarList = metarToList(metar)
  const basicTokens: BasicTokens = findBasicTokens(metarList)
  const dynamicTokens: DynamicTokens = findDynamicTokens(
    metarToString(basicTokens.filteredMetarList)
  )
  return { ...basicTokens.regexResults, ...dynamicTokens.regexResults }
}
