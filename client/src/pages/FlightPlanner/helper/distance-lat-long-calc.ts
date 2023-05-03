type latLong = {
  icao: string;
  latitude: number;
  longitude: number;
};

export function calcLatLong(latLong: latLong[]): number {
  console.log("latLong", latLong);
  // let distance: number =
  //   Math.acos(
  //     Math.sin(latLong[0].latitude) * Math.sin(latLong[1].latitude) +
  //       Math.cos(latLong[0].latitude) *
  //         Math.cos(latLong[1].latitude) *
  //         Math.cos(latLong[1].longitude - latLong[0].longitude)
  //   ) * 6371;

  const R = 6371e3;
  const phi1 = (latLong[0].latitude * Math.PI) / 180;
  const phi2 = (latLong[1].latitude * Math.PI) / 180;
  const DeltaPhi =
    ((latLong[1].latitude - latLong[0].latitude) * Math.PI) / 180;
  const DeltaLambda =
    latLong[1].longitude - (latLong[0].longitude * Math.PI) / 180;

  const a =
    Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(DeltaLambda / 2) *
      Math.sin(DeltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  console.log("distance", distance);
  // latLong = latLong.replaceAll(' ', '').replaceAll(`°`, '').replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`''`, '')
  return distance;
}

// https://www.movable-type.co.uk/scripts/latlong.html

// JavaScript:

// const R = 6371e3; // metres
// const φ1 = lat0 * Math.PI/180; // φ, λ in radians
// const φ2 = lat1 * Math.PI/180;
// const Δφ = (lat1-lat0) * Math.PI/180;
// const Δλ = (lon1-lon0) * Math.PI/180;

// const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//           Math.cos(φ1) * Math.cos(φ2) *
//           Math.sin(Δλ/2) * Math.sin(Δλ/2);
// const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

// const d = R * c; // in metres
