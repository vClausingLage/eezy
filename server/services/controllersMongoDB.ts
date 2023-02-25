import { Request, Response } from 'express'
import mongoose from 'mongoose';
import { mongoDBUriTest } from '../config/config.js';
import { aircraft } from './models.js'
import { IAircraft } from '../interfaces/aircraft.js';

export async function queryAircraftManufacturer(req: Request, res: Response) {
  console.log(req.params)
  const Aircraft = mongoose.model<IAircraft>('Aircraft', aircraft);
  await mongoose.connect(mongoDBUriTest);
  const result = await Aircraft.find({ manufacturer: "Cessna" }).exec();
  res.send(result)
}

export async function createAircraft(req: Request, res: Response) {
  const Aircraft = mongoose.model<IAircraft>('Aircraft', aircraft);
  run().catch(err => console.log(err));
  async function run() {
    await mongoose.connect(mongoDBUriTest);
    const aircraft = new Aircraft<IAircraft>(req.body)
    await aircraft.save();
    res.send('created')
  }
}