import weatherCodes from '../assets/weatherCodes.json' assert { type: 'json' }

interface Cloud {
  cloud_layer: string
  cloud_base: number | undefined
  cloud?: string
}
interface Wind {
  direction: number | string
  speed: number
  unit: string
  gusts?: number
}

export function dateFormat(time: string) {
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
export function cloudFormat(clouds: string) {
  const output: Cloud = {} as Cloud
  if (clouds !== 'NCD' && clouds !== 'CLR' && clouds !== 'CAVOK') {
    const cloud_layer = clouds.slice(0, 3)
    const cloud_base = clouds.slice(3, 6)
    if (clouds.length >= 6) {
      const cloud = clouds.slice(6, 9)
      if (cloud) output.cloud = cloud
    }
    output.cloud_layer = cloud_layer
    output.cloud_base = Number(cloud_base + '00')
  } else if (clouds === 'NCD' || clouds === 'CLR') {
    output.cloud_layer = clouds
    output.cloud_base = undefined
  }
  return output
}
export function windFormat(wind: string) {
  let output = {} as Wind
  if (/[0-9]{5}KT/i.test(wind)) {
    output = {
      direction: Number(wind.slice(0, 3)),
      speed: Number(wind.slice(3, 5)),
      unit: 'kts'
    }
  } else if (/[0-9]{5}G[0-9]{1,2}KT/i.test(wind)) {
    output = {
      direction: Number(wind.slice(0, 3)),
      speed: Number(wind.slice(3, 5)),
      gusts: Number(wind.slice(6, 8)),
      unit: 'kts'
    }
  } else if (/VRB[0-9]{1,2}KT/i.test(wind)) {
    output = {
      direction: 'variable',
      speed: Number(wind.slice(3, 5)),
      unit: 'kts'
    }
  }
  return output
}
export function windVarFormat(windVar: string) {
  const output = [Number(windVar.slice(0, 3)), Number(windVar.slice(4, 7))]
  return output
}
export function tempFormat(temperature: string): {
  temp: number
  dewp: number
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
  return { temp: output[0], dewp: output[1] }
}
export function precipFormat(weatherString: string): string {
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
      if (el[1] === key) output.push(el[0] + ' ' + value)
    }
    for (const [key, value] of Object.entries(weatherCodes.type)) {
      if (el[1] === key) output.push(el[0] + ' ' + value)
    }
  }
  return output.join('').trim()
}
