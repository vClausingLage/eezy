// -> metar-classes.js
export interface IWind {
  direction: number | string | undefined;
  speed: number | undefined;
  unit: string | undefined;
  gusts?: number | undefined;
}
export interface IClouds {
  cloud_layer: string;
  cloud_base: number | undefined;
  cloud?: string;
}
export interface IAirPressure {
  pressure: string | undefined;
  value: number | undefined;
  unit: string | undefined;
}
export interface IFlightRule {
  flight_rule: string;
  color_code: string;
}

interface IVisibility {
  value: number | string | undefined;
  unit: string;
}

export interface IMetar {
  icao: string;
  date: Date | undefined;
  wind: IWind;
  visibility: IVisibility;
  precipitation: string[];
  cloud_layer: IClouds[];
  wind_var: number[] | undefined;
  air_pressure: IAirPressure;
  slp: number | undefined;
  cavok: boolean;
  flight_rule: IFlightRule | undefined;
  raw_metar: string;
  nosig: boolean;
  auto: boolean;
  temperature: number[];
  taf_prognosis: string | undefined;
  recent_precipitation: string | undefined;
  remarks: string[];
  becoming: string[];
  tempo: string[];
}

export interface IResultBasicTokens {
  icao: string;
  date: Date | undefined;
  cavok: boolean;
  nosig: boolean;
  auto: boolean;
  air_pressure: IAirPressure;
  slp: number | undefined;
  cloud_layer: IClouds[];
  wind: IWind;
  wind_var: number[] | undefined;
  temperature: number[];
  recent_precipitation: string | undefined;
  taf_prognosis: string | undefined;
  remarks: string[];
  becoming: string[];
  tempo: string[];
  raw_metar: string;
}
export interface IResultDynamicTokens {
  visibility: IVisibility;
  precipitation: string[];
  flight_rule: IFlightRule | undefined;
}
