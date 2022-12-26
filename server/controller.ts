import { Aircraft } from './model.js'

export const aircraft = await Aircraft.findAll()
console.log(aircraft)