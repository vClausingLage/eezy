import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Sequelize, QueryTypes } from 'sequelize'; //DataTypes

import { kilometersToKts, gallonsToLiters } from './unit_calculators';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const db = process.env.DB!;
const user = process.env.USER!;
const pass = process.env.PASS!;

const sequelize = new Sequelize(db, user, pass, {
  host: 'host.docker.internal', // 'host.docker.internal'
  dialect: 'mysql'
});
// const Aircraft = sequelize.define('Aircraft', {
//   id: {
//     type: DataTypes.NUMBER,
//     allowNull: false,
//     primaryKey: true
//   },
//   manufacturer: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   model: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fuel_type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fuel_capacity: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   },
//   cruise_speed: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   },
//   cruise_fuel_consumption: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   }
// });
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const aircrat = await sequelize.query("SELECT * FROM `aircraft`", { 
  type: QueryTypes.SELECT
  // model: Aircraft,
  // mapToModel: true
});

app.get('/', (req: Request, res: Response) => {
  res.send('Läuft');
});

app.get('/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});