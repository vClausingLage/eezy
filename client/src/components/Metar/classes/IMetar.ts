export interface IMetarAPIObject {
  name: string;
  clouds: IClouds[];
  altim: number;
  slp: number;
  temp: number;
  dewp: number;
  wspd: string;
  wdir: string;
  wgst: number;
  wxString: string;
  rawOb: string;
}

export interface IAirportObject {
  frequencies: IFreq[];
  runways: IRwy[];
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
  le_ident: string;
}

export interface IMetarObject {
  icao: string;
  time: { local: string; utc: string };
  flightRule: IFlightRule;
  altim: { altim: number; qnh: number };
  tempUnit: string;
  nosig: boolean;
  userLocation: string;
  visibility: { meters: number; nm: number };
  CAVOK: boolean;
  tempoInformation: { gusts: string[]; precipitation: string[] };
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
  cover: string;
  base: number;
}

export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}
