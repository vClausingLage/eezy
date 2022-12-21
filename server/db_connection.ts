import { Sequelize } from "sequelize";

const db = process.env.DB!;
export const user = process.env.USER!;
export const pass = process.env.PASS!;

export const sequelize = new Sequelize(db, user, pass, {
  host: 'localhost', //'host.docker.internal'
  port: 3306,
  dialect: 'mysql'
});