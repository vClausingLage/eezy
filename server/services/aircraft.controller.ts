import { Request, Response } from "express";
import mongoose from "mongoose";
import { mongoConnString } from "../config/config.js";
import { Aircraft, AircraftModel } from "../models/aircraft.js";
import { IAircraft, IAircraftModel } from "../interfaces/aircraft.js";

export async function queryAircraftAll(req: Request, res: Response) {
  console.log("queryAircraftAll");
  await mongoose.connect(mongoConnString);
  const result = await Aircraft.find({}).exec();
  res.send(result);
  // mongoose.disconnect();
}

export async function queryAircraftManufacturer(req: Request, res: Response) {
  console.log("queryAircraftManufacturer");

  await mongoose.connect(mongoConnString);
  const result = await Aircraft.find({
    manufacturer: req.params.manufacturer,
  }).exec();
  res.send(result);
  // mongoose.disconnect();
}

export async function createAircraft(req: Request, res: Response) {
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(mongoConnString);
    const aircraft = new Aircraft<IAircraft>(req.body);
    await aircraft.save();
    res.send({ message: "created" });
    // mongoose.disconnect();
  }
}

export async function getAircraft(req: Request, res: Response) {
  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(mongoConnString);
    const result = await Aircraft.find({
      user: req.params.id,
    }).exec();
    res.send(result);
    // mongoose.disconnect();
  }
}

export async function insertModelAC(req: Request, res: Response) {
  console.log("insertModelAC");

  run().catch((err) => console.log(err));
  async function run() {
    await mongoose.connect(mongoConnString);
    const aircraft = new AircraftModel<IAircraftModel>(req.body);
    await aircraft.save();
    res.send("created");
    // mongoose.disconnect();
  }
}
