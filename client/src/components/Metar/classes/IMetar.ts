

export interface IAirportObject {
  frequencies: IFreq[]
  runways: IRwy[]
}

export interface IFreq {
  id?: string;
  airport_ref?: string;
  airport_ident?: string;
  type: string;
  description?: string;
  frequency_mhz: string;
}

interface IRwy {
  he_ident: string;
  le_ident: string
}

export interface IMetarObject {
  icao: string,
  time: {local: string, utc: string};
  flightRule: IFlightRule,
  tempUnit: string,
  nosig: boolean,
  userLocation: string,
  visibility: {meters: number, miles: number};
  CAVOK: boolean;
  tempo: { gusts: string[], precipitation: string[] }
}

export interface IWind {
  direction: number | string;
  speed: number;
  unit: string;
  runways: IRwy[];
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