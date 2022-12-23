import sequelize from "./db_connection.js";
import { DataTypes } from "sequelize";

export const Aircraft = sequelize.define('Aircraft', {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fuel_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fuel_capacity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  cruise_speed: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  cruise_fuel_consumption: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
});