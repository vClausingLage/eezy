import {
  IWind,
  IClouds,
  IAirPressure,
  IFlightRule,
} from "../interfaces/IMetar.js";

// -> metar-regex
export class Metar {
  icao!: string;
  date!: Date;
  wind!: IWind;
  visibility!: { value: number; unit: string };
  precipitation!: string[];
  cloud_layer!: IClouds[];
  taf_prognosis!: string;
  wind_variation!: number[];
  air_pressure!: IAirPressure;
  slp!: number;
  cavok!: boolean;
  flight_rule!: IFlightRule;
  raw_metar!: string;
  prepared_metar!: string[];
  nosig!: boolean;
  auto!: boolean;
  temperature!: number[];
  recent!: string;
  remarks!: string[];
  becoming!: string[];
  tempo!: string[];
}

// -> helper-functions
export class Wind {
  direction!: number | string;
  speed!: number;
  unit!: string;
  gusts?: number;
}
export class Clouds {
  cloudLayer!: string;
  cloudBase!: number | undefined;
  cloud?: string;
}
