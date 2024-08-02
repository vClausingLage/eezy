export type IAircraft = {
  id: number | null
  user?: string
  manufacturer: string
  model: string
  type: string
  registration_number: string
  fuel_type: string
  fuel_capacity: number
  cruise_speed: number
  cruise_fuel_consumption: number
  magnetic_error: number
  color?: string
  ifr?: boolean
  equiptment?: string
}

export type ICreateAircraft = {
  id: number | null
  user?: string
  manufacturer: string
  model: string
  type: string
  registration_number?: string
  fuel_type?: string
  fuel_capacity?: number
  cruise_speed?: number
  cruise_fuel_consumption?: number
  magnetic_error?: number
  color?: string
  ifr?: boolean
  equiptment?: string
}
