import { Request, Response } from 'express'
import mongoose from 'mongoose';
import { aircraft } from './models.js'
import { IAircraft } from '../interfaces/aircraft.js';

export async function queryAircraft(req: Request, res: Response) {
  res.send({message: 'hi aircraft'})
}

export async function createAircraft() {
  const Aircraft = mongoose.model<IAircraft>('Aircraft', aircraft);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  const aircraft = new Aircraft<IAircraft>({
    manufacturer: 'Cessna',
    model: 'C152',
    registration_number: 12345,
    fuel_type: 'AVGAS',
    fuel_capacity: 1000,
    cruise_speed: 100,
    cruise_fuel_consumption: 10,
    magnetic_error: -1,
    color: 'blue'
  });
  await aircraft.save();

  console.log(aircraft);
}
}

// export async function queryAircrafts(req: Request, res: Response) {
//   const result = await Aircraft.findAll()
//   try {
//     res.send(result)

//   } catch {
//     console.error('error')
//   }
// }

// const result = await Aircraft.findAll({ 
//   where: {
//     manufacturer: 'Cessna'
//   }
// })

// export async function create(req: Request, res: Response) {
//   const userAircraft = await userAircraft.create({
//     firstName: "Jane", 
//     lastName: "Doe"
//   });
// }



// https://stackoverflow.com/questions/45859745/where-should-i-write-queries-in-model-or-controller-sequelize
// https://stackoverflow.com/questions/62685728/use-model-in-sequelize-from-a-controller

// localhost:4000/api/aircraft

// https://expressjs.com/en/guide/routing.html