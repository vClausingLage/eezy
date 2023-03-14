export interface IResultBasicTokens {
  icao: string;
  date: Date | undefined;
  cavok: boolean;
  nosig: boolean;
  auto: boolean;
  pressure: IPressure;
  slp: number;
  clouds: IClouds[];
  wind: IWind;
  wind_var: number[];
  temperature: number[];
}
export interface IResultDynamicTokens {
  visibility: IVisibility;
  precipitation: string[];
}
interface IPressure {
  pressure: string;
  value: number;
  unit: string;
}
interface IClouds {
  cloudLayer: string;
  cloudBase: number | undefined;
  cloud?: string;
}
interface IWind {
  direction: number | string;
  speed: number;
  unit: string;
  gusts?: number;
}
interface IVisibility {
  value: number | string | undefined;
  unit: string;
}

export interface IMetarObject {
  icao: string;
  date: Date | undefined;
  cavok: boolean;
  nosig: boolean;
  auto: boolean;
  pressure: IPressure;
  slp: number;
  clouds: IClouds[];
  wind: IWind;
  wind_var: number[];
  temperature: number[];
  visibility: IVisibility;
  precipitation: string[];
  remarks: {};
  tempo: {};
  becoming: {};
}
