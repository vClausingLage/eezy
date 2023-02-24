import mongoose from "mongoose";

// import { sequelize } from "./sequelize_db.js";
// import { DataTypes } from "sequelize";

export const aircraft = new mongoose.Schema({
  manufacturer: 'string',
  model: 'string',
  fuel_type: 'string',
  fuel_capacity: 'number',
  cruise_speed: 'number',
  cruise_fuel_consumption: 'number',
  engines: 'number',
  ps: 'number',
  registration_number: 'number',
  color: 'string',
  magnetic_error: 'number',
  seats: 'number',
  IFR: 'boolean',
  equiptment: 'string',
  characteristics: 'string'
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