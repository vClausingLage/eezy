import { dbConnection } from '../connections/dbConnection.js'
import { DataTypes } from 'sequelize'

export const aircraft = dbConnection.define(
  'aircraft',
  {
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registration_number: {
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
    },
    magnetic_error: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IFR: {
      type: DataTypes.STRING,
      allowNull: true
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    modelName: 'aircraft',
    tableName: 'aircraft',
    timestamps: false
  }
)
