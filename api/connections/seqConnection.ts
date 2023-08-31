import { Sequelize } from 'sequelize'
import { sqlDatabase } from '../config/config.js'

export const seqConnection = new Sequelize(
  sqlDatabase.dbName,
  sqlDatabase.user,
  sqlDatabase.password,
  {
    host: '127.0.0.1', //! mariadb user localhost settings
    port: 3306,
    dialect: 'mariadb'
  }
)

try {
  await seqConnection.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
