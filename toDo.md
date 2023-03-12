# METAR API

## To Do

- new RegEx for crazy differences in PRECIP strings -> regex101

  - [+/-/_ | 2W | 4W | 6W] -> 6W only if characteristics?
  - [+/-/_ 2W | 4W (if characteristics!)]

- RegEx : ^(-|\+|)\D{2,4}

  - connected
  - separated

- Crazy Metar String RegEx Problems

  - 1 3/4SM

- map TEMPO, BECMG, RMK to _object_

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
[-1] = for end of metar

## check METAR codes

- R26/1000D
- VV///

# React App

## Inhalt

!! GAFOR geschützt -> DFS !!
DWD Flug Wetterberichte als Vorhersage

- Map fertig
- METAR departure / destination -> Warnings / CAVOK
- Fuel
- Airports (lat long)
- WARNING EXCEED FUEL CAPACITY
- WARNING EDUCATIONAL PURPOSE ONLY

# Mobile App

- menu unten
- keine Überschrift
