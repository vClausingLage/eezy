# TO DO

## Docker

[Link](https://medium.com/@antonio.maccarini/dockerize-a-react-application-with-node-js-postgres-and-nginx-124c204029d4)

## URGENT

- "ADD AIRCRAFT" not showing when no aircraft in DB
- "ADD AIRCRAFT" -> toggle Aircraft create **form**
- **useEffect?** for showing aircraft after create/update/delete

## REALLY URGENT AND COMPLEX

- add warning codes (color green, orange, red) to weather codes
- show Warning when orange or red
- print colored weather strings

## client

- add **Haversine distance** to ICAOs
- useEffect metar index ARRAY!!!
- test new Precip Decoder
- redo navigation bar (w/o MUI)
- add **animation** to _RWY SELECT_
- **selected aircraft** must be stored in **App.tsx**
- remove useEffect where possible
- useMemo, useCallback

## server

### API

- req params / req body
- cleanup RegEx
- remove unused configs

## server & client

- add RECENT

### precip

- VCSH must be 'showers in the vicinity'
- VV/// -> OVX

### Calculator

- add reserve fuel to calculation
- add taxi fuel to calculator

# METAR API

## Response

- check (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful)
  - check for response.ok

## Structure

[1] ICAO
[2] day + Zulu time
[3] wind direction and speed
[4] wind variation
[5] visibility (m)
[6] [METAR weather codes](https://en.wikipedia.org/wiki/METAR)
[7] clouds (can be **4 instances**)
[9] temperature/dewpoint (M for minus)
[10] QNH/Altimeter
[11] **RE**cent
[12, 13, 14] TEMPO RMK **which order?**
[-1] = for end of metar

## check METAR codes

- R26/1000D
- VV///

# React App

## Inhalt

- Map fertig
- METAR departure / destination -> Warnings / CAVOK
- Fuel
- WARNING EXCEED FUEL CAPACITY
- WARNING EDUCATIONAL PURPOSE ONLY
