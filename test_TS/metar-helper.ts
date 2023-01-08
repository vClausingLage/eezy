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

export function visFormat(vis: string) {
  if (/^CAVOK$/.test(vis)) {
    return vis
  }
  if (/^\d{4}$/i.test(vis)) {
    return parseInt(vis)
  }
}

// ! remove if unneccessary

// function precipPrepare(precip, preposition) {
//   if (precip.length % 2 != 0) {
//     if (precip[0] === '+') {
//       preposition = 'heavy'
//     } else if (precip[0] === '-') {
//       preposition = 'light'
//     }
//   }
//   return [precip, preposition]
// }

export function precipPreposition(precip: string) {
  let formattedPrecip: string[] = []
  if (precip.length % 2 === 0) {
    formattedPrecip = ['null', precip]
  }
  else if (precip.length % 2 != 0) {
    formattedPrecip = [precip.slice(0, 1), precip.slice(1, precip.length)]
  }
  return formattedPrecip
}

export function decodeWeather(precip: string[]) {
  let codes: WeatherCodes = weatherCodes as WeatherCodes
  
}

export function precipFormat(precip: string) {
  let output = new Precipitation();
  let newPrecip = precipPreposition(precip)
  let weatherCode = decodeWeather(newPrecip)

  output.intensity = newPrecip[0]
  return output

  
}
