import express from 'express';
import dotenv from 'dotenv';
import { Sequelize, QueryTypes } from 'sequelize';
// import { sequelize } from './db_connection'
dotenv.config();
export const app = express();
// ROUTES
const port = process.env.PORT;
const db = process.env.DB;
export const user = process.env.USER;
export const pass = process.env.PASS;
export const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
try {
    await sequelize.authenticate();
    console.log('DB connected.');
}
catch (error) {
    console.error('Error connecting DB:', error);
}
export const aircrat = await sequelize.query("SELECT * FROM `aircraft`", {
    type: QueryTypes.SELECT
    // model: Aircraft,
    // mapToModel: true
});
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
