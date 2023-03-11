export interface IMetar {
  ICAO: string;
  Date: Date;
  AirPressure: IAirPressure;
  SLP: number;
  CAVOK: boolean;
  Temperature: number[];
  Precipitation: IPrecipitation;
  Visibility: string | number;
  Cloud_Layer: IClouds[];
  flightRule: IFlightRule;
  Winds: IWind;
  Wind_Variation: number[];
  TAF_Prognosis: string;
  NOSIG: boolean;
  RawMetar: string;
  PreparedMetar: string[];
  RawMetarDone: string;
  recent: string;
  remarks: string[];
  becoming: string[];
  tempo: string[];
}

interface IAirPressure {
  pressure: string;
  value: number;
  unit: string;
}

export interface IWind {
  direction: number | string;
  speed: number;
  unit: string;
  gusts?: number;
}

export interface IPrecipitation {
  intensity?: string;
  elements: string[];
}

export interface IClouds {
  cloudLayer: string;
  cloudBase: number | null;
  cloud?: string;
}

export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}
