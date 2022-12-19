"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const db = process.env.DB;
const user = process.env.USER;
const pass = process.env.PASS;
app.get('/', (req, res) => {
    res.send('Läuft');
});
const sequelize = new sequelize_1.Sequelize(db, user, pass, {
    host: 'localhost:8081',
    dialect: 'mysql'
});
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
