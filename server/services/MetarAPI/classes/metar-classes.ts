import {
  IWind,
  IClouds,
  IAirPressure,
  IFlightRule,
} from "../interfaces/IMetar.js";

// -> metar-regex
export class Metar {
  ICAO!: string;
  Date!: Date;
  Winds!: IWind;
  Visibility!: { value: number; unit: string };
  Precipitation!: string[];
  Cloud_Layer!: IClouds[];
  TAF_Prognosis!: string;
  Wind_Variation!: number[];
  AirPressure!: IAirPressure;
  SLP!: number;
  CAVOK!: boolean;
  flightRule!: IFlightRule;
  RawMetar!: string;
  PreparedMetar!: string[];
  RawMetarDone!: string;
  NOSIG!: boolean;
  AUTO!: boolean;
  Temperature!: number[];
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
