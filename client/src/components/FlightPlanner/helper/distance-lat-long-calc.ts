export function calcLatLong(latLong: string) {
  latLong = latLong.replaceAll(' ', '').replaceAll(`°`, '').replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`''`, '')
  return latLong
}