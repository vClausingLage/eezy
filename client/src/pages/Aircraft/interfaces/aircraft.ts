export interface IAircraft {
  id?: number;
  user: string;
  manufacturer: string;
  model: string;
  type: string;
  registration_number: string;
  fuel_type: string;
  fuel_capacity: number | undefined;
  cruise_speed: number | undefined;
  cruise_fuel_consumption: number | undefined;
  magnetic_error: number | undefined;
  color?: string;
  IFR?: boolean;
  equiptment?: string;
}
