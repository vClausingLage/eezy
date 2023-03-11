export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}

export interface IWind {
  direction: number | string;
  speed: number;
  unit: string;
  gusts?: number;
}

export interface IClouds {
  cloudLayer: string;
  cloudBase: number | undefined;
  cloud?: string;
}

export interface IAirPressure {
  pressure: string;
  value: number;
  unit: string;
}

export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}
