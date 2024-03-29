import {
  metarToList,
  metarToString
} from './metar-regex-main-helper-functions.js'
import { findBasicTokens, findDynamicTokens } from './metar-regex-functions.js'

import {
  IMetar,
  IResultBasicTokens,
  IResultDynamicTokens
} from '../types/IMetar.js'

type BasicTokens = {
  regexResults: IResultBasicTokens
  filteredMetarList: string[]
}
type DynamicTokens = {
  regexResults: IResultDynamicTokens
  filteredMetarList: string[]
}
export function metarDecoder(metar: string): IMetar {
  const metarList = metarToList(metar)
  const basicTokens: BasicTokens = findBasicTokens(metarList)
  const dynamicTokens: DynamicTokens = findDynamicTokens(
    metarToString(basicTokens.filteredMetarList)
  )
  return { ...basicTokens.regexResults, ...dynamicTokens.regexResults }
}
