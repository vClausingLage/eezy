type IWind = {
  direction: number | string | undefined
  speed: number | undefined
  unit: string | undefined
  gusts?: number | undefined
}
export type IClouds = {
  cloud_layer: string
  cloud_base: number | undefined
  cloud?: string | undefined
}
type IAirPressure = {
  pressure: string | undefined
  value: number | undefined
  unit: string | undefined
}
type IFlightRule = {
  flight_rule: string
  color_code: string
}
type IVisibility = {
  value: number | string | undefined
  unit: string
}
type ITemp = {
  temp: number | undefined
  dewp: number | undefined
}

export type IMetar = {
  icao: string
  date: Date | undefined
  wind: IWind
  visibility: IVisibility
  precipitation: string[]
  clouds: IClouds[]
  wind_var: number[] | undefined
  air_pressure: IAirPressure
  slp: number | undefined
  cavok: boolean
  flight_rule: IFlightRule | undefined
  raw_metar: string
  nosig: boolean
  auto: boolean
  temperature: ITemp
  taf_prognosis: string | undefined
  recent_precipitation: string | undefined
  remarks: string[]
  becoming: string[]
  tempo: string[]
}

export type IAirportObject = {
  frequencies: IFreq[]
  runways: IRwy[]
}

export type IFreq = {
  id?: string
  airport_ref?: string
  airport_ident?: string
  type: string
  description?: string
  frequency_mhz: string
}

export type IRwy = {
  he_ident: string
  le_ident: string
}

export type IWindUI = {
  direction: number | string
  speed: number
  unit: string
  runways: IRwy[]
  gusts?: number
}

export type IPrecipitation = {
  intensity?: string
  elements: string[]
}
