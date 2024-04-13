# TO DO

## Done

## FROM MS TO DO

- make Headlines smaller
- flight rule is wrong?
- no aircraft found api -> client
- new Freuqencies render logic
- gusts warning TEMPO
- check precip 'plain english' working
- units (vis, speed, etc) from location?
- time from location or from airport?
- [list country codes](https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste)
- [location api](https://ipapi.co/api/#complete-location)
- check all calculation logic and move to api
- find nearest airport (emergency button)?
- aircraft create form with GraphQL

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
