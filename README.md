# EEzy Flight Planner

# Metar

Metars (**MET**eorological **A**erodrome **R**eport) are reports that are isuued by meteorological stations at every commercial airport. These airports have their own weather observation stations and professional staff that extracs the collected weather data. This is then published in strings with abbreviated tokens for different observations. Metars differ widely and can be quite short:

`EDHK 091920Z AUTO 24010KT 7000 // OVC007/// 03/02 Q1028`

or quite long:

`LTFM 081050Z 35023KT 9999 FEW012 BKN022 01/M03 Q1034 RESHSN NOSIG RMK RWY17L 34023KT RWY34L 34024KT RWY16R 34020KT RWY36 35026KT RWY18 35024KT`

depending on the weather conditions at the airport.

The TAF/Metar app provides the pilot a **quick** and **comprehensive** overview of all the relevant data for his/her departure or aerodrome approach. Most relevant information is **visually** represented on top, and more detailed information follows beneath. The pilot can concentrate on flying and navigating the aircraft while the most important weather reports are available at a glance. Beneath wind direction all RWYs of the aerodrome can be selected, providing useful information before checking in with _Approach_ or snaping in _ATIS_.
_(! Runways are selectable even if they have the same heading (in case of RWY 26R and RWY 26L) !)_

The App uses the [**AWC API**](https://www.aviationweather.gov/dataserver) _beta_-Server as a baseline. The results of the API are **fine grained with a powerful RegEx over the Raw Metar** that **a)** add a second layer of redundancy and **b)** provide useful extra information that does not come with AWC's API.

## Dev

`cd client && npm install`
`cd server && npm install`
`cd server && npm run dev`

# API

**Test the API at clausing-lage.de/api/metardecoder/\<YOUR METAR STRING\>**

e.g.: `EDHK 100850Z 08012KT 9999 -SN OVC015 01/M02 Q0992 `

The API can convert Raw Metar String input to an output in JSON format. The main focus is to maintain the strict design of Metar strings while making it as 'human readable' as possible. The decoding of the weather strings was of particular importance in order to reduce the complexity of the raw Metar strings and to ensure quick information access.

## To Do

## Issues Beta API

1. Temp and Dewpoint in °C with **one decimal** ("10" => 1.0°C)

# Mobile App

## Install

`npm install && npm run start`

# Wordcloud

EDDS EEDH EDDM EDHK EGLL LTFM RJTT VTBS WSSS ZSPD GCTS HAAB FACT HEGN LTBA LEBL EHAM LFPG EGPH UUEE KORD KLAX KDEN KJFK KSFO CYYZ MMMX MMUN YSSY YMML NZAA PHOG LEAL EDDB UKBB EBBR LIRA EKCH LGAV EFHK LPPT LCRA LSZH GCXO KLIT KCAE KDTW CYUL
