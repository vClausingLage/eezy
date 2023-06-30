export interface IAircraft {
  id?: number;
  user: string;
  manufacturer: string;
  model: string;
  type: string;
  registration_number: string;
  fuel_type: string;
  fuel_capacity: number | number[];
  cruise_speed: number;
  cruise_fuel_consumption: number | number[];
  magnetic_error?: number;
  color?: string;
  ifr?: boolean;
  equiptment?: string;
}
export interface IAircraftModel {
  user: string;
  manufacturer: string;
  model: string;
  type: string;
  fuel_type: string;
  fuel_capacity: number | number[];
  cruise_speed: number;
  cruise_fuel_consumption: number | number[];
}
