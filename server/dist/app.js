import express, { Router } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// import cors from 'cors'
// import routes from './routes.js'
// import { kilometersToKts, gallonsToLiters } from './unit_calculators.js'
// const allowedOrigins = ['http://localhost:4000'];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };
// SERVER INIT
dotenv.config();
const app = express();
const port = process.env.PORT;
// app.use(cors(options))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// DB
import { Sequelize } from "sequelize";
const db = process.env.DB;
const user = process.env.USER;
const pass = process.env.PASS;
const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
// CHECK FOR DB CONN
try {
    await sequelize.authenticate();
    console.log('DB connected.');
}
catch (error) {
    console.error('Error connecting DB:', error);
}
// CONTROLLER
export const getAircraft = async (req, res) => {
    const aircraft = await sequelize.query("SELECT * FROM `aircraft`", {
    //   type: QueryTypes.SELECT
    //   // model: Aircraft,
    //   // mapToModel: true
    });
    if (aircraft) {
        res.status(200).json({ 'message': 'works' });
    }
    else {
        res.status(400).json({ 'mesaage': 'failed' });
    }
};
const routes = Router();
routes.post('aircraft', (req, res) => {
    res.status(200).json({ 'message': 'passt' });
    res.status(400).json({ 'message': 'passt net' });
}); //getAircraft
// ROUTES
app.use('/api/', routes);
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
