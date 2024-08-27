export type Aircraft = {
  id?: number | null;
  user: string;
  manufacturer: string;
  model: string;
  type: string;
  registrationNumber: string;
  fuelType: string;
  fuelCapacity: number | number[];
  cruiseSpeed: number;
  cruiseFuelConsumption: number | number[];
  magneticError?: number;
  color?: string;
  ifr?: boolean;
  equiptment?: string;
}
