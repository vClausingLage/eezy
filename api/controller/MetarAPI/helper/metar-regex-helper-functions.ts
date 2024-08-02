import weatherCodes from '../assets/weatherCodes.json' assert { type: 'json' }

type Cloud = {
  cloudLayer: string | null
  cloudBase: number | null
  cloud?: string
}
type Wind = {
  direction: number | string
  speed: number
  unit: string
  gusts?: number
}

export function dateFormat (time: string): Date {
  const today = new Date()
  const date = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      Number(time.slice(0, 2)),
      Number(time.slice(2, 4)),
      Number(time.slice(4, 6))
    )
  )
  return date
}
export function cloudFormat (clouds: string): Cloud {
  const output: Cloud = {
    cloudLayer: null,
    cloudBase: null
  }
  if (clouds !== '' && clouds !== 'NCD' && clouds !== 'CLR' && clouds !== 'CAVOK') {
    const cloudLayer = clouds.slice(0, 3)
    const cloudBase = clouds.slice(3, 6)
    if (clouds.length >= 6) {
      const cloud = clouds.slice(6, 9)
      if (cloud !== '') output.cloud = cloud
      if (cloud !== '' && cloud === '///') output.cloud = 'unknown'
    }
    output.cloudLayer = cloudLayer ?? ''
    output.cloudBase = Number(cloudBase + '00')
  } else if (clouds === 'NCD' || clouds === 'CLR') {
    output.cloudLayer = clouds
    output.cloudBase = null
  }
  return output
}
export function windFormat (wind: string): Wind {
  if (/[0-9]{5}KT/i.test(wind)) {
    const output = {
      direction: Number(wind.slice(0, 3)),
      speed: Number(wind.slice(3, 5)),
      unit: 'kts'
    }
    return output
  } else if (/[0-9]{5}G[0-9]{1,2}KT/i.test(wind)) {
    const output = {
      direction: Number(wind.slice(0, 3)),
      speed: Number(wind.slice(3, 5)),
      gusts: Number(wind.slice(6, 8)),
      unit: 'kts'
    }
    return output
  } else if (/VRB[0-9]{1,2}KT/i.test(wind)) {
    const output = {
      direction: 'variable',
      speed: Number(wind.slice(3, 5)),
      unit: 'kts'
    }
    return output
  }
  return { direction: 0, speed: 0, unit: '' }
}
export function windVarFormat (windVar: string): number[] {
  const output = [Number(windVar.slice(0, 3)), Number(windVar.slice(4, 7))]
  return output
}
export function tempFormat (temperature: string): {
  temp: number
  dewp: number
  unit: string
} {
  const output: number[] = []
  const tempArr = temperature.split('/')
  tempArr.forEach((el) => {
    if (el === 'M00') {
      output.push(0)
    } else if (el[0] === 'M') {
      el = el.replace('M', '-')
      output.push(Number(el)) // ! Number? -> TEST
    } else {
      output.push(Number(el))
    }
  })
  return { temp: output[0], dewp: output[1], unit: '°C' }
}
export function precipFormat (weatherString: string): string {
  let result: any = []
  const output = []
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
      if (el[1] === key) output.push(String(el[0]) + ' ' + value)
    }
    for (const [key, value] of Object.entries(weatherCodes.type)) {
      if (el[1] === key) output.push(String(el[0]) + ' ' + value)
    }
  }
  return output.join('').trim()
}
