export interface IAircraft {
  user: string;
  manufacturer: string;
  model: string;
  type: string;
  registration_number: string;
  fuel_type: string;
  fuel_capacityL: number | number[];
  cruise_speedKTS: number;
  cruise_fuel_consumptionL: number | number[];
  magnetic_error?: number;
  color?: string;
  IFR?: boolean;
  equiptment?: string;
}
