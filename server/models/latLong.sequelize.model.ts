import { DataTypes } from "sequelize";
import { seqConnection } from "../connections/seqLatLong.js";

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
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    long: {
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
