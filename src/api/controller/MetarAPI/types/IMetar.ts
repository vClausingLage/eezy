type IWind = {
  direction: number | string | null
  speed: number | null
  unit: string | null
  gusts?: number | null
}
type IClouds = {
  cloud_layer: string
  cloud_base: number | null
  cloud?: string | null
}
type IAirPressure = {
  pressure: string | null
  value: number | null
  unit: string | null
}
type IFlightRule = {
  flight_rule: string
  color_code: string
}
type IVisibility = {
  value: number | string | null
  unit: string
}
type ITemp = {
  temp: number | null
  dewp: number | null
}

export type IMetar = {
  icao: string
  date: Date | null
  wind: IWind
  visibility: IVisibility
  precipitation: string[]
  clouds: IClouds[]
  wind_var: number[] | null
  air_pressure: IAirPressure
  slp: number | null
  cavok: boolean
  flight_rule: IFlightRule | null
  raw_metar: string
  nosig: boolean
  auto: boolean
  temperature: ITemp
  taf_prognosis: string | null
  recent_precipitation: string | null
  remarks: string[]
  becoming: string[]
  tempo: string[]
}

export type IResultBasicTokens = {
  icao: string
  date: Date | null
  cavok: boolean
  nosig: boolean
  auto: boolean
  air_pressure: IAirPressure
  slp: number | null
  clouds: IClouds[]
  wind: IWind
  wind_var: number[] | null
  temperature: ITemp
  recent_precipitation: string | null
  taf_prognosis: string | null
  remarks: string[]
  becoming: string[]
  tempo: string[]
  raw_metar: string
}
export type IResultDynamicTokens = {
  visibility: IVisibility
  precipitation: string[]
  flight_rule: IFlightRule | null
}

export type IResultTokens = IResultBasicTokens & IResultDynamicTokens