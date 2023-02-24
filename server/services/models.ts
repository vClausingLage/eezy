import mongoose from "mongoose";
import { IAircraft } from '../interfaces/aircraft.js'

// import { sequelize } from "./sequelize_db.js";
// import { DataTypes } from "sequelize";

export const aircraft = new mongoose.Schema<IAircraft>({
  manufacturer: { type: 'string', required: true},
  model: { type: 'string', required: true},
  registration_number: { type: 'number', required: true},
  fuel_type: { type: 'string', required: true},
  fuel_capacity: { type: 'number', required: true},
  cruise_speed: { type: 'number', required: true},
  cruise_fuel_consumption: { type: 'number', required: true},
  magnetic_error: { type: 'number', required: true},
  color: { type: 'string', required: true},
  engines: { type: 'number', required: false},
  ps: { type: 'number', required: false},
  seats: { type: 'number', required: false},
  IFR: { type: 'boolean', required: false},
  equiptment: { type: 'string', required: false},
  characteristics: { type: 'string', required: false},
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