# EEzy Flight Planner

# Metar

The TAF/Metar app provides the pilot a **quick** and **comprehensive** overview of all the relevant data for his/her departure or aerodrome approach. Most relevant information is **visually** represented on top, and more detailed information follows beneath. The pilot can concentrate on flying and navigating the aircraft while the most important weather reports are available at a glance.

The App uses the [**AWC API**](https://www.aviationweather.gov/dataserver) _beta_-Server as a baseline. The results of the API are **fine grained with a powerful RegEx over the Raw Metar** that **a)** add a second layer of redundancy and **b)** provide useful extra information that does not come with AWC's API.

# API

The API can convert Raw Metar String input to an output in JSON format. Additionally it provides some default layout suggestions for simplyfied further use in an app.

## Installation

- `cd client && npm install`
- `cd .. && cd server && npm install`
- `npm run dev`

## To Do

- replace ToggleButton in Metar.tsx

## Issues Beta API

1. Temp and Dewpoint in °C but a decimal too high (x / 10)
