import { Aircraft } from "./models.js"

export async function query() {
  Aircraft.findAll({ where: {
    manufacturer: 'Cessna'
  }})
}