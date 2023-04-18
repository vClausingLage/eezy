# TO DO

## client

- useEffect metar index ARRAY!!!
- test new Precip Decoder
- **CAST** number values to string in _aircraftCreate_

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

create user \*\*\*

create database eezyApp;
create table lat_long (
id INT NOT NULL AUTO_INCREMENT,
icao VARCHAR(255) NOT NULL,
lat FLOAT NULL,
long FLOAT NULL,
PRIMARY KEY (id)
);

## import CSV

LOAD DATA LOCAL INFILE '/home/vincent/Downloads/IcaoLatLong.csv'
INTO TABLE lat_long
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
