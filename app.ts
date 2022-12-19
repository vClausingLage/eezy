import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const sequelize = new Sequelize('', 'username', 'password', {
  host: 'localhost:8081',
  dialect: 'mysql'
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});