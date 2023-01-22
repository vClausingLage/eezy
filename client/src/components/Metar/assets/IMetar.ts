import { IUS_Formats } from "../metar-classes";

export interface IMetar {
  ICAO: string;
  Date: Date;
  Winds: IWind;
  Visibility: string | number;
  Cloud_Layer: IClouds[];
  QNH: number
  RawMetar: string
  RawMetarDone: string;
  NOSIG: boolean;
  Temperature: number[];
  TAF_Prognosis: string;
  Wind_Variation: number[];
  Precipitation: IPrecipitation;
  US_Formats: IUS_Formats;
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
  cloudBase: number;
  cloud?: string;
}

export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}