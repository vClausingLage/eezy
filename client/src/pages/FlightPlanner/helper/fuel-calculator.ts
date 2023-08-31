function getDuration (fuelLoad: number, fuelConsumption: number): number {
  return Math.round((fuelLoad / fuelConsumption) * 100) / 100
}

/**
 * @param fuelLoaded fuel loaded LITERS
 * @param fuelConsumption fuel consumption LITERS
 * @param cruiseSpeed cruise speed KTS
 * @param fuelReserve fuel reserve LITERS
 */
export function getRange (
  fuelLoaded: number | undefined,
  fuelConsumption: number,
  cruiseSpeed: number,
  fuelReserve: number | undefined
): number {
  console.log('fuel calc START')
  if (fuelLoaded && fuelReserve) {
    return Math.round(
      getDuration(fuelLoaded, fuelConsumption) * cruiseSpeed -
        getDuration((fuelConsumption / 60) * fuelReserve, fuelConsumption) *
          cruiseSpeed
    )
  } else if (fuelLoaded) {
    return Math.round(
      getDuration(fuelLoaded, fuelConsumption) * cruiseSpeed -
        getDuration(fuelConsumption / 60, fuelConsumption) * cruiseSpeed
    )
  } else {
    return 0
  }
}
// function ktsToKmh(input: number): number {
//   return input * 1.852;
// }
// function kmhToKts(input: number): number {
//   return input / 1.852;
// }
// function litersToGallons(input: number): number {
//   return input / 3.785;
// }
// function gallonsToLiters(input: number): number {
//   return input * 3.785;
// }

// https://www.flight-study.com/2021/05/basic-calculations-cross-country-flight.html

// https://www.simcoders.com/2018/09/07/how-to-calculate-the-fuel-required-for-your-flight/
