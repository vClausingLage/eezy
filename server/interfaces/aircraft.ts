export interface IAircraft {
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
  engines?: number;
  ps?: number;
  seats?: number;
  IFR?: boolean;
  equiptment?: string;
  characteristics?: string;
}
export interface IAircraftModel {
  manufacturer: string;
  model: string;
  type: string;
  fuel_type: string;
  fuel_capacityL: number | number[];
  cruise_speedKTS: number;
  cruise_fuel_consumptionL: number | number[];
}
