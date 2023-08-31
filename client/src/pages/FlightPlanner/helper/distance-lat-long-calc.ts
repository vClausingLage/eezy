interface latLong {
  icao: string
  latitude: number
  longitude: number
}

export function calcLatLong (latLong: latLong[]): number {
  const lat0 = latLong[0].latitude
  const lat1 = latLong[1].latitude
  const lon0 = latLong[0].longitude
  const lon1 = latLong[1].longitude

  const R = 6371e3 // metres
  const φ1 = (lat0 * Math.PI) / 180 // φ, λ in radians
  const φ2 = (lat1 * Math.PI) / 180
  const Δφ = ((lat1 - lat0) * Math.PI) / 180
  const Δλ = ((lon1 - lon0) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c // in metres
  return Math.round(d / 1852)
}
