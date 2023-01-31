# EEzy Flight Planner

## Installation

- `cd client && npm install`
- `cd .. && cd server && npm install`
- `npm run dev`

## To Do

- replace ToggleButton in Metar.tsx

## Issues Beta API

1. Temp and Dewpoint in °C but a decimal too high (x / 10)
   1.1 check unit conversion: 621 must evaluate 9999
