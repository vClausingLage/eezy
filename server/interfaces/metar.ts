
export interface IMetar {
  ICAO: string;
  Date: Date;
  QNH: number;
  SLP: number;
  CAVOK: boolean;
  Temperature: number[];
  Precipitation: IPrecipitation;
  Visibility: string | number;
  Cloud_Layer: IClouds[];
  flightRule: IFlightRule,
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