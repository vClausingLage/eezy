import { Sequelize } from "sequelize";
import { sqlDatabase } from "../config/config.js";

export const seqConnection = new Sequelize(
  sqlDatabase.dbName,
  sqlDatabase.user,
  sqlDatabase.password,
  {
    dialect: "mariadb",
  }
);
