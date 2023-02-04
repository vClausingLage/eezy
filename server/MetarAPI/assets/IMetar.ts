import { IUS_Formats } from "./metar-classes.js";

export interface IMetarApi {
  "metar": Array<string>
}

export interface IMetarApiObject{
  "icaoId": string,
  "lat": string,
  "lon": string,
  "elev": string,
  "priority": string,
  "name": string,
  "obs": [
    {
      "metar_id": string,
      "icaoId": string,
      "receiptTime": string,
      "obsTime": string,
      "reportTime": string,
      "temp": string,
      "dewp": string,
      "wdir": string,
      "wspd": string,
      "wgst": string | null,
      "visib": string,
      "altim": string,
      "slp": string | null,
      "qcField": string,
      "wxString": string | null,
      "cldCvg1": string | null,
      "cldCvg2": string | null,
      "cldCvg3": string | null,
      "cldCvg4": string | null,
      "cldBas1": string | null,
      "cldBas2": string | null,
      "cldBas3": string | null,
      "cldBas4": string | null,
      "presTend": string | null,
      "maxT": string | null,
      "minT": string | null,
      "maxT24": string | null,
      "minT24": string | null,
      "precip": string | null,
      "pcp3hr": string | null,
      "pcp6hr": string | null,
      "pcp24hr": string | null,
      "snow": string | null,
      "vertVis": string | null,
      "metarType": string,
      "rawOb": string,
      "mostRecent": string
    }
  ]
}

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
  cloudBase: number | null;
  cloud?: string;
}

export interface IFlightRule {
  flightRule: string;
  colorCode: string;
}