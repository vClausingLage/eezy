import { Request, Response } from "express";
import mongoose from "mongoose";
import { mongoUri } from "../config/config.js";
import { aircraft } from "./models.js";
import { IAircraft } from "../interfaces/aircraft.js";

export async function queryAircraftManufacturer(req: Request, res: Response) {
  console.log(req.params);
  const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraft);
  if (mongoUri !== undefined) await mongoose.connect(mongoUri);
  const result = await Aircraft.find({
    manufacturer: req.params.manufacturer,
  }).exec();
  res.send(result);
}

export async function createAircraft(req: Request, res: Response) {
  const Aircraft = mongoose.model<IAircraft>("Aircraft", aircraft);
  run().catch((err) => console.log(err));
  async function run() {
    if (mongoUri !== undefined) await mongoose.connect(mongoUri);
    const aircraft = new Aircraft<IAircraft>(req.body);
    await aircraft.save();
    res.send("created");
  }
}
