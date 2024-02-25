import { Sequelize } from 'sequelize'

export const dbConnection = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: '127.0.0.1', //! mariadb user localhost settings
    port: 3306,
    dialect: 'mariadb'
  }
)

try {
  await dbConnection.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
