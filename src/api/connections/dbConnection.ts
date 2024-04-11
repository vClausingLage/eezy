import { Sequelize } from 'sequelize'

const DB_NAME = process.env.DB_NAME || "eezyApp"
const DB_USER = process.env.DB_USER || "eezy_usr"
const DB_PASSWORD = process.env.DB_PASSWORD || "eezyRoot"
const DB_HOST = process.env.NODE_ENV === 'production' ? 'mysql' : '127.0.0.1'
// const DB_HOST = process.env.DB_HOST

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST, //! set host in docker env //! mariadb localhost settings : '127.0.0.1', Docker mysql
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
