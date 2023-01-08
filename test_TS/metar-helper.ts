import { Wind, Precipitation, WeatherCodes } from './metar-classes.js'

import weatherCodes from './weatherCodes.json'

export function dateFormat(time: string) {
  let today = new Date();
  let date = new Date(today.getFullYear(), today.getMonth(), parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)), parseInt(time.slice(4, 6)))
  return date
}

export function windFormat(wind: string) {
  let output = new Wind;
  if (/^[0-9]{5}KT$/i.test(wind)) {
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 4)),
      unit: 'kts'
    }
  }
  else if (/^[0-9]{5}G[0-9]{1,2}KT$/i.test(wind)) {
      output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      gusts: parseInt(wind.slice(6, 8)),
      unit: 'kts'
    }
  }
  return output
}

export function windVarFormat(windVar: string) {
  let output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))]
  return output
}

export function visFormat(vis: string): string | number {
  let output!: string | number
  if (/^CAVOK$/.test(vis)) {
    output = vis
  }
  if (/^\d{4}$/i.test(vis)) {
    output = parseInt(vis)
  }
  return output
}

export function precipPreposition(precip: string) {
  let formattedPrecip: string[] = []
  if (precip.length % 2 === 0) {
    formattedPrecip = ['null', precip];
  }
  else if (precip.length % 2 != 0) {
    formattedPrecip = [precip.slice(0, 1), precip.slice(1, precip.length)];
  }
  return formattedPrecip;
}

export function decodeWeather(precip: string[]) {
  // load JSON weather codes to VAR
  let codes: WeatherCodes = weatherCodes as WeatherCodes
  let codeArr: string[] = []
  for (const [k, v] of Object.entries(codes)) {
    for (const [code, descr] of Object.entries(v)) {
      codeArr.push(code);
    }
  }
  // use VAR to LOOP METAR input
  let result: string[] = []
  if (precip[1].length > 2) {
    for (let i = 0, charsLength = precip[1].length; i < charsLength; i += 2) {
      result.push(precip[1].substring(i, i + 2));
    }
  } else {
    result.push(precip[1])
  }
  return result;
}

export function precipFormat(precip: string) {
  let output = new Precipitation();
  let newPrecip = precipPreposition(precip);
  let weatherCode = decodeWeather(newPrecip);
  console.log(weatherCode)
  output.intensity = newPrecip[0];
  output.elements = weatherCode
  return output;
}
