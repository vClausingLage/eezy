import {
  dateFormat,
  cloudFormat,
  windFormat,
  windVarFormat,
  tempFormat,
  precipFormat
} from './helper/metarRegexHelper.js'

import {
  ResultBasicTokens,
  ResultDynamicTokens,
  BasicTokens,
  DynamicTokens
} from './types/index.js'

export function findDynamicTokens (metar: string): DynamicTokens {
  const resultObj: ResultDynamicTokens = {
    visibility: { value: null, unit: '' },
    precipitation: [],
    flight_rule: null
  }
  if (/[0-9]{4}/gi.test(metar)) {
    resultObj.visibility.value = Number(/[0-9]{4}/gi.exec(metar)?.[0])
    resultObj.visibility.unit = 'm'
  }
  if (/[0-9] [0-9]\/[0-9]SM/gi.test(metar)) {
    const value = /[0-9] [0-9]\/[0-9]SM/gi.exec(metar)?.[0]
    resultObj.visibility.value = Number(value?.replace('SM', ''))
    resultObj.visibility.unit = 'sm'
  }
  if (/[0-9]{1,2}SM/gi.test(metar)) {
    const value = /[0-9]{1,2}SM/gi.exec(metar)?.[0]
    resultObj.visibility.value = Number(value?.replace('SM', ''))
    resultObj.visibility.unit = 'sm'
  }
  if (/(-?|\+?|)(?:[a-z]{4}|[a-z]{2})+/gi.test(metar)) {
    const result = metar.match(/(-?|\+?|)(?:[a-z]{4}|[a-z]{2})+/gi)
    if (result !== null) {
      for (const el of result) {
        resultObj.precipitation.push(precipFormat(el))
      }
    }
  }
  resultObj.precipitation = resultObj.precipitation.filter((n: string) => n.length)
  return { regexResults: resultObj, filteredMetarList: [] } //! remove regex matches from STRING then JOIN to LIST
}

export function findBasicTokens (metar: string[]): BasicTokens {
  const resultObj: ResultBasicTokens = {
    icao: '',
    date: null,
    cavok: false,
    nosig: false,
    auto: false,
    air_pressure: { pressure: null, value: null, unit: null },
    slp: null,
    clouds: [],
    wind: {
      direction: null,
      speed: null,
      unit: null,
      gusts: null
    },
    wind_var: null,
    temperature: { temp: null, dewp: null, unit: null },
    recent_precipitation: null,
    taf_prognosis: null,
    remarks: [],
    becoming: [],
    tempo: [],
    raw_metar: metar.join(' ')
  }
  resultObj.icao = metar[0]
  metar.shift()
  const filteredMetar = metar.filter((el) => {
    if (/NOSIG/i.test(el)) resultObj.nosig = true
    else if (/AUTO/i.test(el)) resultObj.auto = true
    else if (/CAVOK/i.test(el)) resultObj.cavok = true
    else if (/Q[0-9]{3,4}/i.test(el)) {
      el = el.replace('Q', '')
      resultObj.air_pressure.pressure = 'QNH'
      resultObj.air_pressure.value = Number(el)
      resultObj.air_pressure.unit = 'hPa'
    } else if (/A[0-9]{3,4}/i.test(el)) {
      el = el.replace('A', '')
      resultObj.air_pressure.pressure = 'Altimeter'
      resultObj.air_pressure.value = Number(el)
      resultObj.air_pressure.unit = 'inHg'
    } else if (/[0-9]{6}Z/i.test(el)) {
      resultObj.date = dateFormat(el)
    } else if (/SLP[0-9]{3}/i.test(el)) {
      el = el.replace('SLP', '')
      resultObj.slp = Number(el)
    } else if (
      /[a-z]{3}[0-9]{3}/i.test(el) ||
      /[a-z]{3}[0-9]{3}[a-z]/i.test(el) ||
      /[a-z]{3}[0-9]{3}\/\/\//i.test(el)
    ) {
      resultObj.clouds = [...resultObj.clouds, cloudFormat(el)]
    } else if (
      /[0-9]{5}KT/i.test(el) ||
      /[0-9]{5}G[0-9]{1,2}KT/i.test(el) ||
      /VRB[0-9]{2,3}KT/i.test(el)
    ) {
      resultObj.wind = windFormat(el)
    } else if (/[0-9]{3}V[0-9]{3}/i.test(el)) {
      resultObj.wind_var = windVarFormat(el)
    } else if (/M?[0-9]{2}\/M?[0-9]{2}/i.test(el)) {
      resultObj.temperature = tempFormat(el)
    } else if (/RE[a-z]{2,4}/i.test(el)) {
      console.log('recent', el)
    } else return el
  })
  return { regexResults: resultObj, filteredMetarList: filteredMetar }
}
