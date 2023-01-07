export class Wind {
  direction: number;
  speed: number;
  gusts?: number;
  unit: string;
}

export class Precipitation {
  intensity?: string;
  firstElement: string;
  secondElement?: string;
  thridElement?: string;
}

export class Metar {
  ICAO: string;
  Date: Date;
  Wind_Variation?: Array<number>;
  Winds: Wind | undefined // WHY UNDEFINED ???
  Visibility: string | number | undefined; // WHY UNDEFINED ???
  Precipitation: Precipitation;
  Cloud_Layer: Array<string>;
  TAF_Prognosis: string;
}