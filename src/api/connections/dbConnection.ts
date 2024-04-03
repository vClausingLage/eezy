import { Sequelize } from 'sequelize'

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_ENGINE = process.env.DB_ENGINE
// const DB_HOST = process.env.DB_HOST || 'mysql'

export const sequelize = new Sequelize(
  DB_NAME || "eezyApp",
  DB_USER || "eezy_usr",
  DB_PASSWORD || "eezyRoot",
  {
    host: '127.0.0.1',//DB_HOST, //! set host in docker env //! mariadb localhost settings : '127.0.0.1', Docker mysql
    port: 3306,
    dialect: 'mariadb'
  }
)

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
  // await sequelize.sync({ force: true })
  await sequelize.sync()
  console.log('All models were synchronized successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
