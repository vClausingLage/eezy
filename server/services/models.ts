import mongoose from "mongoose";
import { IAircraft } from '../interfaces/aircraft.js'

// import { sequelize } from "./sequelize_db.js";
// import { DataTypes } from "sequelize";

export const aircraft = new mongoose.Schema<IAircraft>({
  manufacturer: { type: String, required: true},
  model: { type: String, required: true},
  registration_number: { type: String, required: true},
  fuel_type: { type: String, required: true},
  fuel_capacityL: { type: Number, required: true},
  cruise_speedKTS: { type: Number, required: true},
  cruise_fuel_consumptionL: { type: Number, required: true},
  magnetic_error: { type: Number, required: true},
  color: { type: String, required: true},
  engines: { type: Number, required: false},
  ps: { type: Number, required: false},
  seats: { type: Number, required: false},
  IFR: { type: Boolean, required: false},
  equiptment: { type: String, required: false},
  characteristics: { type: String, required: false},
})

// export const Aircraft = sequelize.define('aircraft', {
//   id: {
//     type: DataTypes.NUMBER,
//     allowNull: false,
//     primaryKey: true
//   },
//   manufacturer: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   model: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fuel_type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fuel_capacity: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   },
//   cruise_speed: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   },
//   cruise_fuel_consumption: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   }
// }, {
//   freezeTableName: true
// });