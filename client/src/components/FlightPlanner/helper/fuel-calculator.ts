export function getDuration(fuelLoad: number, fuelConsumption: number): number {
  return Math.round((fuelLoad / fuelConsumption) * 100) / 100;
}
export function getRange(
  fuelLoad: number,
  fuelConsumption: number,
  cruiseSpeed: number
) {
  return getDuration(fuelLoad, fuelConsumption) * cruiseSpeed;
}
