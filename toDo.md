# TO DO

## client

- add new formula for distance calculation
- useEffect metar index ARRAY!!!
- test new Precip Decoder
- **CAST** number values to string in _aircraftCreate_
- redo navigation bar (w/o MUI)
- add sm flightRules to _CLIENT_
- add **animation** to _RWY SELECT_

## server

### API

- req params / req body
- cleanup RegEx

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

## Authentication

- complete auth process

## Inhalt

- Map fertig
- METAR departure / destination -> Warnings / CAVOK
- Fuel
- WARNING EXCEED FUEL CAPACITY
- WARNING EDUCATIONAL PURPOSE ONLY

# Mobile App

- menu unten
- keine Überschrift
