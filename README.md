# EEzy Flight Planner

# Metar

The TAF/Metar app provides the pilot a **quick** and **comprehensive** overview of all the relevant data for his/her departure or aerodrome approach. Most relevant information is **visually** represented on top, and more detailed information follows beneath. The pilot can concentrate on flying and navigating the aircraft while the most important weather reports are available at a glance.

## Installation

- `cd client && npm install`
- `cd .. && cd server && npm install`
- `npm run dev`

## To Do

- replace ToggleButton in Metar.tsx

## Issues Beta API

1. Temp and Dewpoint in °C but a decimal too high (x / 10)
2. check unit conversion: 621 & **1000** must evaluate 9999
