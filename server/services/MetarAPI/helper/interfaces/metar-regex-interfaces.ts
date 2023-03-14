export interface IResultBasicTokens {
  icao: string;
  date: Date | undefined;
  cavok: boolean;
  nosig: boolean;
  auto: boolean;
  pressure: { pressure: string; value: number; unit: string };
  slp: number;
  clouds: IClouds[];
  wind: IWind;
  wind_var: number[];
  temperature: number[];
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
