type Wind = {
  direction: number | string | null
  speed: number | null
  unit: string | null
  gusts?: number | null
}
type Clouds = {
  cloudLayer: string | null
  cloudBase: number | null
  cloud?: string | null
}
type AirPressure = {
  pressure: string | null
  value: number | null
  unit: string | null
}
type FlightRule = {
  flight_rule: string
  color_code: string
}
type Visibility = {
  value: number | string | null
  unit: string
}
type Temp = {
  temp: number | null
  dewp: number | null
  unit: string | null
}

export type Metar = {
  icao: string
  date: Date | null
  wind: Wind
  visibility: Visibility
  precipitation: string[]
  clouds: Clouds[]
  wind_var: number[] | null
  air_pressure: AirPressure
  slp: number | null
  cavok: boolean
  flight_rule: FlightRule | null
  raw_metar: string
  nosig: boolean
  auto: boolean
  temperature: Temp
  taf_prognosis: string | null
  recent_precipitation: string | null
  remarks: string[]
  becoming: string[]
  tempo: string[]
}

export type ResultBasicTokens = {
  icao: string
  date: Date | null
  cavok: boolean
  nosig: boolean
  auto: boolean
  air_pressure: AirPressure
  slp: number | null
  clouds: Clouds[]
  wind: Wind
  wind_var: number[] | null
  temperature: Temp
  recent_precipitation: string | null
  taf_prognosis: string | null
  remarks: string[]
  becoming: string[]
  tempo: string[]
  raw_metar: string
}
export type ResultDynamicTokens = {
  visibility: Visibility
  precipitation: string[]
  flight_rule: FlightRule | null
}

export type ResultTokens = ResultBasicTokens & ResultDynamicTokens

export type DynamicTokens = {
  regexResults: ResultDynamicTokens
  filteredMetarList: string[]
}

export type BasicTokens = {
  regexResults: ResultBasicTokens
  filteredMetarList: string[]
}