import { DataTypes } from 'sequelize'
import { sequelize } from '../connections/dbConnection.js'

export const latLong = sequelize.define(
  'latLong',
  {
    icao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    elev: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }
)
