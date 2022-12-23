import { Sequelize } from "sequelize";
const db = process.env.DB;
const user = process.env.USER;
const pass = process.env.PASS;
const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
export default sequelize;
