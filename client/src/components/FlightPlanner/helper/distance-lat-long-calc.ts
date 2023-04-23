type latLong = {
  icao: string;
  latitude: number;
  longitude: number;
};

export function calcLatLong(latLong: latLong[]): number {
  console.log("latLong", latLong);
  let distance: number =
    Math.acos(
      Math.sin(latLong[0].latitude) * Math.sin(latLong[1].latitude) +
        Math.cos(latLong[0].latitude) *
          Math.cos(latLong[1].latitude) *
          Math.cos(latLong[1].longitude - latLong[0].longitude)
    ) * 6371;
  console.log("distance", distance);
  // latLong = latLong.replaceAll(' ', '').replaceAll(`°`, '').replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`''`, '')
  return distance;
}
