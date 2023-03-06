export interface IAircraft {
  user: number;
  manufacturer: string;
  model: string;
  type: string;
  registration_number: string;
  fuel_type: string;
  fuel_capacityL: number | number[] | null;
  cruise_speedKTS: number | null;
  cruise_fuel_consumptionL: number | number[] | null;
  magnetic_error?: number;
  color?: string;
  IFR?: boolean;
  equiptment?: string;
}
