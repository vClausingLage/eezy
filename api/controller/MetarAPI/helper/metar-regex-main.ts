import {
  metarToList,
  metarToString
} from './metar-regex-main-helper-functions.js'
import { findBasicTokens, findDynamicTokens } from './metar-regex-functions.js'

import {
  Metar,
  ResultBasicTokens,
  ResultDynamicTokens
} from '../types/index.js'

type BasicTokens = {
  regexResults: ResultBasicTokens
  filteredMetarList: string[]
}
type DynamicTokens = {
  regexResults: ResultDynamicTokens
  filteredMetarList: string[]
}
export function metarDecoder(metar: string): Metar {
  const metarList = metarToList(metar)
  const basicTokens: BasicTokens = findBasicTokens(metarList)
  const dynamicTokens: DynamicTokens = findDynamicTokens(
    metarToString(basicTokens.filteredMetarList)
  )
  return { ...basicTokens.regexResults, ...dynamicTokens.regexResults }
}
