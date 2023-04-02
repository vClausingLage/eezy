// -> metar-regex
export class Metar {
  icao!: string;
  date!: Date;
  wind!: { direction: number | string; speed: number; unit: string };
  visibility!: { value: number; unit: string };
  precipitation!: string[];
  cloud_layer!: { cloud_layer: string; cloud_base: number; cloud?: string }[];
  taf_prognosis!: string;
  wind_var!: number[];
  air_pressure!: { pressure: string; value: number; unit: string };
  slp!: number;
  cavok!: boolean;
  flight_rule!: { flight_rule: string; color_code: string };
  raw_metar!: string;
  nosig!: boolean;
  auto!: boolean;
  temperature!: number[];
  recent_precipitation!: string;
  remarks!: string[];
  becoming!: string[];
  tempo!: string[];
}

// -> helper-functions
export class Wind {
  direction!: number | string;
  speed!: number;
  unit!: string;
  gusts?: number;
}
export class Clouds {
  cloudLayer!: string;
  cloudBase!: number | undefined;
  cloud?: string;
}
