import weatherCodes from '../assets/weatherCodesClient.json'
import { IClouds } from '../interfaces/IMetar'

export function getFlightRules (visibility: string | number, clouds: IClouds[]) {
  const flRul = {
    flightRule: '',
    colorCode: ''
  }
  const cloudBase = clouds[0] === undefined ? 3000 : clouds[0].base * 100
  if (typeof visibility === 'string' && visibility === 'CAVOK') {
    flRul.flightRule = 'VFR'
    flRul.colorCode = 'green'
  } else if (
    (typeof visibility === 'number' && visibility <= 1500) ||
    cloudBase <= 500
  ) {
    flRul.flightRule = 'LIFR'
    flRul.colorCode = 'purple'
  } else if (
    (typeof visibility === 'number' && visibility <= 5000) ||
    cloudBase <= 1000
  ) {
    flRul.flightRule = 'IFR'
    flRul.colorCode = 'red'
  } else if (
    (typeof visibility === 'number' && visibility <= 8000) ||
    cloudBase <= 3000
  ) {
    flRul.flightRule = 'MVFR'
    flRul.colorCode = 'blue'
  } else if (
    (typeof visibility === 'number' && visibility > 8000) ||
    cloudBase > 3000
  ) {
    flRul.flightRule = 'VFR'
    flRul.colorCode = 'green'
  } else {
    flRul.flightRule = 'incomplete data'
    flRul.colorCode = 'black'
  }
  return flRul
}

export function formatWeatherString (weatherString: string) {
  let result: any = []
  const output = []
  weatherString = weatherString.replace(/\s/gi, '')
  while (weatherString.length > 0) {
    if (weatherString[0] === '-' || weatherString[0] === '+') {
      weatherString[0] === '-'
        ? (result = [...result, ['light', weatherString[1] + weatherString[2]]])
        : (result = [
            ...result,
            ['heavy', weatherString[1] + weatherString[2]]
          ])
      weatherString = weatherString.slice(3)
    } else if (weatherString[0] !== '-' && weatherString[0] !== '+') {
      result = [...result, ['', weatherString[0] + weatherString[1]]]
      weatherString = weatherString.slice(2)
    }
  }
  for (const el of result) {
    for (const [key, value] of Object.entries(weatherCodes.characteristic)) {
      if (el[1] === key) output.push(el[0] + ' ' + value)
    }
    for (const [key, value] of Object.entries(weatherCodes.type)) {
      if (el[1] === key) output.push(el[0] + ' ' + value)
    }
  }
  return output.join(' and ').replace('of and', 'and')
}

export function convertDate (dateString: string) {
  const date = new Date(Number(dateString))
  const localTime = date.toLocaleString(navigator.language, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
  const utcTime =
    String(date.getUTCHours()) + ':' + String(date.getUTCMinutes())
  return { local: localTime, utc: utcTime }
}
export function qnhRegex (rawOb: string): number | null {
  return (rawOb.match(/Q[0-9]{4}/gi) != null)
    ? Number(rawOb.match(/Q[0-9]{4}/gi)![0].replace('Q', ''))
    : null
}

export async function checkLocation () {
  //! add return
  const locationCheck = false
  const response = await fetch('https://ipapi.co/json/')
  const location = await response.json()
  //! check for CAN | US | EN -> Statute Miles : -> Meters

  //! return Miles && Meters --> check in JSX
}

export function tempoInformation (rawMetar: string) {
  const metar = rawMetar.split(' ')
  const tempoMetar: string[] = []
  metar.forEach((el, idx) => {
    const length = metar.length
    if (/^TEMPO$/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempoMetar.push(metar[i])
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i)
      }
    }
  })
  const output = { gusts: [], precipitation: [] } as {
    gusts: string[]
    precipitation: string[]
  }
  // console.log(tempoMetar)
  // console.log(metar)
  if (tempoMetar.length > 0) {
    tempoMetar.forEach((el) => {
      if (/^\d{5}G\d{1,2}KT$/gi.test(el)) {
        console.log(output.gusts)
        if (el.match(/G\d{1,2}/gi)?.length === 1) { output.gusts.push(el.slice(6, 8)) }
      }
    })
  }
  if (
    /^\+?\D{2,6}$/gi.test(tempoMetar.join()) ||
    /^-?\D{2,6}$/gi.test(tempoMetar.join())
  ) { output.precipitation.push(formatWeatherString(tempoMetar.join())) } // ! working as exspected?
  return output
}
