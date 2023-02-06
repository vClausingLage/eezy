const weatherCodes = require('./weatherCodes.json')

let metar1 = '-RASN'
let metar2 = 'RASN'
let metar3 = 'RA SN'
let metar4 = '-RA SN'
let metar5 = '-RASNGM'

function formatWeatherString(weatherString) {
  let result = []
  let output = []
  weatherString = weatherString.replace(/\s/gi, '')
  while (weatherString.length > 0) {
    if (weatherString[0] === '-' || weatherString[0] === '+') {
      weatherString[0] === '-'
        ? result = [...result, ['light', weatherString[1] + weatherString[2]]]
        : result = [...result, ['heavy', weatherString[1] + weatherString[2]]]
      weatherString = weatherString.slice(3)
    } else if (weatherString[0] !== '-' && weatherString[0] !== '+') {
      result = [...result, ['', weatherString[0] + weatherString[1]]]
      weatherString = weatherString.slice(2)
    }
  }
  for (let el of result) {
    for (const [key, value] of Object.entries(weatherCodes.type)) {
      if (el[1] === key) output.push(el[0] + ' ' + value)
    }
  }
  return output
}
const [a, b, c, d, e] = [formatWeatherString(metar1), formatWeatherString(metar2), formatWeatherString(metar3), formatWeatherString(metar4), formatWeatherString(metar5)]
console.log(d)