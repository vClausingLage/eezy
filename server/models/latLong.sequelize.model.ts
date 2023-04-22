import { DataTypes } from "sequelize";
import { seqConnection } from "../connections/seqConnection.js";

export const latLong = seqConnection.define(
  "latLong",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    icao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    elev: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "latLong",
    tableName: "lat_long",
  }
);
