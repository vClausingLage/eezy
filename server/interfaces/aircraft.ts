export interface IAircraft {
  manufacturer: string,
  model: string,
  registration_number: string,
  fuel_type: string,
  fuel_capacity: number,
  cruise_speed: number,
  cruise_fuel_consumption: number,
  magnetic_error: number,
  color: string,
  engines?: number,
  ps?: number,
  seats?: number,
  IFR?: boolean,
  equiptment?: string,
  characteristics?: string
}