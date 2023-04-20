import { seqConnection } from "../connections/seqConnection.js";
import { DataTypes } from "sequelize";

export const aircraft = seqConnection.define(
  "aircraft",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuel_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuel_capacity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    cruise_speed: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    cruise_fuel_consumption: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    magnetic_error: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IFR: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "aircraft",
    tableName: "aircraft",
  }
);

// import mongoose from "mongoose";
// import { IAircraft, IAircraftModel } from "../interfaces/aircraft.js";

// const aircraftSchema = new mongoose.Schema<IAircraft>({
//   user: { type: String, required: true },
//   manufacturer: { type: String, required: true },
//   model: { type: String, required: true },
//   type: { type: String, required: false },
//   registration_number: { type: String, required: true },
//   fuel_type: { type: String, required: true },
//   fuel_capacityL: { type: Number, required: true },
//   cruise_speedKTS: { type: Number, required: true },
//   cruise_fuel_consumptionL: { type: Number, required: true },
//   magnetic_error: { type: Number, required: true },
//   color: { type: String, required: true },
//   IFR: { type: Boolean, required: false },
//   equiptment: { type: String, required: false },
// });
// const aircrafModelSchema = new mongoose.Schema<IAircraftModel>({
//   user: { type: String, required: true },
//   manufacturer: { type: String, required: true },
//   model: { type: String, required: true },
//   type: { type: String, required: false },
//   fuel_type: { type: String, required: true },
//   fuel_capacityL: { type: Number, required: true },
//   cruise_speedKTS: { type: Number, required: true },
//   cruise_fuel_consumptionL: { type: Number, required: true },
// });

// export const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraftSchema);
// export const AircraftModel = mongoose.model<IAircraftModel>(
//   "AircraftModel",
//   aircrafModelSchema
// );
