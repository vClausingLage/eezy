import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import { kilometersToKts, gallonsToLiters } from './unit_calculators';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const db = process.env.DB!;
const user = process.env.USER!;
const pass = process.env.PASS!;

app.get('/', (req: Request, res: Response) => {
  res.send('Läuft');
});

const sequelize = new Sequelize(db, user, pass, {
  host: 'localhost:8081',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});