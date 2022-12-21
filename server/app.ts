import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { kilometersToKts, gallonsToLiters } from './unit_calculators';
import { QueryTypes } from 'sequelize';
import { sequelize } from './db_connection'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

app.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});