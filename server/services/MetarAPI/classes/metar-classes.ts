export class Metar {
  ICAO!: string;
  Date!: Date;
  Winds!: IWind;
  Visibility!: { value: number; unit: string };
  Precipitation!: string[]; // Precipitation;
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
  Temperature!: number[];
  recent!: string;
  remarks!: string[];
  becoming!: string[];
  tempo!: string[];
}
