export interface IAircraft {
  manufacturer: string,
  model: string,
  registration_number: string,
  fuel_type: string,
  fuel_capacityL: number,
  cruise_speedKTS: number,
  cruise_fuel_consumptionL: number,
  magnetic_error: number,
  color: string,
  engines?: number,
  ps?: number,
  seats?: number,
  IFR?: boolean,
  equiptment?: string,
  characteristics?: string
}