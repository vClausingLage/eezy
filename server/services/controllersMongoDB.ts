import { Request, Response } from "express";
import mongoose from "mongoose";
import { mongoUriAircraft, mongoUriAircraftModel } from "../config/config.js";
import { aircraft, aircrafModel } from "../models/aircraft.js";
import { IAircraft, IAircraftModel } from "../interfaces/aircraft.js";

export async function queryAircraftAll(req: Request, res: Response) {
  const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraft);
  await mongoose.connect(mongoUriAircraft);
  const result = await Aircraft.find({}).exec();
  res.send(result);
}

export async function queryAircraftManufacturer(req: Request, res: Response) {
  console.log(req.params);
  const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraft);
  await mongoose.connect(mongoUriAircraft);
  const result = await Aircraft.find({
    manufacturer: req.params.manufacturer,
  }).exec();
  res.send(result);
}

export async function createAircraft(req: Request, res: Response) {
  const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraft);
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(mongoUriAircraft);
    const aircraft = new Aircraft<IAircraft>(req.body);
    await aircraft.save();
    res.send("created");
  }
}

export async function insertModelAC(req: Request, res: Response) {
  const AircraftModel = mongoose.model<IAircraftModel>(
    "Aircraft",
    aircrafModel
  );
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(mongoUriAircraftModel);
    const aircraft = new AircraftModel<IAircraftModel>(req.body);
    await aircraft.save();
    res.send("created");
  }
}
