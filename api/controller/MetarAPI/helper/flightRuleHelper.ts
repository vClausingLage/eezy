type IFlightRule = {
  flight_rule: string
  color_code: string
}

export default function getFlightRule (
  visibility: { value: number | string | undefined, unit: string },
  cloudBase: number | undefined,
  unit: string
): IFlightRule {
  if (unit === 'meters') {
    return metersFLR(visibility, cloudBase)
  } else return nauticalMilesFLR(visibility, cloudBase)
}

function metersFLR (
  visibility: { value: number | string | undefined, unit: string },
  cloudBase: number | undefined
): IFlightRule {
  if (cloudBase === undefined) return { flight_rule: '', color_code: '' }
  if (typeof visibility === 'string' && visibility === 'CAVOK') {
    return { flight_rule: 'VFR', color_code: 'green' }
  } else if (
    (typeof visibility === 'number' && visibility <= 1500) ||
    cloudBase * 100 <= 500
  ) {
    return { flight_rule: 'LIFR', color_code: 'purple' }
  } else if (
    (typeof visibility === 'number' && visibility <= 5000) ||
    cloudBase * 100 <= 1000
  ) {
    return { flight_rule: 'IFR', color_code: 'red' }
  } else if (
    (typeof visibility === 'number' && visibility <= 8000) ||
    cloudBase * 100 <= 3000
  ) {
    return { flight_rule: 'MVFR', color_code: 'blue' }
  } else if (
    (typeof visibility === 'number' && visibility > 8000) ||
    cloudBase * 100 > 3000
  ) {
    return { flight_rule: 'VFR', color_code: 'green' }
  } else {
    return { flight_rule: 'incomplete data', color_code: 'black' }
  }
}
function nauticalMilesFLR (
  visibility: { value: number | string | undefined, unit: string },
  cloudBase: number | undefined
): IFlightRule {
  if (cloudBase === undefined) return { flight_rule: '', color_code: '' }
  if (typeof visibility === 'string' && visibility === 'CAVOK') {
    return { flight_rule: 'VFR', color_code: 'green' }
  } else if (
    (typeof visibility === 'number' && visibility <= 1) ||
    cloudBase * 100 <= 500
  ) {
    return { flight_rule: 'LIFR', color_code: 'purple' }
  } else if (
    (typeof visibility === 'number' && visibility <= 3) ||
    cloudBase * 100 <= 1000
  ) {
    return { flight_rule: 'IFR', color_code: 'red' }
  } else if (
    (typeof visibility === 'number' && visibility <= 5) ||
    cloudBase * 100 <= 3000
  ) {
    return { flight_rule: 'MVFR', color_code: 'blue' }
  } else if (
    (typeof visibility === 'number' && visibility > 5) ||
    cloudBase * 100 > 3000
  ) {
    return { flight_rule: 'VFR', color_code: 'green' }
  } else {
    return { flight_rule: 'incomplete data', color_code: 'black' }
  }
}
