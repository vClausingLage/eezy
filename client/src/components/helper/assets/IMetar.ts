
export interface IMetar {
  ICAO: string;
  Date: Date;
  Winds: IWind;
  Visibility: string | number;
  Precipitation: IPrecipitation;
  Cloud_Layer: IClouds;
  TAF_Prognosis: string;
  Wind_Variation: number[];
  QNH: number
  RawMetar: string
}

interface IWind {
  direction: number;
  speed: number;
  unit: string;
  gusts: number;
}

interface IPrecipitation {
  intensity: string;
  elements: string[];
}

interface IClouds {
  cloudLayer: string;
  height: number;
  cloud: string;
}