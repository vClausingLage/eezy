
export interface IMetar {
  ICAO: string;
  Date: Date;
  Winds: IWind;
  Visibility: string | number;
  Cloud_Layer: IClouds[];
  QNH: number
  RawMetar: string
  RawMetarDone: string;
  NOSIG: boolean
  TAF_Prognosis?: string;
  Wind_Variation?: number[];
  Precipitation?: IPrecipitation;
}

interface IWind {
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
  cloudBase: number;
  cloud?: string;
}

export interface IGafor {
  GaforCode: string;
  ColorCode: string;
}