# TO DO

## client

- useEffect metar index ARRAY!!!
- !!! AWC API changed vis to SM !!! --> change to Raw Metar
- test new Precip Decoder
- **CAST** number values to string in _aircraftCreate_
- SVG Panel / Clouds -> key for map
- cannot read undefined

## server

### API

- req params / req body
- cleanup RegEx

## server & client

- SM unit for FLR ! API

### precip

- VCSH must be 'showers in the vicinity'
- VV/// -> OVX
- remove empty string in precip decoder

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
- Airports (lat long)
- WARNING EXCEED FUEL CAPACITY
- WARNING EDUCATIONAL PURPOSE ONLY

# Mobile App

- menu unten
- keine Überschrift

# SQL

## import CSV

LOAD DATA INFILE '/home/export_file.csv'
INTO TABLE table_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
