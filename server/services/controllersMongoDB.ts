import { Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO_CONN_STRING } from "../config/config.js";
import { Aircraft, AircraftModel } from "../models/aircraft.js";
import { IAircraft, IAircraftModel } from "../interfaces/aircraft.js";

export async function queryAircraftAll(req: Request, res: Response) {
  await mongoose.connect(MONGO_CONN_STRING);
  console.log("connected");
  const result = await Aircraft.find({}).exec(() => mongoose.disconnect());
  console.log("result", result);
  res.send(result);
}

export async function queryAircraftManufacturer(req: Request, res: Response) {
  console.log(req.params);
  await mongoose.connect(MONGO_CONN_STRING);
  const result = await Aircraft.find({
    manufacturer: req.params.manufacturer,
  }).exec(() => mongoose.disconnect());
  res.send(result);
}

export async function createAircraft(req: Request, res: Response) {
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(MONGO_CONN_STRING);
    const aircraft = new Aircraft<IAircraft>(req.body);
    await aircraft.save(() => mongoose.disconnect());
    res.send("created");
  }
}

export async function insertModelAC(req: Request, res: Response) {
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(MONGO_CONN_STRING);
    const aircraft = new AircraftModel<IAircraftModel>(req.body);
    await aircraft.save(() => mongoose.disconnect());
    res.send("created");
  }
}
