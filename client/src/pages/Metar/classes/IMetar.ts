export interface IMetarAPIObject {
  //! update to new AWC API
  altim: number;
  clouds: IClouds[];
  dewp: number;
  name: string;
  obsTime: number;
  rawOb: string;
  slp: number;
  temp: number;
  visib: string;
  wspd: number;
  wdir: number;
  wgst: number;
  wxString: string;
  message?: string;
}
export interface IMetarObject {
  altim: { altim: number; qnh: number | null };
  CAVOK: boolean;
  clouds: IClouds[];
  dewp: number;
  flightRule: IFlightRule;
  icao: string;
  name: string;
  nosig: boolean;
  rawMetar: string;
  slp: number;
  tempoInformation: { gusts: string[]; precipitation: string[] };
  temp: number;
  tempUnit: string;
  time: { local: string; utc: string };
  userLocation: string;
  visibility: { meters: number; nm: number };
  wspd: number;
  wdir: number;
  wgst: number;
  wxString: string;
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

export interface IRwy {
  he_ident: string;
  le_ident: string;
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
