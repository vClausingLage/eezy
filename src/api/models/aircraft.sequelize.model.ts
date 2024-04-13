import { DataTypes } from 'sequelize'
import { sequelize } from '../connections/dbConnection.js'

export const aircraft = sequelize.define(
  'aircraft',
  {
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
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuelType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuelCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cruiseSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cruiseFuelConsumption: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    magneticError: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ifr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }
)
