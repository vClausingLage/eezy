import { IFlightRule } from "./IMetar.js";

export class Metar {
  ICAO!: string;
  Date!: Date;
  Winds!: Wind;
  Visibility!: { value: number; unit: string };
  Precipitation!: string[]; // Precipitation;
  Cloud_Layer!: Clouds[];
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
  Temperature!: number[];
  recent!: string;
  remarks!: string[];
  becoming!: string[];
  tempo!: string[];
}

export class Wind {
  direction!: number | string;
  speed!: number;
  unit!: string;
  gusts?: number;
}

// export class Precipitation {
//     intensity!: string;
//     elements!: string[];
// }

export class Clouds {
  cloudLayer!: string;
  cloudBase!: number | undefined;
  cloud?: string;
}
